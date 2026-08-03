# antlis.is-a.dev

Personal blog and projects website built with [Astro](https://astro.build/).

## Features

- Blog with recent posts
- Projects section
- About and Contact pages
- i18n support (English and Russian)
- Dark/Light theme toggle
- RSS feed
- Sitemap generation

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [Vue](https://vuejs.org/) - Interactive components
- [MDX](https://mdxjs.com/) - Content authoring
- [astro-expressive-code](https://expressive-code.com/) - Code highlighting

## Development

```sh
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Publishing

Blog posts are announced to Telegram after deployment. The posted/skipped/repost state is controlled in `social-report.config.json`; see [docs/social-report.md](docs/social-report.md).

## License

MIT
