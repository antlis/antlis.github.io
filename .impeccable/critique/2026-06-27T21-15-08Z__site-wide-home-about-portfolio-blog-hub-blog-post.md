---
target: site-wide (home, about, portfolio, blog hub, blog post)
total_score: 28
p0_count: 0
p1_count: 2
timestamp: 2026-06-27T21-15-08Z
slug: site-wide-home-about-portfolio-blog-hub-blog-post
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Contact form's network-failure path resets the button with zero message — silent dead end |
| 2 | Match Between System and Real World | 4 | Plain, direct copy throughout; no jargon |
| 3 | User Control and Freedom | 3 | Clear-filters, theme toggle, language switcher all present; nothing notable missing for this surface |
| 4 | Consistency and Standards | 2 | Brand name splits "Anton L" (titles/meta/JSON-LD) vs "Antlis" (footer copyright, post-page title suffix); blog filter UI forks into two different control sets above/below 768px |
| 5 | Error Prevention | 2 | Contact form is `novalidate` + JS-only validation with no guardrail on network failure |
| 6 | Recognition Rather Than Recall | 4 | Nav always visible, active states everywhere, current page marked via `aria-current` |
| 7 | Flexibility and Efficiency | 3 | RSS, tag deep-links, search; no shortcuts needed at this surface's scale |
| 8 | Aesthetic and Minimalist Design | 3 | Genuinely restrained system; docked by blog-filter complexity and two stray accent colors |
| 9 | Error Recovery | 1 | Silent fetch-failure path on the one form that exists; no `aria-invalid`/`role="alert"` wiring |
| 10 | Help and Documentation | 3 | Not a complex flow; contact page frames the fastest path ("quickest way to reach me") clearly |
| **Total** | | **28/40** | **Solid foundation, fixes are concentrated and mechanical** |

## Anti-Patterns Verdict

**Does this look AI-generated? No.** The site clears essentially every absolute ban in the impeccable skill: no gradient text, no glassmorphism, no hero-metric template, no eyebrow-above-every-section as a structural pattern, no nested cards, no numbered section markers as scaffolding. The blog/portfolio grids are appropriately card-shaped for that content type rather than a reflexive "identical card grid." It reads like a developer built it deliberately over time, not generated in one pass.

**Deterministic scan** (`detect.mjs` against `src/pages`, `src/components`, `src/layouts`, exit code 2, 28 findings):
- 2× `side-tab` (warning): `border-left: 3px solid var(--accent)` on blog-post `<blockquote>` (EN + RU mirrors of `[slug].astro:613`). This is the literal "side-stripe accent border" ban — but on a blockquote, which is a long-standing editorial convention, not the dashboard-card tell the rule targets. Borderline; see Priority Issues.
- 2× `layout-transition` (warning): `Header.astro:225,258` animate `max-height`/`padding-top` for the mobile menu. Real perf anti-pattern, low blast radius (small DOM, infrequent trigger).
- 3× `overused-font` (warning): Inter, flagged 3× in `Layout.astro`. Real per the detector's generic list, but Inter is a defensible, near-universal choice for a "precise/technical" engineering brand — not flagging as a priority issue, noting for awareness only.
- 17× `design-system-color` (advisory): mostly **false positives** — `color-mix(in srgb, #000 N%, transparent)` used to darken ambient shadows is utility math, not a palette color. Two are real drift: `Footer.astro:90` (`#EE802F`, hardcoded RSS-brand orange) and `contact.astro:248` (`#ef4444`, hardcoded error red) — both outside the documented one-accent system. `#0f172a` in `[slug].astro:657` is a deliberate fixed-dark backing for architecture-diagram SVGs (theme-independent by design) — not an issue.
- 3× `design-system-radius` (advisory): `1px`/`7px`/`2px` — incidental shapes (hamburger bar corners, a button radius one px off the 8px scale, the focus-ring radius), not real design decisions. Not flagging.

No browser visualization was possible this run — see note below.

**Browser visualization**: unavailable. Puppeteer's bundled Chromium failed to launch in this sandbox (`libglib-2.0.so.0` missing from the runtime), so no live overlay, no screenshots, and no computed-style sampling. I substituted raw SSR HTML fetches (`curl`-equivalent, dev mode) for structure/markup/meta verification, and computed WCAG contrast ratios by hand from the actual `:root` token values in `Layout.astro`. No overlay is visible in any browser tab; treat the contrast findings below as token-math, not a rendered measurement, though the two are equivalent since these are flat hex values with no gradients or images behind text.

## Overall Impression

