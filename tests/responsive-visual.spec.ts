import { test, expect } from '@playwright/test';
import { openHome, assertNoHorizontalOverflow, assertNoRuntimeErrors } from './helpers';

const viewports = [
  { width: 320, height: 568 }, { width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1366, height: 768 }, { width: 1920, height: 1080 }
];
const langs = ['en', 'es', 'ca'];

for (const viewport of viewports) for (const lang of langs) {
  test(`responsive ${lang} ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await openHome(page, lang);
    await assertNoHorizontalOverflow(page);
    await expect(page.getByRole('heading').first()).toBeVisible();
    await expect(page.getByRole('link', { name: /proof|proyectos|projectes|work|cert/i }).first()).toBeVisible();
    if (viewport.width < 700) {
      await page.getByRole('button', { name: /menu/i }).click();
      await assertNoHorizontalOverflow(page);
      await expect(page.locator('.navbar.open')).toBeVisible();
    }
    const cardsOverlap = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('.journey-card, .focus-card, .project-card, #certificateList li')].slice(0, 20);
      return cards.some((a, i) => cards.slice(i + 1).some(b => {
        const ra = a.getBoundingClientRect(); const rb = b.getBoundingClientRect();
        return ra.width && rb.width && Math.max(0, Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left)) > 8 && Math.max(0, Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top)) > 8;
      }));
    });
    expect(cardsOverlap).toBeFalsy();
    await assertNoRuntimeErrors();
  });
}
