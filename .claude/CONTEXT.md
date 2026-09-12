# Context

Working context for `antlis.is-a.dev`. For the *how* (stack, structure) see `ARCHITECTURE.md`; for product/brand see `PRODUCT.md`; for design tokens see `DESIGN.md`.

## What this is

Anton L's personal site: a blog + projects portfolio that establishes software-engineering credibility (frontend-focused, full-stack when needed). Static Astro site, bilingual EN/RU, hosted on GitHub Pages at `https://antlis.is-a.dev`.

Success = a visitor trusts the skill level fast and then does one of: reads a post, browses a project, or reaches out.

## Audience

- **Hiring side** — recruiters, hiring managers, engineering peers doing a quick credibility scan (projects, about) before freelance/full-time outreach.
- **Readers** — developers arriving at a specific technical post (Vue/React/TypeScript, terminal workflow, self-hosted/homelab).

Two very different intents share one site: fast credibility scan vs. focused long-form read. Chrome must serve both without shouting.

## Content surfaces

| Surface | Route | Collection | Purpose |
|---------|-------|-----------|---------|
| Home | `/` | — | hero + recent posts + selected projects |
| Blog | `/blog`, `/blog/[slug]` | `blog` | technical writing, tag-filterable |
| Projects | `/projects`, `/projects/[slug]` | `projects` | production work w/ stack + scope |
| Tools | `/tools` | `tools` | curated CLI / tooling the author uses |
| About | `/about` | — | bio / credibility |
| Contact | `/contact` | — | contact form |
| RSS | `/rss.xml` (+ `/ru/`) | — | per-locale feed |

Each has a `ru/` mirror. `interview-prep` is an internal collection, not linked from nav.

## Key decisions (the "why")

- **Astro static, not a SPA** — content is the product; ship HTML, keep JS near-zero. Vue islands only where interaction is unavoidable.
- **One signal accent + Inter only** — restraint *is* the brand (see `DESIGN.md`). Deliberately rejects SaaS-landing and agency-portfolio aesthetics.
- **Bilingual by duplication, not runtime** — RU pages are real files under `ru/`, RU content is `*-ru.mdx` siblings. Simpler, fully static, SEO-clean; cost is manual parity.
- **Draft gating via env** — drafts show in `dev`, vanish in production (`src/utils/drafts.ts`). No separate CMS/preview infra.
- **Telegram announce as post-deploy step** — new posts auto-announced; dedupe/repost state committed in `social-report.config.json` so it survives CI.

## Current state (2026-08)

- Site is live and actively maintained; `tools` collection recently expanded (recent commits add ~20 tools).
- Full EN/RU parity across blog, projects, tools.
- A `PUBLIC_WIP` flag exists to flip the site to a "Coming Soon" holding page if needed.

## Open questions / watch-outs

- **Parity drift** — EN/RU mirrors and `translations.ts` are maintained by hand; easy to add an EN route or string and forget the RU side. No automated parity check today.
- **`interview-prep`** — intent/lifecycle of this collection is internal; confirm before surfacing or removing.
- **No unit tests** — only Playwright E2E. Logic in `utils/` (`readingTime`, `drafts`, i18n helpers) is covered only indirectly.
