export interface ReadingTime {
  minutes: number
  text: string
  isoDuration: string
}

export function getReadingTime(content: string, locale: 'en' | 'ru'): ReadingTime {
  const words = content.match(/[\p{L}\p{N}]+/gu)?.length ?? 0
  const minutes = Math.max(1, Math.ceil(words / 220))

  return {
    minutes,
    text: locale === 'ru' ? `${minutes} мин чтения` : `${minutes} min read`,
    isoDuration: `PT${minutes}M`,
  }
}
