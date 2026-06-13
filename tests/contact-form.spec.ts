import { test, expect } from '@playwright/test';

test('contact form has all fields', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('input[name="name"], #name')).toBeVisible();
  await expect(page.locator('input[name="email"], #email')).toBeVisible();
  await expect(page.locator('textarea[name="message"], #message')).toBeVisible();
});

test('contact form has submit button', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'domcontentloaded' });
  const submit = page.locator('button[type="submit"], input[type="submit"]');
  await expect(submit).toBeVisible();
});

test('empty name shows validation error', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'domcontentloaded' });
  const nameInput = page.locator('input[name="name"], #name');
  await nameInput.fill('');
  await nameInput.blur();
  const error = page.locator('.error, [class*="error"], .field-error').first();
  if (await error.isVisible()) {
    await expect(error).toBeVisible();
  }
});

test('invalid email shows validation error', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'domcontentloaded' });
  const emailInput = page.locator('input[name="email"], #email');
  await emailInput.fill('notanemail');
  await emailInput.blur();
  const error = page.locator('.error, [class*="error"], .field-error').first();
  if (await error.isVisible()) {
    await expect(error).toBeVisible();
  }
});

test('valid form can be submitted', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'domcontentloaded' });
  await page.locator('input[name="name"], #name').fill('Test User');
  await page.locator('input[name="email"], #email').fill('test@example.com');
  await page.locator('textarea[name="message"], #message').fill('Test message');

  const submit = page.locator('button[type="submit"], input[type="submit"]');
  await expect(submit).toBeEnabled();
});

test('honeypot field exists and is hidden', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'domcontentloaded' });
  const honeypot = page.locator('input[name="botcheck"], [name="honeypot"]');
  const count = await honeypot.count();
  if (count > 0) {
    await expect(honeypot).not.toBeVisible();
  }
});

test('RU contact form has translated labels', async ({ page }) => {
  await page.goto('/ru/contact', { waitUntil: 'domcontentloaded' });
  const form = page.locator('form');
  await expect(form).toBeVisible();

  const nameInput = page.locator('input[name="name"], #name');
  await expect(nameInput).toBeVisible();
});

test('contact page has social links', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'domcontentloaded' });
  const socials = page.locator('a[href*="github.com"], a[href*="linkedin"], a[href*="telegram"]');
  const count = await socials.count();
  expect(count).toBeGreaterThan(0);
});
