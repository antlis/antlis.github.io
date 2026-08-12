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
    draft: z.boolean().default(false),
    locale: z.enum(['en', 'ru']).default('en'),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    imgSrc: z.string().optional(),
    imgAlt: z.string().optional(),
  }),
})

const projectsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locale: z.enum(['en', 'ru']).default('en'),
    category: z.enum(['projects', 'portfolio']).default('portfolio'),
    imgSrc: z.string().optional(),
    imgAlt: z.string().optional(),
    href: z.string().optional(),
    blogHref: z.string().optional(),
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
    draft: z.boolean().default(false),
    locale: z.enum(['en', 'ru']).default('en'),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    imgSrc: z.string().optional(),
    imgAlt: z.string().optional(),
  }),
})

const toolsCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    description: z.string(),
    descriptionRu: z.string().optional(),
    url: z.string(),
    category: z.enum(['terminal', 'cli', 'api-clients', 'system']),
    usage: z.enum(['daily', 'rarely', 'previous']),
    openSource: z.boolean().optional().default(false),
    cli: z.boolean().optional().default(false),
    ai: z.boolean().optional().default(false),
  }),
})

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
  'interview-prep': interviewPrepCollection,
  tools: toolsCollection,
}
