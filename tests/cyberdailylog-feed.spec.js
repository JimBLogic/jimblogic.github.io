import { test, expect } from '@playwright/test';
import { openHome } from './helpers';

const remoteFeedUrl = 'https://raw.githubusercontent.com/JimBLogic/CyberDailyLog/main/reports/portfolio-feed.json';

function liveFeed(overrides = {}) {
  return {
    schema_version: 1,
    project: 'CyberDailyLog',
    title: 'Blue Team Intelligence Digest',
    generated_at: '2026-07-17T08:34:06+00:00',
    coverage_start: '2026-07-16T08:33:48+00:00',
    coverage_end: '2026-07-17T08:33:48+00:00',
    degraded: false,
    qualified_developments: 42,
    immediate_attention: 'One source-backed item requires immediate defensive review.',
    source_health: { total: 6, status_counts: { healthy: 6 } },
    report_url: 'https://github.com/JimBLogic/CyberDailyLog/blob/main/reports/latest.md',
    repository_url: 'https://github.com/JimBLogic/CyberDailyLog',
    top_vulnerabilities: [
      {
        id: 'CVE-2026-99999',
        title: '<img id="remote-injection" src=x onerror=alert(1)> Critical browser issue',
        cvss_score: 9.8,
        cisa_kev: true,
        known_exploited: true
      }
    ],
    ...overrides
  };
}

async function prepare(page, routeHandler) {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.addInitScript(() => localStorage.clear());
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route(remoteFeedUrl, routeHandler);
  return openHome(page);
}

test('renders the current remote feed as safe live portfolio content', async ({ page }) => {
  const guard = await prepare(page, route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(liveFeed())
  }));

  const section = page.locator('#cyberdailylog');
  await expect(section).toBeVisible();
  await expect(page.locator('#cyberdailylogStatus')).toHaveAttribute('data-state', 'live');
  await expect(page.locator('#cyberdailylogStatus')).toHaveText('Live feed');
  await expect(section).toContainText('42');
  await expect(section).toContainText('CVE-2026-99999');
  await expect(section).toContainText('CVSS 9.8');
  await expect(section).toContainText('CISA KEV');
  await expect(section).toContainText('<img id="remote-injection"');
  await expect(page.locator('#remote-injection')).toHaveCount(0);
  await expect(page.locator('#cyberdailylogReportLink')).toHaveAttribute(
    'href',
    'https://github.com/JimBLogic/CyberDailyLog/blob/main/reports/latest.md'
  );
  guard.assertNoSameOriginFailures();
});

test('falls back to the bundled verified snapshot when the remote feed fails', async ({ page }) => {
  const guard = await prepare(page, route => route.fulfill({ status: 503, body: 'unavailable' }));

  await expect(page.locator('#cyberdailylogStatus')).toHaveAttribute('data-state', 'snapshot');
  await expect(page.locator('#cyberdailylogStatus')).toHaveText('Verified snapshot');
  await expect(page.locator('#cyberdailylog')).toContainText('331');
  await expect(page.locator('#cyberdailylog')).toContainText('CVE-2026-62948');
  await expect(page.locator('#cyberdailylogNote')).toContainText('bundled verified snapshot');
  guard.assertNoSameOriginFailures();
});

test('rejects an invalid remote schema and preserves the local snapshot', async ({ page }) => {
  const guard = await prepare(page, route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ project: 'UnexpectedProject', top_vulnerabilities: [] })
  }));

  await expect(page.locator('#cyberdailylogStatus')).toHaveAttribute('data-state', 'snapshot');
  await expect(page.locator('#cyberdailylog')).toContainText('331');
  guard.assertNoSameOriginFailures();
});

test('updates CyberDailyLog controls and dynamic labels in EN, ES and CA', async ({ page }) => {
  const guard = await prepare(page, route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(liveFeed())
  }));

  await expect(page.locator('#cyberdailylogStatus')).toHaveText('Live feed');
  await expect(page.locator('#cyberdailylogReportLink')).toHaveText('Read full daily brief');

  await page.locator('button[data-lang="es"]').click();
  await expect(page.locator('#cyberdailylogStatus')).toHaveText('Feed en directo');
  await expect(page.locator('#cyberdailylogReportLink')).toHaveText('Leer informe diario completo');
  await expect(page.locator('#cyberdailylogIntro')).toContainText('pipeline diario');

  await page.locator('button[data-lang="ca"]').click();
  await expect(page.locator('#cyberdailylogStatus')).toHaveText('Feed en directe');
  await expect(page.locator('#cyberdailylogReportLink')).toHaveText('Llegir l’informe diari complet');
  await expect(page.locator('#cyberdailylogIntro')).toContainText('pipeline diari');
  guard.assertNoSameOriginFailures();
});
