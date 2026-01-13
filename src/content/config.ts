import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    cover: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  blog,
};
