import { test, expect } from '@playwright/test';

test('desktop navigation links exist', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const nav = page.locator('header').first();
  await expect(nav).toBeVisible();

  for (const label of ['About', 'Blog', 'Portfolio', 'Contact']) {
    const link = page.locator(`a:has-text("${label}")`).first();
    await expect(link).toBeVisible();
  }
});

test('clicking nav link navigates to correct page', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.click('a:has-text("About")');
  await expect(page).toHaveURL(/\/about/);
  await expect(page.locator('h1').first()).toBeVisible();
});

test('language switcher exists', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const langSwitcher = page.locator('a:has-text("RU"), a:has-text("EN")');
  const count = await langSwitcher.count();
  expect(count).toBeGreaterThanOrEqual(1);
});

test('switching to Russian changes URL prefix', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const ruLink = page.locator('a:has-text("RU")').first();
  await ruLink.click();
  await expect(page).toHaveURL(/\/ru/);
});

test('switching back to English removes prefix', async ({ page }) => {
  await page.goto('/ru/', { waitUntil: 'domcontentloaded' });
  const enLink = page.locator('a:has-text("EN")').first();
  await enLink.click();
  await expect(page).toHaveURL(/^(?!.*\/ru\/).*$/);
  expect(page.url()).not.toContain('/ru/');
});

test('active nav link is highlighted', async ({ page }) => {
  await page.goto('/blog', { waitUntil: 'domcontentloaded' });
  const activeLink = page.locator('a.active, a[aria-current="page"]').first();
  await expect(activeLink).toBeVisible();
});

test('footer contains copyright', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
  const text = await footer.textContent();
  expect(text).toContain('©');
});

test('footer contains social links', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const footer = page.locator('footer');
  const socialLinks = footer.locator('a[href]');
  const count = await socialLinks.count();
  expect(count).toBeGreaterThan(0);
});
