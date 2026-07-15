import { expect, type Page } from '@playwright/test';

export const languages = ['en', 'es', 'ca'] as const;
export const viewports = [
  { width: 320, height: 568 },
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 412, height: 915 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 720 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 }
];

export async function collectRuntimeErrors(page: Page) {
  const messages: string[] = [];
  page.on('console', message => {
    if (message.type() === 'error') messages.push(message.text());
  });
  page.on('pageerror', error => messages.push(error.message));
  page.on('requestfailed', request => {
    const url = request.url();
    if (url.startsWith(page.url()) || url.includes('127.0.0.1') || url.includes('localhost')) {
      messages.push(`request failed: ${url} ${request.failure()?.errorText || ''}`);
    }
  });
  return messages;
}

export async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow, `horizontal overflow in CSS pixels`).toBeLessThanOrEqual(1);
}

export async function switchLanguage(page: Page, lang: string) {
  await page.locator(`.lang-switch button[data-lang="${lang}"]`).click();
  await expect(page.locator('html')).toHaveAttribute('lang', lang);
}

export async function expectCoreContent(page: Page) {
  await expect(page.getByText(/Junior SOC Analyst|Analista SOC Junior/)).toBeVisible();
  await expect(page.getByText(/Blue Team/)).toBeVisible();
  await expect(page.locator('#focus')).toBeVisible();
  await expect(page.getByText(/Raspberry Pi 4/)).toBeVisible();
}
