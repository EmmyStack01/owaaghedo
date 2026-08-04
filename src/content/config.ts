import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    category: z.string().optional(),
    excerpt: z.string().optional(),
    pubDate: z.coerce.date(),
    coverImage: z.string().optional(),
  }),
});

export const collections = { articles };
