import { test, expect } from '@playwright/test';
import { openHome } from './helpers';

test('core interactions are single-click and stable', async ({ page }) => {
  const guard = await openHome(page);

  await page.locator('.lang-switch button[data-lang="es"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('#about h2')).toContainText('Acerca de Mí');
  await expect(page.locator('#focus h2')).toContainText('Enfoque actual');

  await page.locator('.lang-switch button[data-lang="ca"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ca');
  await expect(page.locator('#about h2')).toContainText('Sobre mi');
  await expect(page.locator('#focus h2')).toContainText('Enfocament actual');

  await page.locator('.lang-switch button[data-lang="en"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('#about h2')).toContainText('About Me');
  await expect(page.locator('#focus h2')).toContainText('Current Focus');

  await page.setViewportSize({ width: 390, height: 844 });
  const menuButton = page.getByRole('button', { name: /menu/i });
  await menuButton.click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

  const certificateHrefs = await page.locator('#certificateList a[href]').evaluateAll(links =>
    links.map(link => link.getAttribute('href'))
  );
  expect(certificateHrefs).toHaveLength(37);
  expect(certificateHrefs.filter(href => href.startsWith('./assets/pdfs'))).toEqual([]);
  expect(certificateHrefs.filter(href => href.includes('github.com/'))).toHaveLength(32);
  expect(certificateHrefs.filter(href => href.includes('github.com/')).every(href =>
    href.includes('/blob/main/') && href.endsWith('.pdf')
  )).toBe(true);

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
