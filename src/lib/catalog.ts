import categories from '../data/categories.json';
import products from '../data/products.json';
import meta from '../data/_meta.json';

export type Category = { slug: string; name: string; parentSlug: string | null; imageUrl: string | null; productCount: number | null };
export type Product = { slug: string; title: string; description: string | null; category: string | null; brand: string | null; priceCnyRange: [number, number] | null; priceCny: number | null; priceUsdEstimate: [number, number] | null; images: string[]; qcPhotoCount: number; hasTryOn: boolean; updatedAt: string };

export const catalogCategories = categories as Category[];
export const catalogProducts = (products as Product[]).filter((product) => product.brand !== 'Louis Vuitton');
export const catalogMeta = meta as { fetchedAt: string; categoryCount: number; productCount: number; outfitCount: number };

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

export function maisonCategoryUrl(slug: string) {
  return `https://maisonlooks.com/c/${encodeURIComponent(slug)}`;
}

export function maisonProductUrl(slug: string) {
  return `https://maisonlooks.com/en/p/${encodeURIComponent(slug)}`;
}

export function displayPrice(product: Product) {
  if (product.priceUsdEstimate) return `~$${product.priceUsdEstimate[0]}–$${product.priceUsdEstimate[1]}`;
  if (product.priceCny) return `¥${product.priceCny}`;
  if (product.priceCnyRange) return `¥${product.priceCnyRange[0]}–¥${product.priceCnyRange[1]}`;
  return 'See current price';
}
