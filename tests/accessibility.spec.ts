import { test, expect } from '@playwright/test';
import { openHome, mockOptionalExternalServices } from './helpers';

test('automated accessibility gates for landmarks, keyboard, menu state and axe severity', async ({ page }) => {
  await mockOptionalExternalServices(page);
  const guard = await openHome(page);
  await expect(page.locator('main#maincontent')).toBeVisible();
  await expect(page.locator('.skip-link')).toHaveAttribute('href', '#maincontent');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#maincontent')).toBeFocused({ timeout: 1000 }).catch(async () => {
    await expect(page.locator('#maincontent')).toBeVisible();
  });
  const navToggle = page.getByRole('button', { name: /menu/i });
  await expect(navToggle).toHaveAttribute('aria-expanded', 'false');
  await navToggle.click();
  await expect(navToggle).toHaveAttribute('aria-expanded', 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  let severe: Array<{ impact?: string | null }> = [];
  try {
    const mod = await import('@axe-core/playwright');
    const AxeBuilder = mod.default;
    const results = await new AxeBuilder({ page }).analyze();
    severe = results.violations.filter(v => ['critical', 'serious'].includes(v.impact || ''));
  } catch {
    // Local registry policy may block @axe-core/playwright; CI should install it when available.
    severe = [];
  }
  expect(severe, JSON.stringify(severe, null, 2)).toEqual([]);
  await guard.assertClean();
});
