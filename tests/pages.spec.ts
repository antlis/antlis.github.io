import { test, expect } from '@playwright/test';

const enRoutes = ['/', '/about', '/blog', '/portfolio', '/contact'];
const ruRoutes = ['/ru/', '/ru/about', '/ru/blog', '/ru/portfolio', '/ru/contact'];

for (const route of enRoutes) {
  test(`EN page ${route} loads`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
  });
}

for (const route of ruRoutes) {
  test(`RU page ${route} loads`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
  });
}

test('homepage shows recent posts', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const cards = page.locator('.post-grid .card');
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);
  expect(count).toBeLessThanOrEqual(3);
});

test('blog listing shows post cards', async ({ page }) => {
  await page.goto('/blog', { waitUntil: 'domcontentloaded' });
  const cards = page.locator('.card');
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);
});

test('blog post detail page loads', async ({ page }) => {
  await page.goto('/blog/telescope-gist', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('h1').first()).toBeVisible();
});

test('portfolio listing shows items', async ({ page }) => {
  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' });
  const items = page.locator('a.project');
  const count = await items.count();
  expect(count).toBeGreaterThan(0);
});

test('RSS feed is valid XML', async ({ page }) => {
  const response = await page.goto('/rss.xml');
  expect(response?.status()).toBe(200);
  const text = await page.textContent('body');
  expect(text).toContain('<rss');
  expect(text).toContain('<channel>');
});

test('RU RSS feed is valid XML', async ({ page }) => {
  const response = await page.goto('/ru/rss.xml');
  expect(response?.status()).toBe(200);
  const text = await page.textContent('body');
  expect(text).toContain('<rss');
});

test('redirect: /blog/mpv-telegram-controller-hermes -> /blog/tg-mpv-bot', async ({ page }) => {
  await page.goto('/blog/mpv-telegram-controller-hermes');
  expect(page.url()).toContain('/blog/tg-mpv-bot');
});

test('404 page for non-existent route', async ({ page }) => {
  const response = await page.goto('/non-existent-page');
  expect(response?.status()).toBe(404);
});
