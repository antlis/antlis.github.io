import { defineCollection, z } from 'astro:content'

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    imgSrc: z.string().optional(),
    imgAlt: z.string().optional(),
  }),
})

const portfolioCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    imgSrc: z.string().optional(),
    imgAlt: z.string().optional(),
    href: z.string().optional(),
  }),
})

const interviewPrepCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    imgSrc: z.string().optional(),
    imgAlt: z.string().optional(),
  }),
})

export const collections = {
  blog: blogCollection,
  portfolio: portfolioCollection,
  'interview-prep': interviewPrepCollection,
}
