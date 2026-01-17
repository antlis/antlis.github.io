import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./blog" }),
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./portfolio" }),
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

const interviewPrepCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./interview-prep" }),
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
