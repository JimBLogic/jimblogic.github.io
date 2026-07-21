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

const recruiterLinkOrder = [
  '#projects',
  './assets/pdfs/Jaime Ramsden de Frutos CV.pdf',
  'mailto:jrf91@pm.me',
  'https://github.com/JimBLogic',
  'https://github.com/JimBLogic/TryHackme-HackTheBox'
];

test('hero exposes a semantic recruiter snapshot and translated proof labels', async ({ page }) => {
  const guard = await openHome(page);

  const snapshot = page.locator('dl.proof-strip');
  const actions = page.locator('.hero-actions');
  const proofLinks = page.locator('.hero-proof-links');

  await expect(snapshot).toBeVisible();
  await expect(snapshot.locator('dt')).toHaveCount(4);
  await expect(snapshot.locator('dd')).toHaveCount(4);
  await expect(snapshot).toContainText('Junior SOC / Blue Team');
  await expect(snapshot).toContainText('Balearic Islands, Spain');
  await expect(snapshot).toContainText('open to remote and hybrid roles');
  await expect(snapshot).toContainText('Preparing for AWS Cloud Practitioner');
  await expect(snapshot).not.toContainText(/certified|employed|production SOC/i);
  await expect(actions).toHaveAttribute('aria-label', 'Primary portfolio shortcuts');
  await expect(proofLinks).toHaveAttribute('aria-label', 'External proof links');
  await expect(snapshot).toHaveAttribute('aria-label', 'Recruiter snapshot');

  await expect(page.locator('.hero-actions a[href="#projects"]')).toHaveText('View proof of work');
  await expect(page.locator('.hero-actions a[href$="CV.pdf"]')).toHaveText('Open CV');
  await expect(page.locator('.hero-actions a[href="mailto:jrf91@pm.me"]')).toHaveText('Email Jaime');
  await expect(page.locator('.hero-proof-links a[href="https://github.com/JimBLogic"]')).toHaveText('GitHub evidence');
  await expect(page.locator('.hero-proof-links a[href*="TryHackme-HackTheBox"]')).toHaveText(
    'TryHackMe / HTB lab notes'
  );

  await page.locator('button[data-lang="es"]').click();
  await expect(snapshot).toContainText('SOC Junior / Blue Team');
  await expect(snapshot).toContainText('Islas Baleares');
  await expect(snapshot).toContainText('Preparación para AWS Cloud Practitioner');
  await expect(actions).toHaveAttribute('aria-label', 'Accesos principales del portfolio');
  await expect(proofLinks).toHaveAttribute('aria-label', 'Enlaces a evidencias externas');
  await expect(snapshot).toHaveAttribute('aria-label', 'Resumen para recruiters');
  await expect(page.locator('.hero-proof-links a[href="https://github.com/JimBLogic"]')).toHaveText(
    'Evidencia en GitHub'
  );

  await page.locator('button[data-lang="ca"]').click();
  await expect(snapshot).toContainText('Illes Balears');
  await expect(snapshot).toContainText('Preparació per a AWS Cloud Practitioner');
  await expect(actions).toHaveAttribute('aria-label', 'Accessos principals del portfolio');
  await expect(proofLinks).toHaveAttribute('aria-label', 'Enllaços a evidències externes');
  await expect(snapshot).toHaveAttribute('aria-label', 'Resum per a recruiters');
  await expect(page.locator('.hero-proof-links a[href="https://github.com/JimBLogic"]')).toHaveText(
    'Evidència a GitHub'
  );

  guard.assertNoSameOriginFailures();
  guard.assertNoPageErrors();
});

test('project case studies keep public evidence boundaries and honest status language', async ({ page }) => {
  const guard = await openHome(page);

  const cyber = page.locator('.case-study-card').first();
  const homelab = page.locator('.case-study-card').nth(1);

  await expect(page.getByRole('heading', { name: 'Featured proof of work' })).toBeVisible();
  await expect(cyber).toContainText('Purpose:');
  await expect(cyber).toContainText('Defensive relevance:');
  await expect(cyber).toContainText('not a production SOC feed');
  await expect(cyber.locator('a[href="https://github.com/JimBLogic/CyberDailyLog"]')).toHaveCount(1);
  await expect(homelab).toContainText('public repository');
  await expect(homelab).toContainText('reproducible LITE/FULL Docker foundation');
  await expect(homelab).toContainText('tools remain candidates');
  await expect(
    homelab.locator('a[href="https://github.com/JimBLogic/defensive-homelab-blue-team"]')
  ).toHaveText('View Repo');

  await page.locator('button[data-lang="es"]').click();
  await expect(cyber).toContainText('no es un feed SOC de producción');
  await expect(homelab).toContainText('repositorio público');
  await expect(homelab).toContainText('base Docker reproducible LITE/FULL');
  await expect(
    homelab.locator('a[href="https://github.com/JimBLogic/defensive-homelab-blue-team"]')
  ).toHaveText('Ver Repositorio');

  await page.locator('button[data-lang="ca"]').click();
  await expect(cyber).toContainText('no és un feed SOC de producció');
  await expect(homelab).toContainText('repositori públic');
  await expect(homelab).toContainText('base Docker reproduïble LITE/FULL');
  await expect(
    homelab.locator('a[href="https://github.com/JimBLogic/defensive-homelab-blue-team"]')
  ).toHaveText('Veure Repositori');

  guard.assertNoSameOriginFailures();
  guard.assertNoPageErrors();
});

