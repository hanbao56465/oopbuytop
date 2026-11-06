// Parcel weight statistics computed from the committed catalog snapshot at build
// time. Measurements are warehouse QC measurements (source: qc_measured) of a
// representative parcel per item, so they include that item's own packaging.
import { catalogCategories, catalogMeta, catalogProducts } from './catalog';
import { searchCategorySlugs } from './category-content';

export const VOLUMETRIC_DIVISOR = 5000;
const MIN_ITEMS = 6;
// Catch-all or visibly miscategorised lanes (e.g. football kits filed as jumpsuits)
// would make a misleading "typical weight", so they are left out of the table.
const EXCLUDED = new Set(['accessory-others', 'jumpsuits-rompers']);

type Measured = { weightG: number; lengthCm: number | null; widthCm: number | null; heightCm: number | null; sampleCount: number };

const measured = catalogProducts
  .map((product) => ({ product, m: (product as { measurements?: Measured | null }).measurements }))
  .filter((entry): entry is { product: (typeof catalogProducts)[number]; m: Measured } => Boolean(entry.m?.weightG));

function quantile(values: number[], q: number) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * q))];
}

export type WeightRow = { slug: string; name: string; items: number; medianG: number; lowG: number; highG: number; volumetricG: number | null; href: string | null };

const byCategory = new Map<string, Measured[]>();
for (const { product, m } of measured) {
  if (!product.category) continue;
  if (!byCategory.has(product.category)) byCategory.set(product.category, []);
  byCategory.get(product.category)!.push(m);
}

export const weightRows: WeightRow[] = [...byCategory]
  .filter(([slug, list]) => list.length >= MIN_ITEMS && !EXCLUDED.has(slug))
  .map(([slug, list]) => {
    const weights = list.map((m) => m.weightG);
    const volumes = list
      .filter((m) => m.lengthCm && m.widthCm && m.heightCm)
      .map((m) => (m.lengthCm! * m.widthCm! * m.heightCm!) / VOLUMETRIC_DIVISOR * 1000);
    return {
      slug,
      name: catalogCategories.find((category) => category.slug === slug)?.name ?? slug,
      items: list.length,
      medianG: quantile(weights, 0.5),
      lowG: quantile(weights, 0.25),
      highG: quantile(weights, 0.75),
      volumetricG: volumes.length ? Math.round(quantile(volumes, 0.5)) : null,
      href: searchCategorySlugs.includes(slug) ? `/category/${slug}/` : null,
    };
  })
  .sort((a, b) => b.medianG - a.medianG);

const counted = measured.filter(({ product }) => product.category && weightRows.some((row) => row.slug === product.category));
export const weightStats = {
  items: counted.length,
  samples: counted.reduce((sum, { m }) => sum + (m.sampleCount || 0), 0),
  categories: weightRows.length,
  checkedAt: catalogMeta.fetchedAt,
};

export function formatGrams(grams: number) {
  return grams >= 1000 ? `${(grams / 1000).toFixed(grams >= 10000 ? 0 : 1)} kg` : `${Math.round(grams / 10) * 10} g`;
}

export function rowFor(slug: string) {
  return weightRows.find((row) => row.slug === slug);
}
