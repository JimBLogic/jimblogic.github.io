import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { openHome } from './helpers';

test('accessibility landmarks, keyboard and axe serious/critical', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const guard = await openHome(page);
  await expect(page.locator('.skip-link')).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
  await page.keyboard.press('Tab'); await expect(page.locator('.skip-link')).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 }); await page.getByRole('button', { name: /menu/i }).click();
  await expect(page.getByRole('button', { name: /menu/i })).toHaveAttribute('aria-expanded','true');
  const results = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  expect(results.violations.filter(v => ['serious','critical'].includes(v.impact || ''))).toEqual([]);
  guard.assertNoSameOriginFailures();
});
