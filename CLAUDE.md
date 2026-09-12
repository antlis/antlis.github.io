# CLAUDE.md — antlis.is-a.dev

Personal blog + portfolio. Static **Astro** site, bilingual **EN/RU by file duplication** (`*-ru.mdx`, `ru/` routes), GitHub Pages.

Deeper docs — tracked at repo root:
- `DESIGN.md` — design tokens, spacing, color
- `PRODUCT.md` — brand voice, product framing

Local working notes in `.claude/` (gitignored, present on this machine):
- `.claude/CONTEXT.md` — what the site is, audience, key decisions
- `.claude/ARCHITECTURE.md` — stack, structure, conventions
- `.claude/authoring-articles.md` — full flow for adding a blog post (read before writing one)

## Gotchas that bite

- **View Transitions init rule.** `<ClientRouter />` is active, so inline/module `<script>`s do **not** re-run on client-side navigation. Any DOM wiring (listeners, enabling inputs, third-party embeds like giscus) must run in a named `init()` bound to `astro:page-load` — never at top level — with a `data-*ready` guard to avoid double-binding. Symptom of getting this wrong: feature works on hard reload but is dead after navigating to the page in-site. See `.claude/ARCHITECTURE.md` → Conventions.
- **EN/RU parity is manual.** Adding an EN route/string/post means adding the RU sibling too; there's no automated parity check.
- **Drafts.** `draft: true` shows in `npm run dev`, excluded from the production build (`src/utils/drafts.ts`).

## Verify

`npx astro check` (0 errors) and `npm run build` before pushing. Commit/push only when asked.
