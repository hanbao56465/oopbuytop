import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://oopbuytop.net',
  output: 'static',
  integrations: [sitemap()],
});
