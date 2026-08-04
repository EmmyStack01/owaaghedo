import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    category: z.string().optional(),
    excerpt: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    coverImage: z.string().optional(),
  }),
});

// Add siteSettings data collection
const siteSettings = defineCollection({
  loader: file('src/content/siteSettings.yaml'),
  schema: z.object({
    email: z.string().optional(),
    twitterUrl: z.string().optional(),
    facebookUrl: z.string().optional(),
  }),
});

// Export siteSettings alongside articles
export const collections = { articles, siteSettings };
