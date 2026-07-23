import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';

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
        devicon: ['astro', 'bun', 'css3', 'docker', 'git', 'html5', 'javascript', 'neovim', 'nextjs', 'nodejs', 'nuxtjs', 'php', 'python', 'react', 'sass', 'typescript', 'vuejs', 'webpack'],
        'simple-icons': ['ejs', 'github', 'gitlab', 'graphql', 'linkedin', 'nixos', 'stackoverflow', 'telegram', 'x'],
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
