import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 812 } });

test('mobile menu button is visible', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const hamburger = page.locator('button.menu-toggle');
  await expect(hamburger).toBeVisible();
});

test('mobile menu opens on click', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const hamburger = page.locator('button.menu-toggle');
  await hamburger.click();

  const mobileMenu = page.locator('.mobile-menu');
  await expect(mobileMenu).toHaveClass(/open/);
});

test('mobile menu has navigation links', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const hamburger = page.locator('button.menu-toggle');
  await hamburger.click();

  for (const label of ['About', 'Blog', 'Portfolio', 'Contact']) {
    const link = page.locator(`.mobile-link:has-text("${label}")`).first();
    await expect(link).toBeVisible();
  }
});

test('mobile menu closes when link clicked', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const hamburger = page.locator('button.menu-toggle');
  await hamburger.click();

  await page.click('.mobile-link:has-text("About")');
  await expect(page).toHaveURL(/\/about/);
});

test('blog page is usable on mobile', async ({ page }) => {
  await page.goto('/blog', { waitUntil: 'domcontentloaded' });
  const cards = page.locator('.card');
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);
});

test('contact form is usable on mobile', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('input[name="name"], #name')).toBeVisible();
  await expect(page.locator('input[name="email"], #email')).toBeVisible();
  await expect(page.locator('textarea[name="message"], #message')).toBeVisible();
});

test('portfolio page is usable on mobile', async ({ page }) => {
  await page.goto('/portfolio', { waitUntil: 'domcontentloaded' });
  const items = page.locator('a.project');
  const count = await items.count();
  expect(count).toBeGreaterThan(0);
});
