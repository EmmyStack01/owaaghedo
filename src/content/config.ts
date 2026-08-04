import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content', // handles .md and .mdoc
  schema: z.object({
    title: z.string(),
    pubDate: z.string().or(z.date()).optional(),
    excerpt: z.string().optional(),
    coverImage: z.string().optional(),
    category: z.string().optional(),
  }),
});

export const collections = { articles };
