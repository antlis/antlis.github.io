import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname } from 'node:path'

const {
  HEAD_SHA = 'HEAD',
  SITE_URL = 'https://antlis.is-a.dev',
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID,
  ANNOUNCE_STATE_FILE = '.cache/telegram-announced-posts.json',
  DRY_RUN,
} = process.env

function runGit(args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim()
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

function postUrl(file, locale) {
  const slug = basename(file).replace(/\.mdx?$/, '').replace(/-ru$/, '')
  const path = locale === 'ru' ? `/ru/blog/${slug}` : `/blog/${slug}`
  return new URL(path, SITE_URL).toString()
}

function postFromFile(file) {
  const frontmatter = parseFrontmatter(file)
  const title = frontmatter.title
  const description = frontmatter.description
  const locale = frontmatter.locale === 'ru' || file.endsWith('-ru.mdx') ? 'ru' : 'en'

  if (!title || !description) {
    throw new Error(`Missing title or description in ${file}`)
  }

  return {
    file,
    title,
    description,
    locale,
    draft: booleanValue(frontmatter.draft),
    pubDate: frontmatter.pubDate ?? '',
    url: postUrl(file, locale),
  }
}

function telegramMessage(post) {
  const label = post.locale === 'ru' ? 'Новая статья' : 'New post'
  return `${label}: ${post.title}\n\n${post.description}\n\n${post.url}`
}

function readState() {
  if (!existsSync(ANNOUNCE_STATE_FILE)) return { urls: [] }

  const state = JSON.parse(readFileSync(ANNOUNCE_STATE_FILE, 'utf8'))
  return {
    urls: Array.isArray(state.urls) ? state.urls : [],
  }
}

function writeState(state) {
  mkdirSync(dirname(ANNOUNCE_STATE_FILE), { recursive: true })
  writeFileSync(`${ANNOUNCE_STATE_FILE}.tmp`, `${JSON.stringify(state, null, 2)}\n`)
  writeFileSync(ANNOUNCE_STATE_FILE, readFileSync(`${ANNOUNCE_STATE_FILE}.tmp`))
}

async function sendTelegram(text) {
  if (DRY_RUN === 'true') {
    console.log(text)
    return true
  }

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('Skipping Telegram announcement: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set.')
    return false
  }

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      disable_web_page_preview: false,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Telegram sendMessage failed: ${response.status} ${body}`)
  }

  return true
}

const state = readState()
const announced = new Set(state.urls)
const posts = blogFiles()
  .map(postFromFile)
  .filter((post) => !post.draft)
  .filter((post) => !announced.has(post.url))
  .sort((a, b) => a.pubDate.localeCompare(b.pubDate) || a.url.localeCompare(b.url))

if (!posts.length) {
  console.log('No unannounced blog posts.')
  if (DRY_RUN !== 'true') {
    writeState({ urls: Array.from(announced).sort() })
  }
  process.exit(0)
}

for (const post of posts) {
  const sent = await sendTelegram(telegramMessage(post))
  if (!sent) continue

  announced.add(post.url)
  console.log(`Announced ${post.file}`)
}

if (DRY_RUN !== 'true') {
  writeState({ urls: Array.from(announced).sort() })
}
