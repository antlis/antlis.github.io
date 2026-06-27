import { defineCollection, z } from 'astro:content'

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    summary: z.string().optional(),
    author: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    pubDate: z.date(),
    modifiedDate: z.date().optional(),
    locale: z.enum(['en', 'ru']).default('en'),
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
    locale: z.enum(['en', 'ru']).default('en'),
    imgSrc: z.string().optional(),
    imgAlt: z.string().optional(),
    href: z.string().optional(),
    stack: z.array(z.string()).optional(),
    year: z.string().optional(),
    role: z.string().optional(),
    scope: z.array(z.string()).optional(),
    highlights: z.array(z.string()).optional(),
    outcome: z.string().optional(),
    improvements: z.string().optional(),
    imageCaption: z.string().optional(),
  }),
})

const interviewPrepCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    summary: z.string().optional(),
    author: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    pubDate: z.date(),
    modifiedDate: z.date().optional(),
    locale: z.enum(['en', 'ru']).default('en'),
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
