import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // 1. Update site to match your actual Cloudflare Pages URL (or custom domain)
  site: 'https://owaaghedo.pages.dev',
  
  // 2. Keystatic requires dynamic API routes, so Astro must run in server/hybrid mode
  output: 'server', 

  adapter: cloudflare({
    imageService: 'passthrough', // Avoid potential Cloudflare Image Resizing binding errors if not enabled on account
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
