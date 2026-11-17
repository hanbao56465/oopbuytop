import { displayPrice, formatCatalogCheckedAt, productsForCategory, qcCatalogProducts, type Product, type ProductMeasurements } from './catalog';
import { VOLUMETRIC_DIVISOR, formatGrams } from './parcel-weights';

type MeasuredProduct = Product;

function usdMid(product: Product) {
  if (product.priceUsdEstimate) return (product.priceUsdEstimate[0] + product.priceUsdEstimate[1]) / 2;
  if (typeof product.priceCny === 'number') return product.priceCny / 7.2;
  if (typeof product.priceCny === 'string' && product.priceCny.trim()) {
    const value = Number(product.priceCny);
    return Number.isFinite(value) ? value / 7.2 : null;
  }
  return null;
}

function volumetricGrams(m: ProductMeasurements) {
  if (!m.lengthCm || !m.widthCm || !m.heightCm) return null;
  return Math.round((m.lengthCm * m.widthCm * m.heightCm) / VOLUMETRIC_DIVISOR * 1000);
}

function volumeHint(title: string) {
  const match = title.match(/(\d+)\s*ml\b/i);
  return match ? `${match[1]} ml` : null;
}

export const perfumeDemoSlugs = [
  'venenum-32-75ml-perfume-dc5b30',
  'saint-laurent-born-in-roma-the-gold-eau-de-parfum-3fe172',
  'le-labo-another-13-perfume-100ml-badef0',
] as const;

const perfumeProducts = productsForCategory('perfume')
  .filter((product) => product.qcPhotoCount > 0 && product.description && product.images?.length)
  .sort((a, b) => b.qcPhotoCount - a.qcPhotoCount || a.title.localeCompare(b.title)) as MeasuredProduct[];

const measuredPerfume = perfumeProducts.filter((product) => product.measurements?.weightG);
const usdValues = perfumeProducts.map(usdMid).filter((value): value is number => value != null).sort((a, b) => a - b);
const weights = measuredPerfume.map((product) => product.measurements!.weightG).sort((a, b) => a - b);

function median(values: number[]) {
  if (!values.length) return null;
  return values[Math.floor(values.length / 2)];
}

export const perfumeEvidence = {
  checkedAt: formatCatalogCheckedAt(),
  findCount: perfumeProducts.length,
  brandCount: new Set(perfumeProducts.map((product) => product.brand).filter(Boolean)).size,
  qcPhotoTotal: perfumeProducts.reduce((sum, product) => sum + product.qcPhotoCount, 0),
  measuredCount: measuredPerfume.length,
  priceMinUsd: usdValues[0] ?? null,
  priceMedUsd: median(usdValues),
  priceMaxUsd: usdValues.at(-1) ?? null,
  weightMedG: median(weights),
  weightLowG: weights[0] ?? null,
  weightHighG: weights.at(-1) ?? null,
  rows: perfumeProducts.map((product) => {
    const m = product.measurements;
    const vol = m ? volumetricGrams(m) : null;
    return {
      slug: product.slug,
      title: product.title,
      brand: product.brand && product.brand !== 'Other' ? product.brand : 'Unlabelled',
      href: `/finds/${product.slug}/`,
      qcPhotoCount: product.qcPhotoCount,
      qcGroups: product.qcGroups?.length ?? 0,
      priceLabel: displayPrice(product),
      usd: usdMid(product),
      volumeHint: volumeHint(product.title),
      weightG: m?.weightG ?? null,
      weightLabel: m?.weightG ? formatGrams(m.weightG) : null,
      boxLabel: m?.lengthCm && m.widthCm && m.heightCm ? `${m.lengthCm}×${m.widthCm}×${m.heightCm} cm` : null,
      volumetricG: vol,
      volumetricLabel: vol != null ? formatGrams(vol) : null,
      sampleCount: m?.sampleCount ?? 0,
      isDemo: (perfumeDemoSlugs as readonly string[]).includes(product.slug),
    };
  }),
};

export const perfumeDemoProducts = perfumeDemoSlugs
  .map((slug) => perfumeProducts.find((product) => product.slug === slug) ?? qcCatalogProducts.find((product) => product.slug === slug))
  .filter(Boolean) as MeasuredProduct[];

export function productMeasurements(product: Product) {
  return (product as MeasuredProduct).measurements?.weightG ? (product as MeasuredProduct).measurements! : null;
}

export function formatUsdBand(min: number | null, med: number | null, max: number | null) {
  if (min == null || max == null) return 'price context unavailable';
  const fmt = (n: number) => `$${n.toFixed(n >= 10 ? 0 : 2)}`;
  if (med == null) return `${fmt(min)}–${fmt(max)}`;
  return `${fmt(min)}–${fmt(max)} (median ${fmt(med)})`;
}