The brand-positioning work (precise, technical, understated) is genuinely reflected in the code, not just the copy — flat-by-default surfaces, one accent, one typeface, consistent pill/8px-radius vocabulary, real SEO/structured-data discipline most personal sites skip entirely. The biggest opportunity isn't visual: it's that the system's own discipline slips in exactly the moments that matter most for this site's stated purpose (getting hired, getting contacted) — the accent blue is too light to pass contrast as text, and the one form on the site can fail silently. Tightening those two things buys more credibility than any visual polish would.

## What's Working

- **Real SEO/structured-data investment**: canonical + hreflang alternates, OG/Twitter cards, JSON-LD for `WebSite`/`Person`/`ProfilePage`/`CollectionPage`/`BreadcrumbList`, RSS, sitemap — present on every page type, in both locales. Unusually thorough for a personal site and directly serves the "get found, get hired" goal.
- **Accessibility foundations already in place**: skip-link, visible `:focus-visible` rings, `aria-current="page"` on active nav links (desktop + mobile), `aria-live="polite"` on the blog filter summary, a global `prefers-reduced-motion` override, a `<main>` landmark with `tabindex="-1"` for the skip link to land on.
- **Color/type restraint actually holds**: body text contrast is excellent (7:1–9:1 in both themes — the opposite of the "light gray for elegance" AI tell), one typeface carries every register through weight alone, the card/button/badge vocabulary repeats cleanly across home/blog/portfolio without drifting.

## Priority Issues

**[P1] Accent blue fails WCAG AA as text color in light mode**
- **Why it matters**: `--accent: #3b82f6` on `#fafafa`/`#ffffff` measures 3.52–3.68:1; WCAG AA needs 4.5:1 for normal-size text. It's used as direct text color in every prose link (about, contact, portfolio detail, blog-post content), the blog-card/portfolio-card category badges, the blog-post TOC active state, and the 404 page's "404" label — all at body or smaller sizes, none qualifying as "large text." In dark mode the lighter `#60a5fa` passes fine (7.4–7.8:1), so this is a light-mode-only regression that's easy to miss if you mostly test in dark.
- **Fix**: darken the light-mode accent for text contexts — either shift `--accent` itself toward `#1d4ed8`/`#1e40af` (clears 4.5:1+ while staying recognizably blue), or split it into `--accent` (borders/backgrounds, current value is fine there) and a separate `--accent-text` token used wherever accent colors actual text/links.
- **Suggested command**: `/impeccable typeset` or `/impeccable colorize`, scoped to the `--accent` token and every `color: var(--accent)` text usage found above.

**[P1] Contact form fails silently on network error and has no error-state wiring for assistive tech**
- **Why it matters**: in `contact.astro`'s submit handler, the `catch` block on the `fetch` call only re-enables the button and resets its label — it shows no message at all. A user on a flaky connection gets no feedback that anything went wrong and no instruction to retry. Separately, the per-field `.error` spans are plain `<span>`s with no `aria-live`/`role="alert"`, and inputs have no `aria-invalid`/`aria-describedby`, so a screen-reader user gets no notification when validation fails. This is the one form on a site whose stated purpose is "make it easy to get in touch" — the failure mode lands exactly on the highest-stakes interaction.
- **Fix**: in the `catch` block, render the same "Something went wrong. Please try again." message used in the `!json.success` branch. Add `role="alert"` (or wrap in a shared `aria-live="polite"` region) to each `.error` span, and toggle `aria-invalid`/`aria-describedby` on the corresponding input in `validateField`.
- **Suggested command**: `/impeccable harden`, scoped to `src/pages/contact.astro` (and its `ru/contact.astro` mirror).

**[P2] Two accent colors leak outside the documented one-accent system**
- **Why it matters**: `Footer.astro` hardcodes `#EE802F` (conventional RSS orange) as the RSS icon's hover color, and `contact.astro` hardcodes `#ef4444` for form-error text. Neither is in DESIGN.md. The RSS orange also fails contrast in light mode (2.70:1, below even the 3:1 non-text minimum) and is the only spot on the site where a color other than ink/paper/signal-blue appears — a small but real crack in the "restraint is the brand" promise that's otherwise held everywhere else.
- **Fix**: drop the RSS hover color and let it use the same ink/accent hover treatment as every other footer icon; keep a semantic error red but pick one that's deliberate and documented (and re-check its contrast — `#ef4444` is also only 3.76:1 on white, under AA for that size text).
- **Suggested command**: `/impeccable colorize` (consolidate), then `/impeccable document` to re-sync DESIGN.md once the palette is final.

