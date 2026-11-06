#!/usr/bin/env node
// Manual catalog sync for the MaisonLooks general API (official + PK shops only).
// The site never calls the API at build time: run this by hand, review the diff,
// and commit src/data/ so the product set stays fixed between deploys.
//
//   node --env-file=.env.general scripts/sync-maisonlooks.mjs --seed=oopbuytop.net --per-category=15
//   node --env-file=.env.general scripts/sync-maisonlooks.mjs --seed=oopbuytop.net --max-products=2   (smoke test, writes nothing)
//
// Requests are strictly serial with >=1.1s spacing (API limit: 120/min). On 429 the
// script waits for Retry-After once, then stops. Any failure leaves src/data unchanged.
import fs from 'node:fs/promises';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const BASE = 'https://api.maisonlooks.com/public/v1';
const SHOPS = new Map([
  ['965e4f17-a842-407d-a63c-04e00445cd34', { slug: 'official', host: 'official.maisonlooks.com' }],
  ['aeabc616-01bb-4848-8ba8-f903cafa430b', { slug: 'PK_Specialty_Store', host: 'pk-specialty-store.maisonlooks.com' }],
]);
const KEY = process.env.MATRIX_API_KEY;
const args = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith('--')).map((a) => {
  const [k, ...v] = a.slice(2).split('=');
  return [k, v.join('=')];
}));
const SEED = args.seed || process.env.MATRIX_SITE_SEED;
const PER_CATEGORY = Number(args['per-category'] ?? 15);
const MAX = args['max-products'] ? Number(args['max-products']) : Infinity;
const DRY_RUN = Number.isFinite(MAX);
const OUT_DIR = path.resolve('src/data');

if (!KEY) throw new Error('MATRIX_API_KEY is required (use --env-file=.env.general).');
if (!SEED || !/^[A-Za-z0-9._-]{1,64}$/.test(SEED)) throw new Error('--seed=your-site-domain is required.');
if (!Number.isSafeInteger(PER_CATEGORY) || PER_CATEGORY < 1 || PER_CATEGORY > 100) throw new Error('--per-category must be 1-100.');

let lastRequest = 0;
let requestCount = 0;
async function api(route, retried = false) {
  await delay(Math.max(0, 1100 - (Date.now() - lastRequest)));
  lastRequest = Date.now();
  requestCount += 1;
  const response = await fetch(`${BASE}${route}`, {
    headers: { 'X-API-Key': KEY, Accept: 'application/json' },
    signal: AbortSignal.timeout(30_000),
  });
  if (response.status === 429 && !retried) {
    const wait = Math.min(Number(response.headers.get('retry-after')) || 60, 300);
    console.warn(`429 on ${route}; waiting ${wait}s before one retry.`);
    await delay(wait * 1000);
    return api(route, true);
  }
  if (!response.ok) throw new Error(`${route}: HTTP ${response.status} (cf-ray ${response.headers.get('cf-ray') ?? '-'}); src/data unchanged.`);
  if (!response.headers.get('content-type')?.includes('application/json')) throw new Error(`${route}: expected JSON; check the firewall.`);
  return response.json();
}

function checkProduct(product) {
  const shop = SHOPS.get(product.shopId);
  if (!shop || product.shopSlug !== shop.slug) throw new Error(`${product.slug}: outside the two approved shops; stop importing.`);
  const expected = `https://${shop.host}/en/p/${encodeURIComponent(product.slug)}`;
  if (product.productUrl !== expected) throw new Error(`${product.slug}: unexpected storefront URL; stop importing.`);
}

const categories = await api('/categories');
if (!Array.isArray(categories)) throw new Error('Unexpected categories response.');

// Pick up to PER_CATEGORY products per category using this site's own seed.
const selected = new Map();
for (const category of categories) {
  if (selected.size >= MAX) break;
  const limit = Math.min(PER_CATEGORY, MAX - selected.size);
  const response = await api(`/products?category=${encodeURIComponent(category.slug)}&limit=${limit}&offset=0&sort=seeded&seed=${encodeURIComponent(SEED)}`);
  if (!Array.isArray(response.data)) throw new Error('Unexpected product-list response.');
  for (const product of response.data) {
    checkProduct(product);
    selected.set(product.id, product);
  }
  console.log(`  ${category.slug}: ${response.data.length}`);
}

const products = [];
for (const summary of selected.values()) {
  const detail = await api(`/products/${encodeURIComponent(summary.slug)}`);
  checkProduct(detail);
  if (!detail.variant || !detail.attributes || !Array.isArray(detail.qcGroups)) throw new Error(`${summary.slug}: expected a detailed product response.`);
  products.push(detail);
  if (products.length % 25 === 0) console.log(`  details ${products.length}/${selected.size}`);
}

if (DRY_RUN) {
  for (const p of products) console.log(`OK ${p.shopSlug} ${p.slug} qc=${p.qcPhotos?.length ?? 0}`);
  console.log(`Smoke test passed (${requestCount} requests). Nothing written.`);
  process.exit(0);
}

// Keep parent categories that the API only references via parentSlug, so existing
// category URLs (e.g. /category/shoes/) keep working.
const previous = JSON.parse(await fs.readFile(path.join(OUT_DIR, 'categories.json'), 'utf8').catch(() => '[]'));
const returned = new Set(categories.map((c) => c.slug));
const parents = new Set(categories.map((c) => c.parentSlug).filter(Boolean));
const mergedCategories = [
  ...categories,
  ...previous.filter((c) => !returned.has(c.slug) && (parents.has(c.slug) || previous.some((x) => x.parentSlug === c.slug))),
];

const outfitsResponse = await api('/outfits?featured=true&limit=24');
const outfits = Array.isArray(outfitsResponse.data) ? outfitsResponse.data : [];

const meta = {
  fetchedAt: new Date().toISOString(),
  source: 'maisonlooks-general-api-v3',
  siteSeed: SEED,
  allowedShopIds: [...SHOPS.keys()],
  totalAvailable: categories.reduce((sum, c) => sum + (c.productCount ?? 0), 0),
  perCategory: PER_CATEGORY,
  categoryCount: mergedCategories.length,
  productCount: products.length,
  outfitCount: outfits.length,
};

// Write to temp files first, then swap all at once so a failure never leaves a partial snapshot.
const files = { 'categories.json': mergedCategories, 'products.json': products, 'outfits.json': outfits, '_meta.json': meta };
for (const [name, value] of Object.entries(files)) await fs.writeFile(path.join(OUT_DIR, `${name}.tmp`), `${JSON.stringify(value, null, 2)}\n`);
for (const name of Object.keys(files)) await fs.rename(path.join(OUT_DIR, `${name}.tmp`), path.join(OUT_DIR, name));
console.log(`Saved ${products.length} official/PK products in ${mergedCategories.length} categories (${requestCount} requests).`);
