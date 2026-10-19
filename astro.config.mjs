import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';

// Draft posts are built (so ?draft=true on the blog list can preview them) but must stay
// out of the sitemap; the pages themselves carry noindex.
const draftPaths = new Set(
  readdirSync('src/content/blog')
    .filter((f) => /\.mdx?$/.test(f))
    .filter((f) => /^draft:\s*true\s*$/m.test((readFileSync(`src/content/blog/${f}`, 'utf8').split(/^---$/m)[1]) ?? ''))
    .map((f) => {
      const slug = f.replace(/\.mdx?$/, '');
      return slug.endsWith('-ru') ? `/ru/blog/${slug.slice(0, -3)}` : `/blog/${slug}`;
    }),
);

// https://astro.build/config
export default defineConfig({
  site: 'https://antlis.is-a.dev',
  redirects: {
    // the mpv controller article was renamed when the bot went standalone
    '/blog/mpv-telegram-controller-hermes': '/blog/tg-mpv-bot',
    '/ru/blog/mpv-telegram-controller-hermes': '/ru/blog/tg-mpv-bot',
  },
  integrations: [
    icon({
      include: {
        devicon: [
          'astro',
          'bun',
          'css3',
          'docker',
          'git',
          'html5',
          'javascript',
          'neovim',
          'nextjs',
          'nodejs',
          'nuxtjs',
          'php',
          'python',
          'react',
          'sass',
          'typescript',
          'vuejs',
          'webpack',
          'tailwindcss'
        ],
        'simple-icons': [
          'ejs',
          'github',
          'gitlab',
          'graphql',
          'linkedin',
          'nixos',
          'stackoverflow',
          'telegram',
          'x'
        ],
      },
    }),
    expressiveCode({
      themes: ['github-dark', 'github-light'],
      themeCssSelector: (theme) => {
        const isDark = theme.type === 'dark'
        return `[data-theme='${isDark ? 'dark' : 'light'}']`
      },
    }),
    mdx(),
    sitemap({
      filter: (page) => !draftPaths.has(new URL(page).pathname.replace(/\/$/, '')),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', ru: 'ru' },
      },
    }),
  ],
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
