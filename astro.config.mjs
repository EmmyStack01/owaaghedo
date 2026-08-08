import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';
import mdx from '@astrojs/mdx';
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
    mdx(),
    markdoc(),
    sitemap({
      filter: (page) => 
        !page.includes('/keystatic') && 
        !page.includes('/api/') &&
        !page.includes('/launchpad-template') &&
        !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Parse current path
        const urlObj = new URL(item.url);
        const pathname = urlObj.pathname;

        // Match individual article pages (e.g., /articles/some-slug or /articles/some-slug/)
        const isArticleSlug = /^\/articles\/.+/.test(pathname);

        if (isArticleSlug) {
          // Force trailing slash for article detail pages
          if (!item.url.endsWith('/')) {
            item.url = `${item.url}/`;
          }
        } else {
          // Remove trailing slash for root and main pages (like /about, /articles)
          item.url = item.url.replace(/\/$/, '');
        }

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
