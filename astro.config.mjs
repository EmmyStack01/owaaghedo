import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://owaaghedo.morning-mountain-c623.workers.dev',
  output: 'static', // Correct output setting for Astro v5+
  adapter: cloudflare({
    imageService: 'cloudflare'
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
      external: ['node:authtoken', 'node:fs', 'node:path', 'node:crypto'],
    },
  },
});
