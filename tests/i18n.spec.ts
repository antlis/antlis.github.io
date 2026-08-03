import { test, expect } from '@playwright/test';

test('EN homepage has English content', async ({ page }) => {
  await page.goto('/');
  const text = await page.locator('body').textContent();
  expect(text).not.toMatch(/[а-яА-Я]/);
});

test('RU homepage has Russian content', async ({ page }) => {
  await page.goto('/ru/');
  const text = await page.locator('body').textContent();
  expect(text).toMatch(/[а-яА-Я]/);
});

test('EN about page has English content', async ({ page }) => {
  await page.goto('/about');
  const text = await page.locator('body').textContent();
  expect(text).not.toMatch(/[а-яА-Я]/);
});

test('RU about page has Russian content', async ({ page }) => {
  await page.goto('/ru/about');
  const text = await page.locator('body').textContent();
  expect(text).toMatch(/[а-яА-Я]/);
});

test('EN contact page has English labels', async ({ page }) => {
  await page.goto('/contact');
  const text = await page.locator('body').textContent();
  expect(text).toContain('Contact');
});

test('RU contact page has Russian labels', async ({ page }) => {
  await page.goto('/ru/contact');
  const text = await page.locator('body').textContent();
  expect(text).toMatch(/[а-яА-Я]/);
});

test('EN blog listing has English content', async ({ page }) => {
  await page.goto('/blog');
  const text = await page.locator('body').textContent();
  expect(text).not.toMatch(/[а-яА-Я]/);
});

test('RU blog listing has Russian content', async ({ page }) => {
  await page.goto('/ru/blog');
  const text = await page.locator('body').textContent();
  expect(text).toMatch(/[а-яА-Я]/);
});

test('EN projects listing has English content', async ({ page }) => {
  await page.goto('/projects');
  const text = await page.locator('body').textContent();
  expect(text).not.toMatch(/[а-яА-Я]/);
});

test('RU projects listing has Russian content', async ({ page }) => {
  await page.goto('/ru/projects');
  const text = await page.locator('body').textContent();
  expect(text).toMatch(/[а-яА-Я]/);
});

test('language switcher preserves page path', async ({ page }) => {
  await page.goto('/blog');
  const ruLink = page.locator('a:has-text("RU")').first();
  await ruLink.click();
  await expect(page).toHaveURL(/\/ru\/blog/);
});

test('language switcher on blog post preserves slug', async ({ page }) => {
  await page.goto('/blog/telescope-gist');
  const ruLink = page.locator('a:has-text("RU")').first();
  await ruLink.click();
  await expect(page).toHaveURL(/\/ru\/blog\/telescope-gist/);
});
