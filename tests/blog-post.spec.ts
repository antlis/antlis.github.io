import { test, expect } from '@playwright/test';

test('blog post has title', async ({ page }) => {
  await page.goto('/blog/telescope-gist', { waitUntil: 'domcontentloaded' });
  const title = page.locator('h1').first();
  await expect(title).toBeVisible();
  const text = await title.textContent();
  expect(text!.length).toBeGreaterThan(0);
});

test('blog post has publication date', async ({ page }) => {
  await page.goto('/blog/telescope-gist', { waitUntil: 'domcontentloaded' });
  const date = page.locator('time, [class*="date"], [class*="pub"]');
  const count = await date.count();
  expect(count).toBeGreaterThan(0);
});

test('blog post has tags', async ({ page }) => {
  await page.goto('/blog/telescope-gist', { waitUntil: 'domcontentloaded' });
  const tags = page.locator('.blog-card-tag, .tag, [class*="tag"]');
  const count = await tags.count();
  expect(count).toBeGreaterThan(0);
});

test('blog post has hero image', async ({ page }) => {
  await page.goto('/blog/telescope-gist', { waitUntil: 'domcontentloaded' });
  const heroImg = page.locator('article img, .post img, .content img').first();
  await expect(heroImg).toBeVisible();
});

test('blog post has content', async ({ page }) => {
  await page.goto('/blog/telescope-gist', { waitUntil: 'domcontentloaded' });
  const content = page.locator('.content, article .content');
  const text = await content.first().textContent();
  expect(text!.length).toBeGreaterThan(100);
});

test('blog post has table of contents', async ({ page }) => {
  await page.goto('/blog/telescope-gist', { waitUntil: 'domcontentloaded' });
  const toc = page.locator('.toc, [class*="toc"], nav:has(a[href^="#"])');
  const count = await toc.count();
  expect(count).toBeGreaterThan(0);
});

test('blog post TOC links work', async ({ page }) => {
  await page.goto('/blog/telescope-gist', { waitUntil: 'domcontentloaded' });
  const tocLink = page.locator('.toc a[href^="#"], [class*="toc"] a[href^="#"]').first();
  if (await tocLink.isVisible()) {
    const href = await tocLink.getAttribute('href');
    expect(href).toMatch(/^#./);
  }
});

test('blog post has back to blog link', async ({ page }) => {
  await page.goto('/blog/telescope-gist', { waitUntil: 'domcontentloaded' });
  const backLink = page.locator('a:has-text("Blog"), a:has-text("Back"), a[href="/blog"]');
  const count = await backLink.count();
  expect(count).toBeGreaterThan(0);
});

test('all blog posts are accessible', async ({ page }) => {
  const slugs = [
    'nuxt-bun-create-open-source',
    'telescope-gist',
    'tg-media-bot',
    'tg-mpv-bot',
    'hermes-status-bar-token-tweaks',
    'docker-btrfs-disk-recovery',
    'linkedin-defi-scammers',
    'fzf-tmuxinator-projects',
    'brave-fzf-history',
  ];

  for (const slug of slugs) {
    const response = await page.goto(`/blog/${slug}`, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
  }
});

test('RU blog post loads', async ({ page }) => {
  const response = await page.goto('/ru/blog/telescope-gist', { waitUntil: 'domcontentloaded' });
  expect(response?.status()).toBe(200);
  const title = page.locator('h1').first();
  await expect(title).toBeVisible();
});
