import { test, expect } from '@playwright/test';
import { openHome } from './helpers';

const CONSENT_KEY = 'consent-analytics';

test('consent banner dismisses in one click when localStorage writes are blocked', async ({ page }) => {
  await page.addInitScript(key => {
    window.localStorage.removeItem(key);
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function setItem(name, value) {
      if (name === key) throw new DOMException('Storage blocked for QA', 'SecurityError');
      return originalSetItem.call(this, name, value);
    };
  }, CONSENT_KEY);

  const guard = await openHome(page);
  const consent = page.locator('#consent');

  await expect(consent).toBeVisible();
  await page.locator('#consent-decline').click();
  await expect(consent).toBeHidden();
  await expect(page.getByRole('main')).toBeVisible();

  guard.assertNoSameOriginFailures();
  guard.assertNoPageErrors();
});

test('accepting analytics dismisses the banner and persists the preference', async ({ page }) => {
  await page.addInitScript(key => window.localStorage.removeItem(key), CONSENT_KEY);

  const guard = await openHome(page);
  const consent = page.locator('#consent');

  await expect(consent).toBeVisible();
  await page.locator('#consent-accept').click();
  await expect(consent).toBeHidden();
  await expect.poll(() => page.evaluate(key => window.localStorage.getItem(key), CONSENT_KEY)).toBe('yes');

  guard.assertNoSameOriginFailures();
  guard.assertNoPageErrors();
});

test('short desktop view keeps all contact text and navigation inside the sidebar', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 600 });
  const guard = await openHome(page);

  const sidebar = page.locator('.sidebar');
  const contacts = page.locator('.contacts-list');
  const nav = page.locator('.navbar');

  await expect(sidebar).toBeVisible();
  await expect(page.locator('.avatar-bg')).toBeHidden();
  await expect(contacts).toBeVisible();
  await expect(nav).toBeVisible();

  const geometry = await page.evaluate(() => {
    const sidebarRect = document.querySelector('.sidebar').getBoundingClientRect();
    const contactsRect = document.querySelector('.contacts-list').getBoundingClientRect();
    const navRect = document.querySelector('.navbar').getBoundingClientRect();
    const contactRows = Array.from(document.querySelectorAll('.contact-item')).map(row => {
      const rect = row.getBoundingClientRect();
      const text = row.querySelector('.contact-info')?.innerText.trim() || '';
      return { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, text };
    });

    return {
      sidebar: { top: sidebarRect.top, bottom: sidebarRect.bottom, left: sidebarRect.left, right: sidebarRect.right },
      contacts: { top: contactsRect.top, bottom: contactsRect.bottom },
      nav: { top: navRect.top, bottom: navRect.bottom, height: navRect.height },
      contactRows,
      horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
    };
  });

  expect(geometry.horizontalOverflow).toBeLessThanOrEqual(2);
  expect(geometry.contacts.top).toBeGreaterThanOrEqual(geometry.sidebar.top - 1);
  expect(geometry.contacts.bottom).toBeLessThanOrEqual(geometry.sidebar.bottom + 1);
  expect(geometry.nav.top).toBeGreaterThanOrEqual(geometry.contacts.bottom - 1);
  expect(geometry.nav.bottom).toBeLessThanOrEqual(geometry.sidebar.bottom + 1);
  expect(geometry.nav.height).toBeGreaterThanOrEqual(88);

  for (const row of geometry.contactRows) {
    expect(row.text.length).toBeGreaterThan(0);
    expect(row.left).toBeGreaterThanOrEqual(geometry.sidebar.left - 1);
    expect(row.right).toBeLessThanOrEqual(geometry.sidebar.right + 1);
    expect(row.top).toBeGreaterThanOrEqual(geometry.sidebar.top - 1);
    expect(row.bottom).toBeLessThanOrEqual(geometry.sidebar.bottom + 1);
  }

  guard.assertNoSameOriginFailures();
  guard.assertNoPageErrors();
});
