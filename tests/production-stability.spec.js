import { test, expect } from '@playwright/test';
import { openHome } from './helpers';

for (const decision of ['consent-accept', 'consent-decline']) {
  test(`${decision} closes the consent dialog even when localStorage is blocked`, async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        get() {
          throw new DOMException('Storage blocked', 'SecurityError');
        }
      });
    });

    const guard = await openHome(page);
    const consent = page.locator('#consent');
    await expect(consent).toBeVisible();

    await page.locator(`#${decision}`).click();
    await expect(consent).toBeHidden();
    await expect(consent).toHaveAttribute('aria-hidden', 'true');

    guard.assertNoSameOriginFailures();
    guard.assertNoPageErrors();
  });
}

test('desktop sidebar keeps contact details readable and reachable at low viewport height', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 650 });
  const guard = await openHome(page);

  const sidebarInfo = page.locator('.sidebar-info');
  const email = page.locator('.contacts-list a[href^="mailto:"]');
  const resume = page.locator('.contacts-list a[href$="CV.pdf"]');

  await expect(email).toBeVisible();
  await expect(resume).toBeVisible();

  const textIsContained = await page.evaluate(() => {
    const sidebar = document.querySelector('.sidebar');
    const items = [
      document.querySelector('.contacts-list a[href^="mailto:"]'),
      document.querySelector('.contacts-list a[href$="CV.pdf"]')
    ];
    const sidebarRect = sidebar.getBoundingClientRect();

    return items.every(item => {
      const rect = item.getBoundingClientRect();
      return rect.left >= sidebarRect.left - 1 && rect.right <= sidebarRect.right + 1;
    });
  });
  expect(textIsContained).toBe(true);

  const canReachNavigation = await sidebarInfo.evaluate(element => {
    element.scrollTop = element.scrollHeight;
    const lastLink = element.querySelector('.navbar-link[href="#contact"]');
    const container = element.getBoundingClientRect();
    const link = lastLink.getBoundingClientRect();
    return link.top >= container.top - 1 && link.bottom <= container.bottom + 1;
  });
  expect(canReachNavigation).toBe(true);

  guard.assertNoSameOriginFailures();
  guard.assertNoPageErrors();
});
