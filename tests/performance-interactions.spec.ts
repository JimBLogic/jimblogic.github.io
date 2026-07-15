import { expect, test } from '@playwright/test';

async function measureInteraction(page, action) {
  return page.evaluate(async () => performance.now()).then(async start => {
    await action();
    const end = await page.evaluate(() => performance.now());
    return end - start;
  });
}

test.describe('interaction responsiveness', () => {
  test('basic UI interactions respond without long delays', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const languageMs = await measureInteraction(page, () => page.locator('.lang-switch button[data-lang="es"]').click());
    expect(languageMs).toBeLessThan(500);

    const filter = page.locator('#certFilters button').first();
    if (await filter.count()) {
      const filterMs = await measureInteraction(page, () => filter.click());
      expect(filterMs).toBeLessThan(500);
    }

    const projectMs = await measureInteraction(page, () => page.locator('#projectsToggle').click());
    expect(projectMs).toBeLessThan(500);
  });

  test('GitHub API failure state remains graceful', async ({ page }) => {
    await page.route('https://api.github.com/**', route => route.abort());
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('#projectsList')).toContainText(/GitHub|repositories|repositorios|repositor/);
  });
});
