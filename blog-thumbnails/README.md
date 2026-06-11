# Blog thumbnails / hero images

Generator for the terminal-style PNG masters (1200×760) used by blog articles.
One image per article, reused for both the EN and RU versions.

## How they're used

The PNGs live in `public/blog/<slug>.png` and are served by the site directly (no
Cloudinary). Each post's frontmatter references one:

```yaml
imgSrc: "/blog/<slug>.png"
imgAlt: "..."
```

- **List card** (`Card.astro`) — a plain `<img>` cropped to a square via CSS `object-fit: cover`.
- **Article hero** (`blog/[slug].astro`, `ru/blog/[slug].astro`) — a plain `<img>` showing the full window at container width.

To read in both the square crop and the full-width hero, the terminal window is kept
**narrow and centered**, so the square card shows the whole window (traffic lights included)
and the hero gets the colored glow as side margins.

## Regenerating / adding a new article

Edit the `ARTICLES` array in `generate.mjs` (slug, palette, window path label, and the
monospace `lines`), then from the repo root:

```sh
node blog-thumbnails/generate.mjs
```

It writes directly into `public/blog/`. Requires `sharp` (already a dependency) and a
monospace font with good Unicode coverage (DejaVu Sans Mono is used).