test('recruiter copy has usable in-bundle fallbacks when locale JSON cannot be parsed', async ({ page }) => {
  await page.route('**/assets/locales/*.json', route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{' })
  );
  const guard = await openHome(page);

  await expect(page.locator('[data-txt="hero_statement"]')).toContainText('public proof of work includes CyberDailyLog');
  await expect(page.locator('[data-txt="projects_intro"]')).toContainText('Start here for interview evidence');
  await expect(page.locator('[data-txt="hero_cv"]')).toHaveText('Open CV');
  await expect(page.locator('[data-txt="proof_evidence_label"]')).toHaveText('Public evidence');
  await expect(page.locator('[data-txt="case_homelab_status"]')).toContainText('public repository');
  await expect(page.locator('[data-txt="contact_1"]')).toHaveText('For junior SOC / Blue Team opportunities, email me:');
  await expect(page.locator('[data-txt="contact_2"]')).toContainText('GitHub');
  await expect(page.locator('[data-txt="contact_2"]')).toContainText('CV');

  await page.locator('button[data-lang="es"]').click();
  await expect(page.locator('[data-txt="hero_statement"]')).toContainText('Mi evidencia pública incluye CyberDailyLog');
  await expect(page.locator('[data-txt="projects_intro"]')).toContainText('Empieza aquí para ver evidencia útil');
  await expect(page.locator('[data-txt="hero_cv"]')).toHaveText('Abrir CV');
  await expect(page.locator('[data-txt="proof_evidence_label"]')).toHaveText('Evidencia pública');
  await expect(page.locator('[data-txt="contact_1"]')).toHaveText('Para oportunidades junior SOC / Blue Team, escríbeme:');

  await page.locator('button[data-lang="ca"]').click();
  await expect(page.locator('[data-txt="hero_statement"]')).toContainText('La meva evidència pública inclou CyberDailyLog');
  await expect(page.locator('[data-txt="projects_intro"]')).toContainText('Comença aquí per veure evidència útil');
  await expect(page.locator('[data-txt="hero_cv"]')).toHaveText('Obrir CV');
  await expect(page.locator('[data-txt="proof_evidence_label"]')).toHaveText('Evidència pública');
  await expect(page.locator('[data-txt="contact_1"]')).toHaveText('Per a oportunitats junior SOC / Blue Team, escriu-me:');

  guard.assertNoSameOriginFailures();
  guard.assertNoPageErrors();
});

for (const size of responsiveSizes) {
  test(`recruiter proof layout has no overflow or CTA overlap at ${size.width}x${size.height}`, async ({ page }) => {
    await page.setViewportSize(size);
    const guard = await openHome(page);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(2);

    const layoutProblem = await page
      .locator('.hero-actions, .hero-proof-links, .proof-strip, .case-study-grid')
      .evaluateAll(groups =>
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
    guard.assertNoPageErrors();
  });
}

test('keyboard focus follows the recruiter-link DOM order and axe has no serious or critical regressions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const guard = await openHome(page);

  const firstRecruiterLink = page.locator('.hero-actions a[href="#projects"]');
  await firstRecruiterLink.scrollIntoViewIfNeeded();
  await firstRecruiterLink.focus();

  for (let index = 0; index < recruiterLinkOrder.length; index += 1) {
    const activeHref = await page.evaluate(() => document.activeElement?.getAttribute('href') || '');
    expect(activeHref).toBe(recruiterLinkOrder[index]);
    if (index < recruiterLinkOrder.length - 1) await page.keyboard.press('Tab');
  }

  const results = await new AxeBuilder({ page })
    .include('#about')
    .include('#projects')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations.filter(v => ['serious', 'critical'].includes(v.impact || ''))).toEqual([]);
  guard.assertNoSameOriginFailures();
});
