import { expect, type Page } from '@playwright/test';

export const unexpectedConsole: string[] = [];
export const pageErrors: string[] = [];

export async function installGuards(page: Page) {
  unexpectedConsole.length = 0;
  pageErrors.length = 0;
  page.on('console', msg => {
    if (['error'].includes(msg.type()) && !/favicon|ERR_BLOCKED_BY_CLIENT/i.test(msg.text())) unexpectedConsole.push(msg.text());
  });
  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('response', response => {
    const url = response.url();
    if (new URL(url).origin === 'http://127.0.0.1:4173' && response.status() >= 400) {
      unexpectedConsole.push(`same-origin ${response.status()} ${url}`);
    }
  });
}

export async function openHome(page: Page, lang = 'en') {
  await installGuards(page);
  await page.goto(`/?lang=${lang}`, { waitUntil: 'networkidle' });
}

export async function assertNoRuntimeErrors() {
  expect(pageErrors, `uncaught exceptions: ${pageErrors.join('\n')}`).toEqual([]);
  expect(unexpectedConsole, `console/asset errors: ${unexpectedConsole.join('\n')}`).toEqual([]);
}

export async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
  expect(overflow).toBeTruthy();
}

export async function clickAndMeasure(page: Page, selector: string) {
  const result = await page.evaluate(async sel => {
    const el = document.querySelector<HTMLElement>(sel);
    if (!el) return { found: false, duration: -1 };
    const start = performance.now();
    el.click();
    await new Promise(requestAnimationFrame);
    return { found: true, duration: performance.now() - start };
  }, selector);
  expect(result.found).toBeTruthy();
  expect(result.duration).toBeLessThan(250);
  return result.duration;
}
