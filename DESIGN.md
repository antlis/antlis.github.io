---
name: antlis.is-a.dev
description: Personal blog and projects for a software developer (frontend-focused, full-stack) — precise, technical, understated.
colors:
  ink: "#1a1a1a"
  ink-dark: "#e5e5e5"
  ink-muted: "#555555"
  ink-muted-dark: "#b0b0b0"
  paper: "#fafafa"
  paper-dark: "#0a0a0a"
  surface: "#ffffff"
  surface-dark: "#111111"
  surface-hover: "#f5f5f5"
  surface-hover-dark: "#1d1d1d"
  hairline: "#e5e5e5"
  hairline-dark: "#2a2a2a"
  signal-blue: "#2563eb"
  signal-blue-dark: "#60a5fa"
  signal-blue-hover: "#1d4ed8"
  signal-blue-hover-dark: "#93bbfd"
  error: "#b91c1c"
  error-dark: "#f87171"
  service-icon-orange: "#C25E0E"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.35rem, 1.7rem + 3vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.75rem, 1.4rem + 1.5vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.3
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    letterSpacing: "0.05em"
  mono:
    fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, monospace"
    fontSize: "0.875rem"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "12px"
  full: "999px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    padding: "0.48rem 0.9rem"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "0.48rem 0.9rem"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "0.9rem 1rem"
  badge:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.full}"
    padding: "0.2rem 0.6rem"
---

# Design System: antlis.is-a.dev

## 1. Overview

**Creative North Star: "The Engineer's Notebook"**

The site reads like a well-kept engineering notebook: near-black ink on near-white paper, hairline rules instead of decoration, and exactly one accent color allowed to speak. Nothing performs confidence — the restraint *is* the confidence. Every surface is flat at rest; the only signal that something is interactive is a hairline border, a soft shadow on hover, and a 1px lift.

This system explicitly rejects the generic SaaS landing page (no gradient heroes, no hero-metric blocks, no eyebrow kickers dressing up every section) and the over-designed agency portfolio (no scroll-jacking, no oversized type stunts that outshine the work being shown). The work and the writing are the product; the chrome should recede.

**Key Characteristics:**
- Monochrome ink/paper base with a single signal-blue accent, never more
- Flat surfaces; shadow and lift exist only as hover feedback, never as default elevation
- Full-pill (999px) buttons and badges; 8px cards; hairline 1px borders everywhere else
- One typeface (Inter) carrying every register from hero display to body copy
- Light/dark are full token-for-token mirrors, not an afterthought

## 2. Colors

A near-monochrome ink-on-paper palette with one accent; the accent's scarcity is what makes it read as a signal rather than decoration.

### Primary
- **Signal Blue** (`#2563eb` light / `#60a5fa` dark): the only chromatic UI color in the system. Used for links, focus rings, active nav state, and small accent tints (`color-mix` at 18–36% into borders/shadows on hover). Never a fill larger than a button or a focus ring. Tuned to clear 4.5:1 against `paper`/`surface` in light mode (the earlier `#3b82f6` only hit ~3.6:1 as text and was failing AA on every prose link/badge).

### Semantic (errors only)
- **Error** (`#b91c1c` light / `#f87171` dark): form-validation error text only (`.error` spans on the contact form). Not part of the One Signal Rule — errors are a distinct semantic channel, not a brand accent, and are never used decoratively.

### Neutral
- **Ink** (`#1a1a1a` light / `#e5e5e5` dark): primary text, headings, primary-button fill.
- **Ink Muted** (`#555555` light / `#b0b0b0` dark): secondary/body text, labels, captions.
- **Paper** (`#fafafa` light / `#0a0a0a` dark): page background.
- **Surface** (`#ffffff` light / `#111111` dark): card, button, and input backgrounds — one step off the page background, not white-on-white.
- **Surface Hover** (`#f5f5f5` light / `#1d1d1d` dark): hover background for ghost buttons, tags, and list rows.
- **Hairline** (`#e5e5e5` light / `#2a2a2a` dark): the only border color in the system; never a colored or heavier border.

