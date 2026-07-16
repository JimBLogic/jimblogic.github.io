import { test, expect } from '@playwright/test';
import { openHome } from './helpers';

const sectionIds = ['about', 'focus', 'cyberdailylog', 'skills', 'education', 'passion', 'software', 'journey', 'projects', 'tools', 'contact'];
const languageLabels = {
  en: 'Scroll to top',
  es: 'Volver arriba',
  ca: 'Tornar a dalt'
};

async function stablePage(page, viewport = { width: 1366, height: 768 }) {
  await page.setViewportSize(viewport);
  await page.addInitScript(() => localStorage.clear());
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const guard = await openHome(page);
  await page.evaluate(() => document.documentElement.classList.add('qa-stable'));
  return guard;
}

async function scrollToSection(page, id) {
  await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  await page.waitForFunction(
    targetId => document.querySelector(`.navbar-link[href="#${targetId}"]`)?.getAttribute('aria-current') === 'location',
    id
  );
}

test('document owns desktop scrolling without horizontal overflow', async ({ page }) => {
  const guard = await stablePage(page);

  const initial = await page.evaluate(() => {
    const probeScrollOwnership = selector => {
      const element = document.querySelector(selector);
      const originalScrollTop = element.scrollTop;
      element.scrollTop = 100;
      const retainedScrollTop = element.scrollTop;
      element.scrollTop = originalScrollTop;

      return {
        overflowY: window.getComputedStyle(element).overflowY,
        retainedScrollTop
      };
    };

    return {
      scrollingElement: document.scrollingElement?.tagName,
      scrollY: window.scrollY,
      main: probeScrollOwnership('.main-content'),
      container: probeScrollOwnership('.container'),
      horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
    };
  });

  expect(initial.scrollingElement).toBe('HTML');
  expect(['auto', 'scroll', 'overlay']).not.toContain(initial.main.overflowY);
  expect(['auto', 'scroll', 'overlay']).not.toContain(initial.container.overflowY);
  expect(initial.main.retainedScrollTop).toBe(0);
  expect(initial.container.retainedScrollTop).toBe(0);
  expect(initial.horizontalOverflow).toBeLessThanOrEqual(2);

  await page.mouse.wheel(0, 900);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(initial.scrollY);
  guard.assertNoSameOriginFailures();
});

test('scroll-to-top is translated, visible after threshold, keyboard accessible and avoids consent', async ({ page }) => {
  const guard = await stablePage(page);
  const scrollTop = page.locator('#scrollTop');

  await expect(scrollTop).toBeHidden();
  await expect(scrollTop).toHaveAttribute('tabindex', '-1');
  await page.evaluate(() => window.scrollTo(0, 520));
  await expect(scrollTop).toBeVisible();
  await expect(scrollTop.locator('svg.scroll-btn-icon')).toBeVisible();
  await expect(scrollTop.locator('ion-icon')).toHaveCount(0);

  const overlap = await page.evaluate(() => {
    const button = document.getElementById('scrollTop').getBoundingClientRect();
    const consent = document.getElementById('consent').getBoundingClientRect();
    const width = Math.max(0, Math.min(button.right, consent.right) - Math.max(button.left, consent.left));
    const height = Math.max(0, Math.min(button.bottom, consent.bottom) - Math.max(button.top, consent.top));
    return width * height;
  });
  expect(overlap).toBe(0);

  for (const [lang, label] of Object.entries(languageLabels)) {
    await page.locator(`button[data-lang="${lang}"]`).click();
    await expect(scrollTop).toHaveAttribute('aria-label', label);
    await expect(scrollTop).toHaveAttribute('title', label);
  }

  await scrollTop.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
  await expect(scrollTop).toBeHidden();

  await page.evaluate(() => window.scrollTo(0, 620));
  await expect(scrollTop).toBeVisible();
  await scrollTop.focus();
  await page.keyboard.press('Enter');
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
  guard.assertNoSameOriginFailures();
});

for (const height of [650, 768]) {
  test(`progressive sidebar uses hysteresis and preserves useful nav at 1366x${height}`, async ({ page }) => {
    const guard = await stablePage(page, { width: 1366, height });
    const avatar = page.locator('.avatar-bg');
    const contacts = page.locator('.contacts-list');
    const identity = page.locator('.main-name');
    const navList = page.locator('.navbar-list');

    await expect(avatar).toBeVisible();
    await expect(contacts).toBeVisible();
    await expect(identity).toBeVisible();
    await expect(navList).toBeVisible();
    const expandedNavHeight = await navList.evaluate(element => element.getBoundingClientRect().height);

    await page.evaluate(() => window.scrollTo(0, 370));
    await expect(page.locator('body')).toHaveClass(/sidebar-condensed/);
    await expect(identity).toBeVisible();
    await expect(contacts).toHaveAttribute('aria-hidden', 'true');
    await expect(contacts.locator('a').first()).toHaveAttribute('tabindex', '-1');
    const compactNavHeight = await navList.evaluate(element => element.getBoundingClientRect().height);
    expect(compactNavHeight).toBeGreaterThan(expandedNavHeight);

    await page.evaluate(() => window.scrollTo(0, 240));
    await expect(page.locator('body')).toHaveClass(/sidebar-condensed/);
    await page.evaluate(() => window.scrollTo(0, 170));
    await expect(page.locator('body')).not.toHaveClass(/sidebar-condensed/);
    await expect(contacts).toHaveAttribute('aria-hidden', 'false');
    await expect(contacts.locator('a').first()).not.toHaveAttribute('tabindex', '-1');
    guard.assertNoSameOriginFailures();
  });
}

for (const lang of ['en', 'es', 'ca']) {
  test(`scrollspy keeps Projects, Tools and Contact active and visible in ${lang}`, async ({ page }) => {
    const guard = await stablePage(page);
    await page.locator(`button[data-lang="${lang}"]`).click();

    for (const id of ['cyberdailylog', 'projects', 'tools', 'contact']) {
      await scrollToSection(page, id);
      const link = page.locator(`.navbar-link[href="#${id}"]`);
      await expect(link).toHaveAttribute('aria-current', 'location');
      await expect(link).toBeInViewport();
      const navContainsActive = await page.evaluate(targetId => {
        const nav = document.querySelector('.navbar-list').getBoundingClientRect();
        const active = document.querySelector(`.navbar-link[href="#${targetId}"]`).getBoundingClientRect();
        return active.top >= nav.top - 1 && active.bottom <= nav.bottom + 1;
      }, id);
      expect(navContainsActive).toBe(true);
    }

    expect(await page.locator('.navbar-link').evaluateAll(links => links.map(link => link.getAttribute('href')))).toEqual(
      sectionIds.map(id => `#${id}`)
    );
    guard.assertNoSameOriginFailures();
  });
}
