import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://oopbuytop.net',
  output: 'static',
  integrations: [sitemap()],
  redirects: {
    '/guides/qc-photo-checklist/': '/guides/oopbuy-qc-photos/',
    '/guides/how-to-use-oopbuy-spreadsheet/': '/oopbuy-spreadsheet/',
  },
});
