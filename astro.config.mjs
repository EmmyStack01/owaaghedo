import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // IMPORTANT: Set your real production site URL here for valid canonical sitemaps
  site: 'https://owaaghedo.com',
  
  output: 'hybrid', // Ensures dynamic API endpoints while statically prerendering site pages
  adapter: cloudflare({
    imageService: 'cloudflare'
  }),
  integrations: [
    react(),
    markdoc(),
    keystatic(),
    sitemap({
      filter: (page) => 
        !page.includes('/keystatic') && 
        !page.includes('/api/'), // Exclude Keystatic admin & API routes from sitemap index
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});