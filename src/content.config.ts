import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

export const collections = {
  blog: defineCollection({
    loader: glob({
      pattern: '**\/[^_]*\/[^_]*.{md,mdx}',
      base: './src/content/blog',
    }),
    schema: z.object({
      title: z.string(),
      description: z.string().nullish(),
      tags: z.array(z.string()).nullish(),
      publishDate: z.date(),
    }),
  }),
  works: defineCollection({
    loader: glob({
      pattern: '**\/[^_]*\/[^_]*.{md,mdx}',
      base: './src/content/works',
    }),
    schema: z.object({
      title: z.string(),
      description: z.string().nullish(),
      tags: z.array(z.string()).nullish(),
      publishDate: z.date(),
    }),
  }),
}
