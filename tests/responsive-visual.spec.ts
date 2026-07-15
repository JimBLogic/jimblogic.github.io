import { expect, test } from '@playwright/test';
import { expectNoHorizontalOverflow, languages, switchLanguage, viewports } from './helpers';

test.describe('responsive and visual geometry', () => {
  for (const viewport of viewports) {
    test(`no overflow or off-screen nav at ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
      await page.setViewportSize(viewport);
      await page.goto('/', { waitUntil: 'networkidle' });
      await expectNoHorizontalOverflow(page);
      await expect(page.locator('.hero-panel')).toBeVisible();
      await expect(page.locator('#focus')).toBeVisible();

      if (viewport.width <= 700) {
        await page.locator('#navToggle').click();
        await expect(page.locator('.navbar')).toHaveClass(/open/);
        await expectNoHorizontalOverflow(page);
      }

      await page.screenshot({ path: testInfo.outputPath(`viewport-${viewport.width}x${viewport.height}.png`), fullPage: true });
    });
  }

  for (const lang of languages) {
    test(`translated mobile layout remains within viewport: ${lang}`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 320, height: 568 });
      await page.goto('/', { waitUntil: 'networkidle' });
      await switchLanguage(page, lang);
      await expectNoHorizontalOverflow(page);
      await expect(page.locator('.hero-panel')).toBeVisible();
      await page.screenshot({ path: testInfo.outputPath(`mobile-${lang}.png`), fullPage: true });
    });
  }
});
