import { test, expect } from '@playwright/test';

test('theme toggle button exists', async ({ page }) => {
  await page.goto('/');
  const toggle = page.locator('astro-theme-toggle');
  await expect(toggle).toBeVisible();
});

test('default theme is light', async ({ page }) => {
  await page.goto('/');
  const theme = await page.getAttribute('html', 'data-theme');
  expect(theme).toBe('light');
});

test('clicking theme toggle switches to dark', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    const toggle = document.querySelector<HTMLElement>('astro-theme-toggle');
    if (toggle) toggle.click();
  });
  await page.waitForTimeout(100);
  const theme = await page.getAttribute('html', 'data-theme');
  expect(theme).toBe('dark');
});

test('clicking theme toggle again switches back to light', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    const toggle = document.querySelector<HTMLElement>('astro-theme-toggle');
    if (toggle) toggle.click();
  });
  await page.waitForTimeout(100);
  await page.evaluate(() => {
    const toggle = document.querySelector<HTMLElement>('astro-theme-toggle');
    if (toggle) toggle.click();
  });
  await page.waitForTimeout(100);
  const theme = await page.getAttribute('html', 'data-theme');
  expect(theme).toBe('light');
});

test('theme persists across navigation', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    const toggle = document.querySelector<HTMLElement>('astro-theme-toggle');
    if (toggle) toggle.click();
  });
  await page.waitForTimeout(100);
  expect(await page.getAttribute('html', 'data-theme')).toBe('dark');

  await page.click('a:has-text("About")');
  await page.waitForTimeout(500);
  expect(await page.getAttribute('html', 'data-theme')).toBe('dark');
});

test('theme persists in localStorage', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    const toggle = document.querySelector<HTMLElement>('astro-theme-toggle');
    if (toggle) toggle.click();
  });
  await page.waitForTimeout(100);

  const stored = await page.evaluate(() => localStorage.getItem('theme-toggle'));
  expect(stored).toBe('dark');
});
