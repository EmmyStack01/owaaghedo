import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    authorName: z.string().default('Owa Aghedo'),
    category: z.string().default('Education & Explainers'),
    excerpt: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    coverImage: z.string().optional(),
    footerSpacer: z.string().optional(),
  }),
});

export const collections = { articles };
