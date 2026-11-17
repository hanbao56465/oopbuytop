import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://oopbuytop.net',
  output: 'static',
  integrations: [sitemap({
    filter(page) {
      const path = new URL(page).pathname;
      // Pagination and thin parameter mirrors waste crawl budget.
      if (/^\/buyer-shares\/page\//.test(path)) return false;
      return true;
    },
  })],
  redirects: {
    '/guides/qc-photo-checklist/': '/guides/oopbuy-qc-photos/',
    '/guides/how-to-use-oopbuy-spreadsheet/': '/oopbuy-spreadsheet/',
  },
});
