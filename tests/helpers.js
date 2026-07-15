import { expect } from '@playwright/test';

export const mockRepos = [
  { html_url:'https://github.com/JimBLogic/CyberDailyLog', name:'CyberDailyLog', description:'Raspberry Pi 4 defensive homelab and cyber-security habit tracker', language:'PowerShell', stargazers_count:1, topics:['blue-team','raspberry-pi'], fork:false, updated_at:'2026-01-01T00:00:00Z', owner:{avatar_url:'https://github.com/JimBLogic.png'} }
];

export async function installNetworkGuards(page, degraded = false) {
  const sameOriginFailures = [];
  page.on('requestfailed', req => {
    const url = req.url();
    if (url.startsWith('http://127.0.0.1:4173')) sameOriginFailures.push(url);
  });
  await page.route('https://api.github.com/users/JimBLogic/repos**', route => degraded ? route.abort('failed') : route.fulfill({ json: mockRepos }));
  await page.route('https://raw.githubusercontent.com/JimBLogic/JimBLogic/main/README.md', route => degraded ? route.abort('failed') : route.fulfill({ body: '# JimBLogic\nJunior SOC Analyst / Blue Team candidate.' }));
  await page.route(/https:\/\/(unpkg\.com|cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com|github\.com)\/.*/, route => route.fulfill({ status: 204, body: '' }));
  return { assertNoSameOriginFailures: () => expect(sameOriginFailures, 'same-origin request failures').toEqual([]) };
}

export async function openHome(page, degraded = false) {
  const guard = await installNetworkGuards(page, degraded);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const loc = msg.location().url || '';
      if (degraded && /githubusercontent|api\.github\.com/.test(loc)) return;
      errors.push(msg.text());
    }
  });
  await page.goto('/');
  await expect(page.getByRole('main')).toBeVisible();
  await page.waitForLoadState('networkidle');
  return { ...guard, assertNoPageErrors: () => expect(errors, 'page/console errors').toEqual([]) };
}
