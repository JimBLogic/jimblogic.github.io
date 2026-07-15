import { test, expect } from '@playwright/test';
import { openHome } from './helpers';

test('renders portfolio smoke content without same-origin failures', async ({ page }) => {
  const guard = await openHome(page);
  await expect(page).toHaveTitle(/Junior SOC Analyst Portfolio/);
  await expect(page.getByText(/Junior SOC Analyst \/ Blue Team/i).first()).toBeVisible();
  await expect(page.getByText(/Raspberry Pi 4/i).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: /Current Focus/i })).toBeVisible();
  await expect(page.locator('a[href="mailto:jrf91@pm.me"]')).toBeVisible();
  await expect(page.locator('a[href*="github.com/JimBLogic"]').first()).toBeVisible();
  await expect(page.locator('a[href*="linkedin.com/in/jimblogic"]')).toBeVisible();
  await expect(page.locator('a[href$="CV.pdf"]').first()).toBeVisible();
  for (const h of ['Skills','Education','Software','Projects','Tools','Contact']) await expect(page.getByRole('heading', { name: new RegExp(h, 'i') })).toBeVisible();
  await expect(page.locator('#certificateList li').first()).toBeVisible();
  await expect(page.locator('#projectsList li').first()).toContainText(/CyberDailyLog|Raspberry/i);
  guard.assertNoSameOriginFailures(); guard.assertNoPageErrors();
});

test('degraded optional GitHub network shows fallback but local content survives', async ({ page }) => {
  const guard = await openHome(page, true);
  await expect(page.locator('#projectsList')).toContainText(/Could not load repositories|CyberDailyLog/);
  await expect(page.locator('#certificateList li').first()).toBeVisible();
  guard.assertNoSameOriginFailures();
});
