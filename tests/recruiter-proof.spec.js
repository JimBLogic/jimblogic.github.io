import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { openHome } from './helpers';

const responsiveSizes = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1366, height: 650 },
  { width: 1366, height: 768 },
  { width: 1920, height: 1080 }
];

test('hero exposes a semantic recruiter snapshot and correct proof links across languages', async ({ page }) => {
  const guard = await openHome(page);

  const snapshot = page.locator('dl.proof-strip');
  await expect(snapshot).toBeVisible();
  await expect(snapshot.locator('dt')).toHaveCount(4);
  await expect(snapshot.locator('dd')).toHaveCount(4);
  await expect(snapshot).toContainText('Junior SOC / Blue Team');
  await expect(snapshot).toContainText('Balearic Islands, Spain');
  await expect(snapshot).toContainText('remote/hybrid roles considered');
  await expect(snapshot).toContainText('AWS Cloud Practitioner foundations');
  await expect(snapshot).not.toContainText(/certified|employed|production SOC/i);

  await expect(page.locator('.hero-actions a[href="#projects"]')).toHaveText('View proof of work');
  await expect(page.locator('.hero-actions a[href$="CV.pdf"]')).toHaveText('Open CV');
  await expect(page.locator('.hero-actions a[href="mailto:jrf91@pm.me"]')).toHaveText('Email Jaime');
  await expect(page.locator('.hero-proof-links a[href="https://github.com/JimBLogic"]')).toHaveText('GitHub evidence');
  await expect(page.locator('.hero-proof-links a[href*="TryHackme-HackTheBox"]')).toHaveText('TryHackMe / HTB');

  await page.locator('button[data-lang="es"]').click();
  await expect(snapshot).toContainText('SOC Junior / Blue Team');
  await expect(snapshot).toContainText('Islas Baleares');
  await expect(snapshot).toContainText('Fundamentos AWS Cloud Practitioner');
  await expect(page.locator('.hero-proof-links a[href="https://github.com/JimBLogic"]')).toHaveText('Evidencia en GitHub');

  await page.locator('button[data-lang="ca"]').click();
  await expect(snapshot).toContainText('Illes Balears');
  await expect(snapshot).toContainText('Fonaments AWS Cloud Practitioner');
  await expect(page.locator('.hero-proof-links a[href="https://github.com/JimBLogic"]')).toHaveText('Evidència a GitHub');

  guard.assertNoSameOriginFailures();
});

test('project case studies keep evidence links and honest junior status language', async ({ page }) => {
  const guard = await openHome(page);

  const cyber = page.locator('.case-study-card').first();
  const homelab = page.locator('.case-study-card').nth(1);

  await expect(page.getByRole('heading', { name: 'Featured proof of work' })).toBeVisible();
  await expect(cyber).toContainText('Purpose:');
  await expect(cyber).toContainText('Defensive relevance:');
  await expect(cyber).toContainText('not a production SOC feed');
  await expect(cyber.locator('a[href="https://github.com/JimBLogic/CyberDailyLog"]')).toHaveCount(1);
  await expect(homelab).toContainText('Current status: in progress');
  await expect(homelab).toContainText('not as professional operations');
  await expect(homelab.locator('a[href="https://github.com/JimBLogic"]')).toHaveCount(1);

  await page.locator('button[data-lang="es"]').click();
  await expect(cyber).toContainText('no es un feed SOC de producción');
  await expect(homelab).toContainText('no como operaciones profesionales');

  await page.locator('button[data-lang="ca"]').click();
  await expect(cyber).toContainText('no és un feed SOC de producció');
  await expect(homelab).toContainText('no com a operacions professionals');

  guard.assertNoSameOriginFailures();
});

for (const size of responsiveSizes) {
  test(`recruiter proof layout has no overflow or CTA overlap at ${size.width}x${size.height}`, async ({ page }) => {
    await page.setViewportSize(size);
    const guard = await openHome(page);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(2);

    const layoutProblem = await page.locator('.hero-actions, .hero-proof-links, .proof-strip, .case-study-grid').evaluateAll(groups =>
      groups.some(group => {
        const groupRect = group.getBoundingClientRect();
        const children = Array.from(group.children).filter(child => {
          const rect = child.getBoundingClientRect();
          const style = window.getComputedStyle(child);
          return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
        });

        const escapes = children.some(child => {
          const rect = child.getBoundingClientRect();
          return rect.left < groupRect.left - 2 || rect.right > groupRect.right + 2;
        });

        const overlaps = children.some((first, index) =>
          children.slice(index + 1).some(second => {
            const a = first.getBoundingClientRect();
            const b = second.getBoundingClientRect();
            const overlapWidth = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
            const overlapHeight = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
            return overlapWidth * overlapHeight > 16;
          })
        );

        return escapes || overlaps;
      })
    );

    expect(layoutProblem).toBe(false);
    guard.assertNoSameOriginFailures();
  });
}

test('keyboard focus reaches new recruiter links in logical order and axe has no serious or critical regressions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const guard = await openHome(page);

  await page.locator('.hero-actions').scrollIntoViewIfNeeded();
  const focusedHrefs = [];

  for (let i = 0; i < 16 && focusedHrefs.length < 5; i += 1) {
    await page.keyboard.press('Tab');
    const href = await page.evaluate(() => document.activeElement?.getAttribute('href') || '');
    if (href && ['#projects', './assets/pdfs/Jaime Ramsden de Frutos CV.pdf', 'mailto:jrf91@pm.me', 'https://github.com/JimBLogic', 'https://github.com/JimBLogic/TryHackme-HackTheBox'].includes(href)) {
      focusedHrefs.push(href);
    }
  }

  expect(focusedHrefs).toEqual([
    '#projects',
    './assets/pdfs/Jaime Ramsden de Frutos CV.pdf',
    'mailto:jrf91@pm.me',
    'https://github.com/JimBLogic',
    'https://github.com/JimBLogic/TryHackme-HackTheBox'
  ]);

  const results = await new AxeBuilder({ page })
    .include('#about')
    .include('#projects')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations.filter(v => ['serious', 'critical'].includes(v.impact || ''))).toEqual([]);
  guard.assertNoSameOriginFailures();
});
