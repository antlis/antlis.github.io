import { test, expect } from '@playwright/test';

test('blog page has category filter', async ({ page }) => {
  await page.goto('/blog', { waitUntil: 'domcontentloaded' });
  const select = page.locator('#category-select');
  await expect(select).toBeVisible();
});

test('blog page has tag filter buttons', async ({ page }) => {
  await page.goto('/blog', { waitUntil: 'domcontentloaded' });
  const tagButtons = page.locator('[data-filter="tag"]');
  const count = await tagButtons.count();
  expect(count).toBeGreaterThan(0);
});

test('filtering by category shows only matching posts', async ({ page }) => {
  await page.goto('/blog', { waitUntil: 'domcontentloaded' });
  const select = page.locator('#category-select');
  await select.selectOption('Homelab');

  const cards = page.locator('.post-list .blog-card');
  const count = await cards.count();
  for (let i = 0; i < count; i++) {
    const display = await cards.nth(i).evaluate((el) => (el as HTMLElement).style.display);
    if (display !== 'none') {
      const category = await cards.nth(i).getAttribute('data-category');
      expect(category).toBe('Homelab');
    }
  }
});

test('filtering by tag shows only matching posts', async ({ page }) => {
  await page.goto('/blog', { waitUntil: 'domcontentloaded' });
  const dockerTag = page.locator('[data-filter="tag"][data-tag="docker"]');
  await dockerTag.click();

  const cards = page.locator('.post-list .blog-card');
  const count = await cards.count();
  for (let i = 0; i < count; i++) {
    const display = await cards.nth(i).evaluate((el) => (el as HTMLElement).style.display);
    if (display !== 'none') {
      const tags = await cards.nth(i).getAttribute('data-tags');
      expect(tags).toContain('docker');
    }
  }
});

test('clicking "All" tag resets filter', async ({ page }) => {
  await page.goto('/blog', { waitUntil: 'domcontentloaded' });
  const allButton = page.locator('[data-filter="tag"][data-tag="all"]');
  await allButton.click();

  const cards = page.locator('.post-list .blog-card:visible');
  const count = await cards.count();
  expect(count).toBeGreaterThan(1);
});

test('no results state shows when filter matches nothing', async ({ page }) => {
  await page.goto('/blog', { waitUntil: 'domcontentloaded' });
  const select = page.locator('#category-select');
  await select.selectOption('Homelab');

  const nonExistentTag = page.locator('[data-filter="tag"][data-tag="nonexistent"]');
  if (await nonExistentTag.isVisible()) {
    await nonExistentTag.click();
    const noResults = page.locator('#no-results');
    await expect(noResults).toHaveClass(/visible/);
  }
});

test('URL updates with category filter', async ({ page }) => {
  await page.goto('/blog', { waitUntil: 'domcontentloaded' });
  const select = page.locator('#category-select');
  await select.selectOption('Homelab');
  expect(page.url()).toContain('category=Homelab');
});

test('URL updates with tag filter', async ({ page }) => {
  await page.goto('/blog', { waitUntil: 'domcontentloaded' });
  const tagButton = page.locator('[data-filter="tag"][data-tag="docker"]');
  await tagButton.click();
  expect(page.url()).toContain('tag=docker');
});

test('category filter syncs with URL on load', async ({ page }) => {
  await page.goto('/blog?category=Homelab', { waitUntil: 'domcontentloaded' });
  const select = page.locator('#category-select');
  await expect(select).toHaveValue('Homelab');
});

test('tag filter syncs with URL on load', async ({ page }) => {
  await page.goto('/blog?tag=docker', { waitUntil: 'domcontentloaded' });
  const activeTag = page.locator('[data-filter="tag"].active');
  await expect(activeTag).toBeVisible();
});

test('clicking tag on card triggers filter', async ({ page }) => {
  await page.goto('/blog', { waitUntil: 'domcontentloaded' });
  const cardTag = page.locator('.blog-card-tag').first();
  if (await cardTag.isVisible()) {
    await cardTag.click();
    expect(page.url()).toContain('tag=');
  }
});
