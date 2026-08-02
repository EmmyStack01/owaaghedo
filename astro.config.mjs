import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://owaaghedo.pages.dev',
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
  integrations: [
    react(),
    keystatic(),
    sitemap({
      filter: (page) => 
        !page.includes('/keystatic') && 
        !page.includes('/api/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    ssr: {
      // Prevents bundling issues with Keystatic & React SSR
      external: ['node:authtoken', 'node:fs', 'node:path', 'node:crypto'],
    },
    resolve: {
      // Directs React to standard browser/worker implementations
      conditions: ['workerd', 'worker', 'browser'],
    },
  },
});
