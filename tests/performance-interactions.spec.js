import { test, expect } from '@playwright/test';
import { openHome } from './helpers';

test('core interactions are single-click and stable', async ({ page }) => {
  const guard = await openHome(page);

  await page.getByRole('button', { name: 'ES' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');

  await page.getByRole('button', { name: 'CA' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ca');

  await page.setViewportSize({ width: 390, height: 844 });
  const menuButton = page.getByRole('button', { name: /menu/i });
  await menuButton.click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

  await page.locator('#certFilters button').filter({ hasText: /All|Todos|Tots|AWS/ }).first().click();
  await expect(page.locator('#certificateList li').first()).toBeVisible();

  await page.locator('#projectsToggle').click();
  await expect(page.locator('#projectsToggle')).toHaveAttribute('aria-expanded', 'true');

  const consent = page.locator('#consent');
  if (await consent.isVisible()) {
    await page.locator('#consent-decline').click();
  }
  await expect(consent).toBeHidden();

  guard.assertNoSameOriginFailures();
  guard.assertNoPageErrors();
});