**[P2] Blog filter UI is disproportionate machinery for ~10 posts, and forks into two different controls by viewport**
- **Why it matters**: the blog index ships a search box, a category `<select>`, a multi-select tag `<details>` dropdown, a row of tag-filter pills, and a clear-filters button — five distinct filter affordances — for a collection that (per the content directory) holds about 10 English posts. That's a "wall of options" relative to the content volume, and it actively contradicts the "precise, technical, understated" / "content is the interface, chrome should recede" principles in PRODUCT.md. It also forks: the whole sidebar is `display:none` below 768px in favor of a separately-implemented `.mobile-filters` block, so the desktop and mobile filtering experiences are two different UIs rather than one responsive one (Consistency heuristic).
- **Fix**: collapse to one mechanism that works identically at every width — e.g. search plus a single combined category/tag picker behind one "Filter" disclosure — and revisit once the post count actually justifies faceted filtering.
- **Suggested command**: `/impeccable distill`, scoped to `src/pages/blog/index.astro`.

**[P2] Several interactive icon controls are under the 44×44px mobile tap-target minimum**
- **Why it matters**: the theme toggle (24×24px), the RSS icon (20×20px), and each social icon (20×20px) have no padding expanding their hit area; the hamburger button's effective tap area is roughly 36×36px. On a site likely to be skimmed one-handed on a phone (a recruiter checking a link), these are easy to mis-tap, and there's no compensating spacing between adjacent icons in the footer's `.socials` row.
- **Fix**: keep the visual icon size but pad the clickable box (button/anchor) to a 44px minimum, consistent with the rest of the pill/button vocabulary already in the system.
- **Suggested command**: `/impeccable adapt`.

**[P3] Brand name is inconsistent: "Anton L" vs "Antlis"**
- **Why it matters**: every `<title>`, meta tag, and JSON-LD `Person`/`WebSite` entry uses "Anton L," but the footer copyright reads "© 2026 Antlis" and the blog-post page title template appends "| Antlis" instead of "| Anton L." On a site whose entire job is building credibility around a name, a split identity is a small but real consistency gap.
- **Fix**: standardize on "Anton L" (the name already carrying all the SEO/structured-data weight) everywhere, including the footer and blog-post title suffix.
- **Suggested command**: `/impeccable clarify`.

## Persona Red Flags

**Jordan (first-timer / recruiter skimming)**: The homepage and nav communicate identity and purpose immediately — strong first seconds. But landing on `/blog`, the five-control filter sidebar reads more like "this is a small app" than "this is a blog with ten posts," a slight tonal mismatch with the understated brand promise that the rest of the site keeps.

**Riley (deliberate stress tester)**: Tries the contact form on a throttled/interrupted connection. The submit silently resets with no error message — Riley has no idea whether the message sent, failed, or is still pending, and nothing in the DOM (no `aria-live`, no visible text) tells them. For someone evaluating a frontend developer's attention to detail, this is the worst possible place for a silent failure.

**Casey (distracted mobile user)**: Taps the theme toggle, RSS link, or a social icon one-handed and has a real chance of missing (sub-44px targets, no padding). On `/blog`, Casey gets the `.mobile-filters` block instead of the sidebar — functionally present, but it's a second implementation of the same feature, so any future change to filtering logic has two places to update and two places to drift apart.

## Minor Observations

- `blog/[slug].astro`'s blockquote uses a 3px left accent border — the detector's literal match for the "side-stripe" ban, but blockquotes are a defensible exception to that rule (editorial convention, not a dashboard-card tell). Worth an explicit carve-out in DESIGN.md's Do's/Don'ts rather than treating it as drift.
- The mobile menu's `max-height`/`padding-top` transition animates layout properties; a `transform: scaleY()` + `opacity` or `grid-template-rows` swap would be smoother and match the system's flat-by-default elevation discipline.
- `architecture-diagram` images use a hardcoded `#0f172a` backing — intentional (keeps SVG diagrams legible regardless of site theme), not an issue.
- The contact form has no `action` attribute and relies entirely on JS to intercept `submit`; with JavaScript disabled it will attempt a default browser submit with nowhere useful to go. Low priority for this audience, but worth a one-line `<noscript>` fallback message if it's cheap.

## Questions to Consider

- Is the blog's faceted filter UI sized for where the blog is today, or for where it'll be in two years? If the latter, it might be worth keeping as-is and revisiting the cognitive-load tradeoff once post count grows.
- The accent blue passes contrast in dark mode but not light — was light mode tested as much as dark during development, or did dark mode get more attention?
- "Anton L" vs "Antlis" — is one of these the legal/preferred public identity, or are both intentional (e.g., "Antlis" as a handle, "Anton L" as the professional name)? If intentional, the fix is to use them consistently in their respective contexts rather than collapsing to one.
