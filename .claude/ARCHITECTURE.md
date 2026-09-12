# Architecture

`antlis.is-a.dev` — a static personal blog + projects site built with Astro, deployed to GitHub Pages. Content-first, bilingual (EN/RU), near-zero client JS.

## Tech Stack

| Layer | Choice | Version | Notes |
|-------|--------|---------|-------|
| Framework | Astro | ^5.16 | `output: 'static'` — fully prerendered |
| Interactive islands | Vue | ^3.4 | via `@astrojs/vue`; used only where interactivity is needed |
| Content authoring | MDX | `@astrojs/mdx` ^4.3 | blog / projects / tools written as `.mdx` |
| Code highlighting | astro-expressive-code | ^0.42 | `github-dark` / `github-light`, theme-scoped by `[data-theme]` |
| Icons | astro-icon | ^1.1 | `devicon` + `simple-icons` sets, allowlisted in config |
| SEO | `@astrojs/sitemap`, `@astrojs/rss` | — | i18n-aware sitemap; RSS per-locale |
| Theming | astro-theme-toggle | ^0.8 | dark/light via `data-theme`, no-flash inline script |
| Images | astro-cloudinary, medium-zoom | — | remote images + click-to-zoom |
| CSS reset | modern-css-reset | ^1.4 | plain CSS + design tokens, no Tailwind |
| Lang | TypeScript | ^5.5 | `astro check` gates the build |
| E2E | Playwright | ^1.60 | `tests/*.spec.ts`, baseURL `http://localhost:4321` |

There is **no CSS framework** and **no state library** — styling is hand-written CSS with tokens defined in the layout; interactivity is a handful of small scripts/islands.

## Project Structure

```
src/
  components/      # .astro presentational components (Header, Footer, BlogCard, ProjectCard, SEO, …)
  content/         # content collections (see Content Model)
    blog/          # *.mdx + *-ru.mdx (draft-gated)
    projects/      # *.mdx + *-ru.mdx
    tools/         # *.mdx (the /tools collection)
    interview-prep/# *.mdx (internal/unlisted)
    config.ts      # zod schemas for every collection
  data/            # techStack.ts — structured stack data for badges
  i18n/            # translations.ts (UI strings) + utils.ts (locale helpers)
  layouts/         # Layout.astro — the single shell (head, SEO, theme, router)
  pages/           # file-based routes; ru/ mirrors the EN tree
  utils/           # drafts.ts, readingTime.ts
scripts/           # build-time / post-deploy node scripts (og cards, telegram announce)
public/            # static assets (fonts, og images, favicon, CNAME, robots.txt)
docs/              # human docs (social-report.md)
tests/             # Playwright specs
```

## Routing & i18n

- Astro i18n: `defaultLocale: 'en'`, locales `['en','ru']`, `prefixDefaultLocale: false` — EN is un-prefixed (`/blog`), RU is prefixed (`/ru/blog`).
- The `src/pages/ru/*` tree mirrors the root tree page-for-page. Adding a route means adding it in **both** places.
- `src/i18n/utils.ts` provides the locale plumbing: `getLocaleFromUrl`, `t(locale)` (UI strings), `localePath`, `switchLocalePath`.
- UI copy lives in `src/i18n/translations.ts`; content copy lives in the paired `*-ru.mdx` files.
- One redirect pair is pinned in `astro.config.mjs` (renamed mpv article → `tg-mpv-bot`).

## Content Model

Collections are defined in `src/content/config.ts` (zod-validated frontmatter). Key patterns:

- **blog** — `pubDate`, optional `modifiedDate`, `draft` (default `false`), tags/summary. Bilingual via `-ru.mdx` sibling files.
- **projects** — includes `stack` / `scope` string arrays that drive `TechStackBadges` / `ProjectCard`.
- **tools** — the curated CLI/tooling collection rendered at `/tools`.
- **interview-prep** — internal, not surfaced in main nav.

Draft visibility is centralized in `src/utils/drafts.ts`: `showDrafts = import.meta.env.DEV`, so drafts render in `dev` and are excluded from production builds.

**Adding a blog post?** Follow `.claude/authoring-articles.md` — the full flow (EN+RU MDX, architecture diagram SVG, terminal thumbnail, verify steps) with all conventions captured so it needs no re-research.

## Design System

Tokens and rules are authoritative in **`DESIGN.md`** (repo root) — "The Engineer's Notebook": monochrome ink/paper, a single signal-blue accent (the *One Signal Rule*), full-pill buttons/badges, hairline borders, flat-at-rest / shadow-on-hover elevation, single Inter typeface. Light/dark are token-for-token mirrors via `data-theme`. Product framing (audience, voice, anti-references) is in **`PRODUCT.md`**.

## Build & Deploy

- `npm run build` = `astro check && astro build` → static output in `dist/`.
- Deployed via GitHub Pages (`.github/workflows/astro.yml`, Node 20). Custom domain via `public/CNAME` (`antlis.is-a.dev`).
- **Post-deploy**: an `announce` job runs `scripts/announce-blog-posts.mjs` to post new blog posts to Telegram. Posted/skipped/repost state is tracked in `social-report.config.json` (committable) — see `docs/social-report.md`.
- `scripts/generate-og-cards.mjs` generates OpenGraph images into `public/og/`.

## Testing

Playwright E2E only (`tests/`, baseURL `:4321`, chromium). Suites cover: blog filtering, blog post rendering, contact form, i18n, mobile, navigation, page smoke, SEO, theme toggle. Run with `npm test` (`test:ui`, `test:headed` for debugging). CI runs them in `.github/workflows/test.yml`.

## Entry Point

`src/layouts/Layout.astro` is the single shell every page renders through: `<head>`/meta via `SEO.astro`, theme no-flash script, `ClientRouter` (view transitions), Header/Footer/Socials. Props carry per-page SEO (`pageType`, `tags`, `readingTime`, …). A `PUBLIC_WIP` env flag can flip the whole site into a "Coming Soon" state.

## Conventions

- **View Transitions init rule (important).** `Layout.astro` renders `<ClientRouter />`, so navigations are client-side swaps — inline/module `<script>`s do **not** re-execute per page. Any script that wires up DOM (event listeners, enabling controls, injecting third-party embeds) must run inside a named `init()` bound to `document.addEventListener('astro:page-load', init)` (fires on first load *and* every swap), never at top level. Guard with a `data-*ready` flag on the root element to avoid double-binding. Top-level init silently breaks after in-site navigation and "works on hard reload" — the tell for this bug. Precedents: `ChatWidget.astro`, `Comments.astro`, `blog/index.astro` (+ `ru/`), `ZoomableImages.astro`. Static-data scripts (e.g. `SEO.astro` JSON-LD) are exempt.
- Prefer `.astro` components; reach for a Vue island only when client interactivity is unavoidable.
- Any new page/route must be added to **both** the EN and `ru/` trees, with matching UI strings in `translations.ts`.
- Content is the interface — keep chrome (nav, cards, badges) receding; obey `DESIGN.md` rules (no second brand accent, no resting shadows, no gradient/eyebrow SaaS moves).
- Bilingual parity is a hard rule: every design/layout decision must hold at both EN and RU copy lengths.
