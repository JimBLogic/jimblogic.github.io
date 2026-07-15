import { expect, type Page } from '@playwright/test';

const LOCAL_ORIGIN = 'http://127.0.0.1:4173';
const KNOWN_BENIGN_CONSOLE_PATTERNS = [/favicon/i, /ERR_BLOCKED_BY_CLIENT/i];
const OPTIONAL_EXTERNAL_ORIGINS = new Set(['https://api.github.com', 'https://raw.githubusercontent.com']);

export const githubReposFixture = [
  {
    name: 'defensive-homelab-blue-team',
    html_url: 'https://github.com/JimBLogic/defensive-homelab-blue-team',
    description: 'Defensive Raspberry Pi homelab',
    language: 'Shell',
    stargazers_count: 0,
    fork: false,
    updated_at: '2026-07-15T00:00:00Z',
    topics: ['blue-team', 'homelab'],
    owner: { avatar_url: 'https://github.com/JimBLogic.png' }
  }
];

type GuardOptions = {
  allowOptionalExternalFailures?: boolean;
};

type RuntimeGuard = {
  assertClean(): Promise<void>;
};

function isKnownBenignConsole(text: string) {
  return KNOWN_BENIGN_CONSOLE_PATTERNS.some(pattern => pattern.test(text));
}

function isOptionalExternalUrl(rawUrl: string) {
  try {
    const url = new URL(rawUrl);
    return OPTIONAL_EXTERNAL_ORIGINS.has(url.origin);
  } catch {
    return false;
  }
}

export function installGuards(page: Page, options: GuardOptions = {}): RuntimeGuard {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];

  page.on('console', msg => {
    const text = msg.text();
    if (msg.type() !== 'error' || isKnownBenignConsole(text)) return;

    // The degraded-network test intentionally aborts optional GitHub integrations
    // and verifies that the application renders a graceful fallback. Keep the
    // allowance scoped to those documented optional origins only.
    if (options.allowOptionalExternalFailures && isOptionalExternalUrl(text)) return;

    consoleErrors.push(`${text} ${JSON.stringify(msg.location())}`);
  });

  page.on('pageerror', error => pageErrors.push(error.message));

  page.on('response', response => {
    const url = new URL(response.url());
    if (url.origin === LOCAL_ORIGIN && response.status() >= 400) {
      failedRequests.push(`same-origin HTTP ${response.status()} ${response.url()}`);
    }
  });

  page.on('requestfailed', request => {
    const requestUrl = request.url();
    const url = new URL(requestUrl);
    const failure = request.failure()?.errorText ?? 'request failed';

    if (url.origin === LOCAL_ORIGIN) {
      failedRequests.push(`${failure} ${requestUrl}`);
      return;
    }

    if (options.allowOptionalExternalFailures && OPTIONAL_EXTERNAL_ORIGINS.has(url.origin)) return;

    failedRequests.push(`${failure} ${requestUrl}`);
  });

  return {
    async assertClean() {
      expect(pageErrors, `uncaught exceptions:\n${pageErrors.join('\n')}`).toEqual([]);
      expect(consoleErrors, `unexpected console errors:\n${consoleErrors.join('\n')}`).toEqual([]);
      expect(failedRequests, `unexpected failed requests:\n${failedRequests.join('\n')}`).toEqual([]);
    }
  };
}

export async function mockOptionalExternalServices(page: Page) {
  await page.route('https://api.github.com/users/JimBLogic/repos**', route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(githubReposFixture) })
  );

  await page.route('https://raw.githubusercontent.com/JimBLogic/JimBLogic/main/README.md', route =>
    route.fulfill({ status: 200, contentType: 'text/markdown', body: '# JimBLogic\nJunior SOC Analyst and Blue Team candidate.' })
  );
}

export async function openHome(page: Page, lang = 'en', options: GuardOptions = {}) {
  const guard = installGuards(page, options);
  await page.goto(`/?lang=${lang}`, { waitUntil: 'domcontentloaded' });
  return guard;
}

export async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
  expect(overflow).toBeTruthy();
}

export async function clickAndMeasure(page: Page, selector: string) {
  const result = await page.evaluate(async sel => {
    const el = document.querySelector<HTMLElement>(sel);
    if (!el) return { found: false, duration: -1 };
    const start = performance.now();
    el.click();
    await new Promise(requestAnimationFrame);
    return { found: true, duration: performance.now() - start };
  }, selector);
  expect(result.found).toBeTruthy();
  expect(result.duration).toBeLessThan(250);
  return result.duration;
}
