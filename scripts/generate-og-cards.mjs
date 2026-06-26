import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'

const blogDir = 'src/content/blog'
const outDir = 'public/og/blog'

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function getFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}

  return Object.fromEntries(
    match[1]
      .split('\n')
      .map((line) => {
        const index = line.indexOf(':')
        if (index === -1) return null
        const key = line.slice(0, index).trim()
        const value = line.slice(index + 1).trim().replace(/^"|"$/g, '')
        return [key, value]
      })
      .filter(Boolean),
  )
}

function wrap(text, maxLength, maxLines) {
  const words = text.split(/\s+/)
  const lines = []
  let line = ''

  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (next.length > maxLength && line) {
      lines.push(line)
      line = word
    } else {
      line = next
    }
    if (lines.length === maxLines) break
  }

  if (line && lines.length < maxLines) lines.push(line)
  return lines
}

function card({ title, description, category, locale }) {
  const titleLines = wrap(title, locale === 'ru' ? 31 : 34, 3)
  const descriptionLines = wrap(description, locale === 'ru' ? 58 : 64, 2)
  const titleY = titleLines.length === 1 ? 280 : titleLines.length === 2 ? 250 : 220

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0f172a"/>
      <stop offset="0.52" stop-color="#111827"/>
      <stop offset="1" stop-color="#1e3a8a"/>
    </linearGradient>
    <radialGradient id="glow" cx="82%" cy="18%" r="60%">
      <stop offset="0" stop-color="#38bdf8" stop-opacity="0.32"/>
      <stop offset="1" stop-color="#38bdf8" stop-opacity="0"/>
    </radialGradient>
    <style>
      .brand{font:700 28px system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;fill:#e5eefb}
      .chip{font:700 22px system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;fill:#bae6fd}
      .title{font:800 58px system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;fill:#f8fafc}
      .desc{font:500 25px system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;fill:#cbd5e1}
      .url{font:600 22px system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;fill:#93c5fd}
    </style>
  </defs>
  <rect width="1200" height="630" rx="0" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <path d="M80 505 C240 395 335 548 498 442 S780 316 1120 406" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="9 13" opacity=".42"/>
  <path d="M80 142 C250 82 368 96 506 164 S752 205 914 112 S1065 94 1130 138" fill="none" stroke="#60a5fa" stroke-width="2" stroke-dasharray="9 13" opacity=".34"/>
  <rect x="72" y="66" width="1056" height="498" rx="34" fill="#020617" opacity=".28" stroke="#334155"/>
  <text x="104" y="124" class="brand">Anton L</text>
  <rect x="104" y="158" width="${Math.max(150, category.length * 15 + 44)}" height="46" rx="23" fill="#082f49" stroke="#0ea5e9" opacity=".95"/>
  <text x="126" y="188" class="chip">${escapeXml(category)}</text>
  ${titleLines.map((line, index) => `<text x="104" y="${titleY + index * 70}" class="title">${escapeXml(line)}</text>`).join('\n  ')}
  ${descriptionLines.map((line, index) => `<text x="104" y="${455 + index * 38}" class="desc">${escapeXml(line)}</text>`).join('\n  ')}
  <text x="104" y="536" class="url">antlis.is-a.dev</text>
</svg>
`
}

mkdirSync(outDir, { recursive: true })
mkdirSync(join(outDir, 'ru'), { recursive: true })

for (const file of readdirSync(blogDir).filter((name) => name.endsWith('.mdx'))) {
  const content = readFileSync(join(blogDir, file), 'utf8')
  const data = getFrontmatter(content)
  const locale = data.locale === 'ru' ? 'ru' : 'en'
  const slug = basename(file, '.mdx').replace(/-ru$/, '')
  const target = locale === 'ru' ? join(outDir, 'ru', `${slug}.svg`) : join(outDir, `${slug}.svg`)

  writeFileSync(
    target,
    card({
      title: data.title,
      description: data.description,
      category: data.category || 'Blog',
      locale,
    }),
  )
}
