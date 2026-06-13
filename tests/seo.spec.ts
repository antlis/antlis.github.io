import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle(/Anton L/i);
});

test('homepage has meta description', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const description = page.locator('meta[name="description"]');
  const content = await description.getAttribute('content');
  expect(content).toBeTruthy();
  expect(content!.length).toBeGreaterThan(0);
});

test('homepage has canonical link', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const canonical = page.locator('link[rel="canonical"]');
  const href = await canonical.getAttribute('href');
  expect(href).toMatch(/antlis\.is-a\.dev/);
});

test('homepage has Open Graph meta tags', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const ogTitle = page.locator('meta[property="og:title"]');
  expect(await ogTitle.getAttribute('content')).toBeTruthy();
  const ogDesc = page.locator('meta[property="og:description"]');
  expect(await ogDesc.getAttribute('content')).toBeTruthy();
  const ogType = page.locator('meta[property="og:type"]');
  expect(await ogType.getAttribute('content')).toBeTruthy();
});

test('homepage has Twitter Card meta tags', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const twitterCard = page.locator('meta[name="twitter:card"]');
  expect(await twitterCard.getAttribute('content')).toBeTruthy();
});

test('blog post has article meta tags', async ({ page }) => {
  await page.goto('/blog/telescope-gist', { waitUntil: 'domcontentloaded' });
  const ogType = page.locator('meta[property="og:type"]');
  expect(await ogType.getAttribute('content')).toBe('article');
});

test('homepage has hreflang alternates', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const alternate = page.locator('link[rel="alternate"][hreflang="ru"]');
  const href = await alternate.getAttribute('href');
  expect(href).toBeTruthy();
});

test('homepage has RSS alternate link', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const rss = page.locator('link[type="application/rss+xml"]');
  const href = await rss.getAttribute('href');
  expect(href).toBeTruthy();
});

test('homepage has favicon', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const favicon = page.locator('link[rel="icon"], link[rel="shortcut icon"]');
  const count = await favicon.count();
  expect(count).toBeGreaterThan(0);
});

test('blog post has JSON-LD structured data', async ({ page }) => {
  await page.goto('/blog/telescope-gist', { waitUntil: 'domcontentloaded' });
  const jsonLd = page.locator('script[type="application/ld+json"]');
  const count = await jsonLd.count();
  expect(count).toBeGreaterThan(0);

  const content = await jsonLd.first().textContent();
  const data = JSON.parse(content!);
  expect(data['@type']).toBe('BlogPosting');
});

test('homepage has WebSite JSON-LD', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const jsonLd = page.locator('script[type="application/ld+json"]');
  const count = await jsonLd.count();
  expect(count).toBeGreaterThan(0);

  const content = await jsonLd.first().textContent();
  const data = JSON.parse(content!);
  expect(data['@type']).toBe('WebSite');
});
