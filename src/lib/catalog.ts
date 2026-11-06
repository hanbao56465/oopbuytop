import categories from '../data/categories.json';
import products from '../data/products.json';
import meta from '../data/_meta.json';
import { trackedOutboundUrl } from './outbound';

export type Category = { slug: string; name: string; parentSlug: string | null; imageUrl: string | null; productCount: number | null };
export type Product = { id: string; slug: string; shopSlug: string; productUrl: string; title: string; description: string | null; category: string | null; brand: string | null; priceCnyRange: [number, number] | null; priceCny: number | string | null; priceUsdEstimate: [number, number] | null; images: string[]; qcPhotoCount: number; hasTryOn: boolean; updatedAt: string };

export const catalogCategories = categories as Category[];
export const catalogProducts = (products as Product[]).filter((product) => product.brand !== 'Louis Vuitton');
export const catalogMeta = meta as { fetchedAt: string; categoryCount: number; productCount: number; outfitCount: number };
export const qcCatalogProducts = catalogProducts.filter((product) => (
  product.qcPhotoCount > 0
  && Boolean(product.slug)
  && Boolean(product.title)
  && Boolean(product.description)
  && Boolean(product.images?.length)
));

export function formatCatalogCheckedAt(locale = 'en-US') {
  const date = new Date(catalogMeta.fetchedAt);
  if (Number.isNaN(date.getTime())) return 'date unavailable';
  return new Intl.DateTimeFormat(locale, { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
}

export function productsForCategory(slug: string) {
  // Parent categories (for example, Dresses & One-piece) have their listings
  // stored in child categories such as Casual and Formal. Include descendants
  // so a valid category page never renders as an empty catalog.
  const categorySlugs = new Set([slug]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const category of catalogCategories) {
      if (category.parentSlug && categorySlugs.has(category.parentSlug) && !categorySlugs.has(category.slug)) {
        categorySlugs.add(category.slug);
        changed = true;
      }
    }
  }
  return catalogProducts.filter((product) => product.category && categorySlugs.has(product.category));
}

// A real product photo for a category card: the item with the most QC photos
// (including child categories) that has an image in the current snapshot.
// Pass a shared `used` set when rendering a grid so parent and child categories
// (e.g. Shoes and Heels) do not show the same photo.
// Some API listings are miscategorised (e.g. football jerseys under dresses), and
// parent categories would otherwise reuse a child card's photo, so prefer titles
// that clearly match the card.
const categoryPhotoHints: Record<string, RegExp> = {
  dresses: /\bdress\b/i,
  shoes: /sneaker/i,
  electronics: /headphone|earbud|airpods/i,
};

export function categoryImage(slug: string, used: Set<string> = new Set()) {
  const hint = categoryPhotoHints[slug];
  const best = productsForCategory(slug)
    .filter((product) => product.images?.length && !used.has(product.images[0]))
    .sort((a, b) => Number(hint?.test(b.title) ?? 0) - Number(hint?.test(a.title) ?? 0) || b.qcPhotoCount - a.qcPhotoCount)[0];
  if (!best) return null;
  used.add(best.images[0]);
  return { src: best.images[0], alt: best.title };
}

export function maisonCategoryUrl(slug: string, placement = 'category_live') {
  return trackedOutboundUrl(`https://maisonlooks.com/c/${encodeURIComponent(slug)}`, placement);
}

export function formatProductUpdatedAt(product: Product, locale = 'en-US') {
  const date = new Date(product.updatedAt);
  if (Number.isNaN(date.getTime())) return formatCatalogCheckedAt(locale);
  return new Intl.DateTimeFormat(locale, { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
}

export function categoryName(slug: string | null) {
  if (!slug) return 'Oopbuy finds';
  return catalogCategories.find((category) => category.slug === slug)?.name ?? slug.replaceAll('-', ' ');
}

export function findPageUrl(product: Product) {
  return `/finds/${product.slug}/`;
}

// Always use the storefront URL returned by the API: official and PK products live
// on different subdomains, so a slug must never be joined to a single shop domain.
export function maisonProductUrl(product: Pick<Product, 'productUrl'>, placement = 'product_card') {
  return trackedOutboundUrl(product.productUrl, placement);
}

export function displayPrice(product: Product) {
  if (product.priceUsdEstimate) {
    const [minimum, maximum] = product.priceUsdEstimate;
    return minimum === maximum ? `~$${minimum}` : `~$${minimum}–$${maximum}`;
  }
  if (product.priceCny) return `¥${product.priceCny}`;
  if (product.priceCnyRange) {
    const [minimum, maximum] = product.priceCnyRange;
    return minimum === maximum ? `¥${minimum}` : `¥${minimum}–¥${maximum}`;
  }
  return 'See current price';
}
