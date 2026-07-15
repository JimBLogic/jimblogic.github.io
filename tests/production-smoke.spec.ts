import { test, expect } from '@playwright/test';
import { openHome, assertNoRuntimeErrors } from './helpers';

test('portfolio smoke checks required copy, links, navigation and CSP-safe runtime', async ({ page }) => {
  await openHome(page);
  await expect(page).toHaveTitle(/Junior SOC Analyst Portfolio/);
  await expect(page.getByText(/Junior SOC Analyst \/ Blue Team/i).first()).toBeVisible();
  await expect(page.getByText(/Raspberry Pi 4/i).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: /Current Focus/i })).toBeVisible();
  await expect(page.getByRole('link', { name: 'jrf91@pm.me' }).first()).toHaveAttribute('href', 'mailto:jrf91@pm.me');
  await expect(page.getByRole('link', { name: /github/i }).first()).toHaveAttribute('href', /github\.com\/JimBLogic/i);
  await expect(page.getByRole('link', { name: /linkedin/i }).first()).toHaveAttribute('href', /linkedin\.com\/in\/jimblogic/i);
  await expect(page.getByRole('link', { name: /open pdf/i })).toHaveAttribute('href', /\.pdf$/i);
  for (const id of ['about', 'focus', 'skills', 'education', 'certifications', 'projects', 'contact']) {
    await expect(page.locator(`#${id}`), `#${id}`).toBeVisible();
  }
  await expect(page.locator('#certificateList li').first()).toBeVisible({ timeout: 10_000 });
  await expect(page.locator('#projectsList')).toBeVisible();
  await assertNoRuntimeErrors();
});
