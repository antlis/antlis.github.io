import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => data.locale === 'ru')

  return rss({
    title: 'Anton L — Блог',
    description: 'Статьи о веб-разработке, инструментах и технологиях.',
    site: context.site!.toString(),
    items: posts
      .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/ru/blog/${post.slug.replace(/-ru$/, '')}/`,
      })),
  })
}
