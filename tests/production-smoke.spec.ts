import { expect, test } from '@playwright/test';
import { collectRuntimeErrors, expectCoreContent, expectNoHorizontalOverflow, languages, switchLanguage } from './helpers';

test.describe('production smoke', () => {
  test('loads core identity and required sections in every locale', async ({ page }) => {
    const errors = await collectRuntimeErrors(page);
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Junior SOC Analyst Portfolio/);
    await expect(page.locator('meta[name="build-version"]')).toHaveAttribute('content', /.+/);

    for (const lang of languages) {
      await switchLanguage(page, lang);
      await expectCoreContent(page);
      await expectNoHorizontalOverflow(page);
    }

    expect(errors).toEqual([]);
  });

  test('critical local links and hero anchors are reachable', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.locator('.hero-actions a[href="#projects"]').click();
    await expect(page.locator('#projects')).toBeInViewport();
    await page.locator('.hero-actions a[href="#certifications"]').click();
    await expect(page.locator('#certifications')).toBeInViewport();
    await expect(page.locator('a[href="./assets/pdfs/Jaime Ramsden de Frutos CV.pdf"]')).toBeVisible();
    await expect(page.locator('a[href="mailto:jrf91@pm.me"]')).toHaveCount(2);
  });
});