### Named Rules
**The One Signal Rule.** Signal Blue is the only chromatic *brand* color anywhere in the UI. If a second brand accent is ever needed, that's a sign the design has drifted from "engineering notebook" toward "marketing site" — stop and reconsider before adding it.

**The Borrowed Brand Rule.** Icons linking to a named external service (RSS, GitHub, LinkedIn, GitLab, StackOverflow, Telegram, email) may reveal *that service's own* canonical brand color on `:hover`/`:focus` (e.g. RSS `#C25E0E`, LinkedIn blue, Telegram blue) — this is a recognition aid for a third-party identity, not a second site accent, and does not violate the One Signal Rule. It must still clear 3:1 contrast against the surface it sits on.

## 3. Typography

**Display Font:** Inter (with `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)
**Body Font:** Inter (same stack — one family throughout)
**Label/Mono Font:** `'SF Mono', 'Fira Code', 'Fira Mono', Menlo, monospace` (code only)

**Character:** One typeface carries every register through weight and size alone — 600 for anything that needs to read as a heading, 400 for prose, 700 + uppercase + wide tracking only for the rare functional micro-label (stack-group headers, highlight-grid eyebrows). No second family is introduced anywhere.

### Hierarchy
- **Display** (600, `clamp(2.35rem, 1.7rem + 3vw, 4rem)`, line-height 1.02, letter-spacing -0.035em): hero `<h1>` only, with `text-wrap: balance`, capped at 13ch max-width.
- **Headline** (600, `clamp(1.75rem, 1.4rem + 1.5vw, 2.25rem)`, line-height 1.3): page-level `<h1>` on non-hero pages.
- **Title** (600, `clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)`, line-height 1.3): section `<h2>`.
- **Body** (400, 1rem, line-height 1.7, color Ink Muted): paragraph copy. About-page prose widens slightly via `clamp(1rem, 0.95rem + 0.25vw, 1.1rem)`. No explicit max-`ch` constraint is set on `<p>` today — container `max-width` (640–680px on prose pages) does the job instead.
- **Label** (700, 0.68–0.76rem, letter-spacing 0.05–0.06em, uppercase): tech-stack group headers, highlight-grid eyebrows, tag/badge text. Functional micro-labels on specific elements, not a per-section kicker pattern.

### Named Rules
**The Single-Family Rule.** Inter is the only typeface in the system. Don't introduce a second family for "contrast" — vary weight (400/600/650/700) and size instead.

## 4. Elevation

Flat by default, shadow-on-hover. Cards, buttons, and tags carry a 1px hairline border and no shadow at rest. On hover/focus, a soft ambient shadow plus a 1px `translateY(-1px)` lift signals interactivity; the shadow is the *response* to a state change, never a resting decoration. Dark mode uses the same mechanism with black shadows.

### Shadow Vocabulary
- **Card hover** (`box-shadow: 0 14px 34px color-mix(in srgb, #000 8%, transparent)`): blog/projects card hover state.
- **Accent CTA hover** (`box-shadow: 0 14px 30px color-mix(in srgb, var(--accent) 22%, transparent)`): primary projects CTA hover — the one place the accent tints a shadow.
- **Popover / dropdown** (`box-shadow: 0 12px 34px color-mix(in srgb, #000 16%, transparent)`): tag filter dropdown, share menu.
- **Media frame** (`box-shadow: 0 12px 32px color-mix(in srgb, #000 10%, transparent)`): hero images and code-block frames.

### Named Rules
**The Flat-By-Default Rule.** No element carries a shadow at rest. A shadow only appears as a transition response to `:hover` or an open/active state.

## 5. Components

### Buttons
- **Shape:** full pill (`border-radius: 999px`), min-height 2.35rem, padding `0.48rem 0.9rem`.
- **Primary:** `background: var(--text)` / `color: var(--bg)` (ink-on-paper inverted) — used once per view, for the single most important action (hero "View projects").
- **Secondary / Ghost:** `border: 1px solid var(--border)`, `background: var(--card-bg)`, `color: var(--text)` — every other action (nav pills, "Read the blog", "View all", filter pills).
- **Hover / Focus:** color/border/background transition at 0.2s; `:focus-visible` gets a 2px Signal Blue outline with 2px offset, independent of the button's own hover treatment.

### Chips / Tags / Badges
- **Style:** `border: 1px solid color-mix(in srgb, var(--accent) 24%, var(--border))`, full pill, 0.68–0.76rem uppercase-ish weight-700 text. The accent only tints the border, never fills the chip.
- **State:** tag filters toggle to a filled `var(--card-hover)` background when active.

### Cards / Containers
- **Corner Style:** 8px for blog/projects cards; 10px for the larger ProjectCard detail cards and code frames; 12px for hero images.
- **Background:** `var(--card-bg)` — one step lighter (light mode) / lighter-than-page (dark mode) off `var(--bg)`.
- **Shadow Strategy:** flat at rest, see Elevation.
- **Border:** 1px `var(--border)` always; on hover, blends toward Signal Blue via `color-mix(... 36%, var(--border))`.
- **Internal Padding:** ~0.9rem–1rem.

### Inputs / Fields
- **Style:** 1px `var(--border)`, `var(--card-bg)` background, 6–8px radius.
- **Focus:** border-color shift to ink/accent, no glow.

### Navigation
- Pill-shaped nav links matching the secondary-button treatment; active route gets `aria-current="page"` plus a color/underline shift. Mobile collapses to a slide-out menu with the same pill links stacked.

### Icon Targets
- **Hit area:** every icon-only control (theme toggle, RSS link, social icons, hamburger) keeps its visual size small (20–24px) but expands its clickable box via negative margin to 32–44px depending on how tightly packed the row is (44px for isolated controls like the hamburger; 32px for tightly-spaced icon rows like the footer socials, sized to stay just under the gap between neighbors so hit areas don't overlap).

## 6. Do's and Don'ts

### Do:
- **Do** keep Signal Blue as the only chromatic *brand* accent; everything else is ink/paper/hairline.
- **Do** keep buttons and badges full-pill (999px); keep cards at 8–12px depending on size.
- **Do** keep shadows flat-at-rest, hover-triggered only.
- **Do** keep the single Inter family; differentiate via weight and size, not a second font.
- **Do** keep prose containers narrow (640–680px) and hero `<h1>` capped at 13ch for balanced wrapping.
- **Do** keep icon-only controls at a 32–44px clickable hit area even when the visual icon stays small.
- **Do** let an external-service icon (RSS, GitHub, LinkedIn, etc.) reveal its own brand color on hover/focus — that's the Borrowed Brand Rule, not a second accent.

### Don't:
- **Don't** introduce a generic SaaS landing page move: gradient heroes, hero-metric blocks ("big number, small label"), or a tiny uppercase eyebrow above every section.
- **Don't** add agency-portfolio flourishes: scroll-jacking, oversized type stunts, or motion that competes with the work being shown.
- **Don't** use `border-left`/`border-right` colored accent stripes on cards or list items. Exception: a blog-post `<blockquote>` may keep a left accent rule — that's an editorial convention (long-form quote styling), not the dashboard-card "side-stripe" tell this rule targets.
- **Don't** add a second *brand* accent color; route any new "needs emphasis" case through Signal Blue, weight, or size instead. (Borrowed third-party brand colors on external-service icons are the one sanctioned exception — see Borrowed Brand Rule.)
- **Don't** give a card or button a resting shadow — shadows only respond to `:hover`/`:focus`.
- **Don't** color error text decoratively — `--error` is reserved for form-validation failures only.
