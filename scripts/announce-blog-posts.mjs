import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { basename } from 'node:path'

const {
  HEAD_SHA = 'HEAD',
  SITE_URL = 'https://antlis.is-a.dev',
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID,
  TELEGRAM_POST_LOCALE = 'en',
  SOCIAL_REPORT_CONFIG = 'social-report.config.json',
  DRY_RUN,
} = process.env

const DEFAULT_MODE = 'photo'
const VALID_MODES = new Set(['photo', 'summary', 'link'])
const VALID_STATUSES = new Set(['pending', 'posted', 'skip'])
const VALID_LOCALES = new Set(['en', 'ru', 'all'])
const POST_LOCALE = VALID_LOCALES.has(TELEGRAM_POST_LOCALE) ? TELEGRAM_POST_LOCALE : 'en'

function runGit(args) {
  try {
    return execFileSync('git', args, { encoding: 'utf8' }).trim()
  } catch (error) {
    if (error.stdout) return String(error.stdout).trim()
    throw error
  }
}

function blogFiles() {
  const output = runGit(['ls-tree', '-r', '--name-only', HEAD_SHA, '--', 'src/content/blog'])
  if (!output) return []

  return output
    .split('\n')
    .map((line) => line.trim())
    .filter((file) => file.match(/\.mdx?$/))
}

function parseFrontmatter(file) {
  const source = readFileSync(file, 'utf8')
  const match = source.match(/^---\n([\s\S]*?)\n---/)
  if (!match) throw new Error(`Missing frontmatter in ${file}`)

  const data = {}
  for (const line of match[1].split('\n')) {
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!field) continue

    const [, key, rawValue] = field
    data[key] = rawValue.trim().replace(/^["']|["']$/g, '')
  }

  return data
}

function booleanValue(value) {
  return String(value ?? '').trim().toLowerCase() === 'true'
}

function absoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return undefined
  return new URL(pathOrUrl, SITE_URL).toString()
}

function postPath(file, locale) {
  const slug = basename(file).replace(/\.mdx?$/, '').replace(/-ru$/, '')
  return locale === 'ru' ? `/ru/blog/${slug}` : `/blog/${slug}`
}

function postFromFile(file) {
  const frontmatter = parseFrontmatter(file)
  const title = frontmatter.title
  const description = frontmatter.description
  const locale = frontmatter.locale === 'ru' || file.endsWith('-ru.mdx') ? 'ru' : 'en'
  const path = postPath(file, locale)

  if (!title || !description) {
    throw new Error(`Missing title or description in ${file}`)
  }

  return {
    file,
    path,
    title,
    description,
    locale,
    draft: booleanValue(frontmatter.draft),
    pubDate: frontmatter.pubDate ?? '',
    url: absoluteUrl(path),
    image: absoluteUrl(frontmatter.imgSrc),
  }
}

function readConfig() {
  if (!existsSync(SOCIAL_REPORT_CONFIG)) {
    return {
      defaults: {
        telegram: {
          mode: DEFAULT_MODE,
        },
      },
      posts: {},
    }
  }

  const config = JSON.parse(readFileSync(SOCIAL_REPORT_CONFIG, 'utf8'))
  return {
    defaults: {
      telegram: {
        mode: config.defaults?.telegram?.mode ?? DEFAULT_MODE,
      },
    },
    posts: config.posts && typeof config.posts === 'object' ? config.posts : {},
  }
}

function normalizeConfig(config) {
  const mode = VALID_MODES.has(config.defaults.telegram.mode) ? config.defaults.telegram.mode : DEFAULT_MODE

  return {
    defaults: {
      telegram: {
        mode,
      },
    },
    posts: Object.fromEntries(
      Object.entries(config.posts).map(([path, entry]) => [
        path,
        {
          ...entry,
          status: VALID_STATUSES.has(entry.status) ? entry.status : 'pending',
          mode: VALID_MODES.has(entry.mode) ? entry.mode : undefined,
          repost: entry.repost === true,
        },
      ]),
    ),
  }
}

function writeConfig(config) {
  writeFileSync(SOCIAL_REPORT_CONFIG, `${JSON.stringify(config, null, 2)}\n`)
}

function telegramLabel(post) {
  return post.locale === 'ru' ? 'Новая статья' : 'New post'
}

function telegramText(post, mode) {
  const label = telegramLabel(post)

  if (mode === 'link') {
    return `${label}: ${post.title}\n\n${post.url}`
  }

  return `${label}: ${post.title}\n\n${post.description}\n\n${post.url}`
}

function telegramCaption(post) {
  return `${telegramLabel(post)}: ${post.title}\n\n${post.description}\n\n${post.url}`
}

async function callTelegram(method, body) {
  if (DRY_RUN === 'true') {
    console.log(`[dry-run] ${method}`)
    console.log(JSON.stringify(body, null, 2))
    return { ok: true, result: { message_id: 0 } }
  }

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('Skipping Telegram announcement: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set.')
    return undefined
  }

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      ...body,
    }),
  })

  const data = await response.json().catch(async () => ({ description: await response.text() }))

  if (!response.ok || !data.ok) {
    throw new Error(`Telegram ${method} failed: ${response.status} ${JSON.stringify(data)}`)
  }

  return data
}

async function sendTelegram(post, mode) {
  if (mode === 'photo' && post.image) {
    return callTelegram('sendPhoto', {
      photo: post.image,
      caption: telegramCaption(post),
    })
  }

  return callTelegram('sendMessage', {
    text: telegramText(post, mode),
    disable_web_page_preview: mode === 'summary',
  })
}

function shouldPost(entry) {
  if (entry.status === 'skip') return false
  if (entry.repost) return true
  return entry.status !== 'posted'
}

function shouldIncludeLocale(post) {
  return POST_LOCALE === 'all' || post.locale === POST_LOCALE
}

const config = normalizeConfig(readConfig())
const posts = blogFiles()
  .map(postFromFile)
  .filter((post) => !post.draft)
  .filter(shouldIncludeLocale)
  .sort((a, b) => a.pubDate.localeCompare(b.pubDate) || a.url.localeCompare(b.url))

let changed = false
let sentCount = 0

for (const post of posts) {
  const existing = config.posts[post.path] ?? {}
  const entry = {
    title: post.title,
    file: post.file,
    url: post.url,
    image: post.image,
    status: existing.status ?? 'pending',
    mode: existing.mode ?? config.defaults.telegram.mode,
    repost: existing.repost === true,
    lastPostedAt: existing.lastPostedAt,
    messageId: existing.messageId,
  }

  if (JSON.stringify(config.posts[post.path]) !== JSON.stringify(entry)) {
    config.posts[post.path] = entry
    changed = true
  }

  if (!shouldPost(entry)) continue

  const response = await sendTelegram(post, entry.mode)
  if (!response) continue

  entry.status = 'posted'
  entry.repost = false
  entry.lastPostedAt = new Date().toISOString()
  entry.messageId = response.result?.message_id
  config.posts[post.path] = entry
  changed = true
  sentCount += 1

  console.log(`Announced ${post.file} using ${entry.mode} mode.`)
}

if (!sentCount) {
  console.log('No blog posts need Telegram announcement.')
}

if (changed && DRY_RUN !== 'true') {
  writeConfig(config)
}
