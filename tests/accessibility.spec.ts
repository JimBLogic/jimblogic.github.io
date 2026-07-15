import { expect, test } from '@playwright/test';
import { expectNoHorizontalOverflow } from './helpers';

test.describe('accessibility smoke', () => {
  test('keyboard navigation exposes skip link and interactive controls', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#maincontent')).toBeInViewport();
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
  });

  test('reduced motion does not hide content', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('.hero-panel')).toBeVisible();
    await expect(page.locator('#focus')).toBeVisible();
    await expectNoHorizontalOverflow(page);
  });

  test('important controls expose accessible names and states', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('#navToggle')).toHaveAttribute('aria-controls', 'navList');
    await expect(page.locator('#navToggle')).toHaveAttribute('aria-expanded', /true|false/);
    await expect(page.locator('#projectsToggle')).toHaveAttribute('aria-controls', 'projectsList');
    await expect(page.locator('#projectsToggle')).toHaveAttribute('aria-expanded', /true|false/);
  });
});
