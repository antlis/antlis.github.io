# TODO

Rolling task list. Add dated entries; strike/remove when done.

## Open

- [ ] **EN/RU parity guard** — no automated check that every EN route + `translations.ts` key has a RU counterpart. Consider a small build-time assertion or a Playwright case that crawls both trees.
- [ ] **`interview-prep` collection** — decide lifecycle: keep internal, publish, or drop. Currently unlinked from nav.
- [ ] **Unit coverage for `utils/`** — `readingTime`, `drafts`, and `i18n/utils` are only exercised indirectly through E2E.

## Nice to have

- [ ] Verify all OG cards are regenerated when a post's title/slug changes (`scripts/generate-og-cards.mjs`).
- [ ] Periodic contrast / reduced-motion audit against `DESIGN.md` (WCAG AA baseline is stated, not automatically verified).

## Done

- [x] Expand `tools` collection (recent commits added ~20 tools with EN/RU descriptions).
