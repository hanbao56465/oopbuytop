import fs from 'node:fs/promises';
import path from 'node:path';

const API_BASE = 'https://api.maisonlooks.com/public/v1';
const OUT_DIR = path.resolve('src/data');
const API_KEY = process.env.MAISONLOOKS_API_KEY;
const PER_PAGE = 100;
const MAX_PER_CATEGORY = clamp(Number(process.env.MAISONLOOKS_MAX_PER_CATEGORY ?? 200), 1, 500);
const OUTFITS_LIMIT = clamp(Number(process.env.MAISONLOOKS_OUTFITS_LIMIT ?? 24), 0, 100);

await fs.mkdir(OUT_DIR, { recursive: true });

if (!API_KEY) {
  console.warn('MAISONLOOKS_API_KEY is not set; using the last successful data snapshot.');
  await requireSnapshot();
  process.exit(0);
}

try {
  const categories = await api('/categories');
  const productsByCategory = await Promise.all(categories.map(async (category) => {
    const collected = [];
    for (let offset = 0; offset < MAX_PER_CATEGORY; offset += PER_PAGE) {
      const response = await api(`/products?category=${encodeURIComponent(category.slug)}&limit=${PER_PAGE}&offset=${offset}`);
      const page = Array.isArray(response) ? response : response.data ?? [];
      collected.push(...page);
      if (page.length < PER_PAGE) break;
    }
    return collected.slice(0, MAX_PER_CATEGORY);
  }));
  const outfitsResponse = OUTFITS_LIMIT ? await api(`/outfits?featured=true&limit=${OUTFITS_LIMIT}`) : [];
  const products = productsByCategory.flat();
  const outfits = Array.isArray(outfitsResponse) ? outfitsResponse : outfitsResponse.data ?? [];
  const meta = {
    fetchedAt: new Date().toISOString(),
    categoryCount: categories.length,
    productCount: products.length,
    outfitCount: outfits.length,
    maxPerCategory: MAX_PER_CATEGORY,
  };

  await Promise.all([
    write('categories.json', categories),
    write('products.json', products),
    write('outfits.json', outfits),
    write('_meta.json', meta),
  ]);
  console.log(`MaisonLooks snapshot refreshed: ${products.length} products in ${categories.length} categories.`);
} catch (error) {
  console.error(`MaisonLooks refresh failed: ${error.message}`);
  await requireSnapshot();
}

async function api(pathname) {
  const response = await fetch(`${API_BASE}${pathname}`, {
    headers: { 'X-API-Key': API_KEY, Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`${pathname} returned HTTP ${response.status}`);
  return response.json();
}

async function requireSnapshot() {
  try {
    await Promise.all(['categories.json', 'products.json', 'outfits.json', '_meta.json'].map((name) => fs.access(path.join(OUT_DIR, name))));
  } catch {
    throw new Error('No cached MaisonLooks snapshot is available. Set MAISONLOOKS_API_KEY before the first build.');
  }
}

async function write(name, value) {
  await fs.writeFile(path.join(OUT_DIR, name), `${JSON.stringify(value, null, 2)}\n`);
}

function clamp(value, min, max) {
  return Number.isFinite(value) ? Math.min(Math.max(Math.floor(value), min), max) : min;
}
