import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => data.locale === 'ru' && !data.draft)
  const site = context.site!.toString().replace(/\/$/, '')

  return rss({
    title: 'Anton L — Блог',
    description: 'Статьи о веб-разработке, инструментах и технологиях.',
    site: context.site!.toString(),
    items: posts
      .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
      .map((post) => {
        const link = `/ru/blog/${post.slug.replace(/-ru$/, '')}/`
        const categories = [post.data.category, ...(post.data.tags || [])].filter(Boolean) as string[]

        return {
          title: post.data.title,
          pubDate: post.data.pubDate,
          description: post.data.description,
          link,
          categories,
          content: `<p>${post.data.description}</p><p><a href="${site}${link}">Читать статью полностью</a></p>`,
          ...(post.data.modifiedDate && { customData: `<lastBuildDate>${post.data.modifiedDate.toUTCString()}</lastBuildDate>` }),
        }
      }),
  })
}
