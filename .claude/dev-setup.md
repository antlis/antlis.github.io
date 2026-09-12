# Dev Setup

## Prerequisites

- Node 20 (matches CI — `.github/workflows/astro.yml` / `test.yml`)
- npm (repo ships `package-lock.json`)
- Chromium for Playwright (`npx playwright install chromium`, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`)

## Install & run

```sh
npm install
npm run dev        # astro dev  → http://localhost:4321  (drafts VISIBLE here)
npm run build      # astro check && astro build → dist/
npm run preview    # serve the production build
```

`astro check` runs first in `build`; TypeScript / content-schema errors fail the build.

## Tests

```sh
npm test           # playwright test (headless, chromium, baseURL :4321)
npm run test:ui    # playwright --ui
npm run test:headed
```

`playwright.config.ts` auto-starts `npm run dev` as the web server and reuses an existing one locally.

## Environment variables

Local env lives in `.env` (git-ignored); template in `.env.example`.

| Var | Used by | Purpose |
|-----|---------|---------|
| `PUBLIC_WIP` | `Layout.astro` | `'true'` flips the whole site to a "Coming Soon" page |
| `SOCIAL_REPORT_CONFIG` | `scripts/announce-blog-posts.mjs` | path to the announce config (default `social-report.config.json`) |
| Telegram creds | announce script (CI secrets) | bot token / chat id for post announcements |

Draft posts don't need a flag — they render automatically in `dev` and are excluded from `build` via `src/utils/drafts.ts` (`showDrafts = import.meta.env.DEV`).

## Authoring content

- Add `src/content/<collection>/<slug>.mdx` **and** its `<slug>-ru.mdx` sibling for the RU version.
- Frontmatter is zod-validated in `src/content/config.ts` — check the schema for required fields (e.g. `pubDate`, `draft`, `stack`/`scope` for projects).
- Set `draft: true` to keep a post dev-only until ready.
- New **routes** must be added to both `src/pages/*` and `src/pages/ru/*`, with UI strings in `src/i18n/translations.ts`.

## Build-time / ops scripts

```sh
node scripts/generate-og-cards.mjs      # regenerate OpenGraph images → public/og/
node scripts/announce-blog-posts.mjs    # announce new posts to Telegram (runs post-deploy in CI)
```

See `docs/social-report.md` for the announce/posted-state model.

## Deploy

- Push to the default branch → GitHub Pages builds & deploys via `.github/workflows/astro.yml` (Node 20).
- Post-deploy `announce` job runs the Telegram announcer.
- Custom domain: `public/CNAME` → `antlis.is-a.dev`.
