import { expect } from '@playwright/test';

export const mockRepos = [
  {
    html_url: 'https://github.com/JimBLogic/CyberDailyLog',
    name: 'CyberDailyLog',
    description: 'Blue Team daily intelligence reports, defensive lab notes and SOC practice automation',
    language: 'PowerShell',
    stargazers_count: 1,
    topics: ['blue-team', 'raspberry-pi'],
    fork: false,
    updated_at: '2026-01-01T00:00:00Z',
    owner: { avatar_url: '/assets/Images/Profilepicandother/my-avatar.png' }
  }
];

export async function installNetworkGuards(page, degraded = false) {
  const sameOriginFailures = [];

  page.on('requestfailed', request => {
    const url = request.url();
    if (url.startsWith('http://127.0.0.1:4173')) sameOriginFailures.push(url);
  });

  page.on('response', response => {
    const url = response.url();
    if (url.startsWith('http://127.0.0.1:4173') && response.status() >= 400) {
      sameOriginFailures.push(`${response.status()} ${url}`);
    }
  });

  await page.route('https://api.github.com/users/JimBLogic/repos**', route =>
    degraded ? route.abort('failed') : route.fulfill({ json: mockRepos })
  );

  await page.route('https://raw.githubusercontent.com/JimBLogic/JimBLogic/main/README.md', route =>
    degraded
      ? route.abort('failed')
      : route.fulfill({
          status: 200,
          contentType: 'text/markdown',
          body: '# JimBLogic\nJunior SOC Analyst / Blue Team candidate.'
        })
  );

  await page.route('https://unpkg.com/**', route => {
    const isModule = route.request().url().includes('.esm.js');
    return route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: isModule ? 'export {};' : ''
    });
  });

  await page.route('https://cdn.jsdelivr.net/**', route =>
    route.fulfill({
      status: 200,
      contentType: 'image/svg+xml',
      body: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"></svg>'
    })
  );

  await page.route('https://plausible.io/js/script.js', route =>
    route.fulfill({ status: 200, contentType: 'application/javascript', body: '' })
  );

  await page.route('https://fonts.googleapis.com/**', route =>
    route.fulfill({ status: 200, contentType: 'text/css', body: '' })
  );

  return {
    assertNoSameOriginFailures: () =>
      expect(sameOriginFailures, 'same-origin request failures').toEqual([])
  };
}

export async function openHome(page, degraded = false) {
  const guard = await installNetworkGuards(page, degraded);
  const errors = [];

  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') {
      const location = message.location().url || '';
      if (degraded && /githubusercontent|api\.github\.com/.test(location)) return;
      errors.push(message.text());
    }
  });

  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.locator('#certificateList li').first()).toBeVisible();

  return {
    ...guard,
    assertNoPageErrors: () => expect(errors, 'page/console errors').toEqual([])
  };
}
