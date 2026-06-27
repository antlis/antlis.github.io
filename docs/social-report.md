# Social report

Social report publishes blog posts to external channels after the site deploys. Today it supports Telegram through `scripts/announce-blog-posts.mjs`.

The workflow runs after GitHub Pages deploys on pushes to `master`:

1. Read all files in `src/content/blog`.
2. Ignore posts with `draft: true`.
3. Read `social-report.config.json`.
4. Publish posts that are missing from the config, marked as `pending`, or have `"repost": true`.
5. Write the post result back to `social-report.config.json`.
6. Commit the updated config with `[skip ci]` so the commit does not start another deploy.

## Required secrets

Set these as GitHub repository secrets:

- `TELEGRAM_BOT_TOKEN`: bot token from BotFather.
- `TELEGRAM_CHAT_ID`: channel or chat id where posts are published.

For local testing, copy the same names into `.env` or export them in your shell. Do not commit real secret values.

## Config

`social-report.config.json` is intentionally committed. It is the control panel for what has already been posted and what should be reposted.

```json
{
  "defaults": {
    "telegram": {
      "mode": "photo"
    }
  },
  "posts": {
    "/blog/example": {
      "title": "Example post",
      "file": "src/content/blog/example.mdx",
      "url": "https://antlis.is-a.dev/blog/example",
      "image": "https://antlis.is-a.dev/blog/example.png",
      "status": "posted",
      "mode": "photo",
      "repost": false,
      "lastPostedAt": "2026-06-27T18:00:00.000Z",
      "messageId": 123
    }
  }
}
```

Post keys are site paths, for example `/blog/post-slug` and `/ru/blog/post-slug`.

## Statuses

- `pending`: publish this post on the next workflow run.
- `posted`: do not publish again unless `repost` is set to `true`.
- `skip`: never publish this post until the status is changed.

Draft posts are always ignored, even if they are listed in the config.

## Modes

- `photo`: send the post `imgSrc` as a Telegram photo with the title, description, and link in the caption. If the post has no `imgSrc`, it falls back to a text message.
- `summary`: send title, description, and link as text, with Telegram link preview disabled.
- `link`: send title and link only, with Telegram link preview enabled.

The default mode is configured at `defaults.telegram.mode`. Individual posts can override it with their own `mode`.

## Reposting

To repost one article, edit that entry:

```json
{
  "status": "posted",
  "mode": "photo",
  "repost": true
}
```

Push the change to `master`. After Telegram accepts the post, the script changes `repost` back to `false`, updates `lastPostedAt`, and stores the new `messageId`.

To try a different format, change `mode` and set `repost` to `true`.

## Backfilling old posts

If `social-report.config.json` has no entry for a non-draft post, that post is treated as `pending`. This means the first run with an empty config will publish all non-draft blog posts.

To prevent an old post from being published, add it manually with:

```json
{
  "status": "skip",
  "mode": "photo",
  "repost": false
}
```

## Russian and English posts

The script detects Russian posts from `locale: ru` or the `-ru.mdx` filename suffix. Telegram labels are localized:

- English: `New post`
- Russian: `Новая статья`

Each translation is tracked separately because English and Russian posts have different URLs.

## Local dry run

Use dry run mode to inspect what would be sent without contacting Telegram or updating the config:

```sh
DRY_RUN=true node scripts/announce-blog-posts.mjs
```

Use a different config file when testing:

```sh
SOCIAL_REPORT_CONFIG=/tmp/social-report-test.json DRY_RUN=true node scripts/announce-blog-posts.mjs
```

## Future package shape

The current code is a project-local script plus a committed JSON config. That keeps this site simple while preserving a clean extraction path:

- Move the script into a package.
- Keep `social-report.config.json` as the public API.
- Add providers for Telegram, X/Twitter, Mastodon, or Bluesky.
- Add an Astro integration wrapper that runs after build or in CI.
