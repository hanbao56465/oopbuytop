import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://oopbuytop.net',
  output: 'static',
  integrations: [sitemap({
    // Product detail pages are noindex; keep the finds directory indexable.
    filter: (page) => !/^\/finds\/[^/]+\/?$/.test(new URL(page).pathname),
  })],
  redirects: {
    '/guides/qc-photo-checklist/': '/guides/oopbuy-qc-photos/',
    '/guides/how-to-use-oopbuy-spreadsheet/': '/oopbuy-spreadsheet/',
  },
});
