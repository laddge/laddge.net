import { z, defineCollection } from 'astro:content'

const blog = defineCollection({
  schema: z.object({
    title: z.string().nonempty(),
    tags: z.string().array().min(1).max(5),
    pubDate: z.date(),
    image: z.string().default(''),
    draft: z.boolean().default(false),
  }),
})

export const collections = { blog }
