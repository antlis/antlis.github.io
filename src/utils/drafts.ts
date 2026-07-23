import type { CollectionEntry } from 'astro:content'

export const showDrafts = import.meta.env.DEV

export function isVisibleBlogPost(post: CollectionEntry<'blog'>) {
  return showDrafts || !post.data.draft
}
