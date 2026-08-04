import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc'; // <--- 1. Import Markdoc
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://owaaghedo.pages.dev',
  trailingSlash: 'ignore',
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
  integrations: [
    react(),
    keystatic(),
    markdoc(), // <--- 2. Add Markdoc integration here!
    sitemap({
      filter: (page) => 
        !page.includes('/keystatic') && 
        !page.includes('/api/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        item.url = item.url.replace(/\/$/, '');
        return item;
      }
    }),
  ],
  vite: {
    ssr: {
      external: ['node:authtoken', 'node:fs', 'node:path', 'node:crypto'],
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          banner: `if (typeof globalThis.MessageChannel === 'undefined') {
  globalThis.MessageChannel = class MessageChannel {
    constructor() {
      this.port1 = { onmessage: null, postMessage: () => {} };
      this.port2 = { onmessage: null, postMessage: () => {} };
    }
  };
}`,
        },
      },
    },
  },
});
