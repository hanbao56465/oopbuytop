import { qcCatalogProducts, type Product } from './catalog';

const MIN_QC_FINDS = 3;
const excludedBrands = new Set(['Other', 'Louis Vuitton']);

export function brandSlug(brand: string) {
  return brand
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

type BrandBucket = { brand: string; slug: string; products: Product[] };

const brandMap = new Map<string, BrandBucket>();
for (const product of qcCatalogProducts) {
  const brand = product.brand?.trim();
  if (!brand || excludedBrands.has(brand)) continue;
  const slug = brandSlug(brand);
  if (!slug) continue;
  const existing = brandMap.get(slug);
  if (existing) {
    existing.products.push(product);
  } else {
    brandMap.set(slug, { brand, slug, products: [product] });
  }
}

export const catalogBrands = [...brandMap.values()]
  .map((entry) => ({
    brand: entry.brand,
    slug: entry.slug,
    productCount: entry.products.length,
    qcPhotoTotal: entry.products.reduce((sum, product) => sum + product.qcPhotoCount, 0),
    products: [...entry.products].sort((a, b) => b.qcPhotoCount - a.qcPhotoCount || a.title.localeCompare(b.title)),
  }))
  .filter((entry) => entry.productCount >= MIN_QC_FINDS)
  .sort((a, b) => b.productCount - a.productCount || a.brand.localeCompare(b.brand));

const brandsBySlug = new Map(catalogBrands.map((entry) => [entry.slug, entry]));
const brandsByName = new Map(catalogBrands.map((entry) => [entry.brand.toLowerCase(), entry]));

export function brandPageForSlug(slug: string) {
  return brandsBySlug.get(slug);
}

export function brandPageForName(brand: string | null | undefined) {
  if (!brand) return undefined;
  return brandsByName.get(brand.trim().toLowerCase());
}

export function brandPageUrl(brand: string) {
  const entry = brandPageForName(brand);
  return entry ? `/brand/${entry.slug}/` : `/finds/?q=${encodeURIComponent(brand)}`;
}
