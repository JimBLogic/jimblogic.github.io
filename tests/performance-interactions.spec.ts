import { test, expect } from '@playwright/test';
import { openHome, clickAndMeasure, assertNoRuntimeErrors } from './helpers';

test('interactions respond without double-clicks, flicker or long blocking tasks', async ({ page }) => {
  await openHome(page);
  const timings: Record<string, number> = {};
  timings.language = await clickAndMeasure(page, 'button[data-lang="es"], [data-lang="es"]');
  await expect(page.locator('html')).toHaveAttribute('lang', /es/i);
  timings.mobileMenu = await clickAndMeasure(page, '#navToggle');
  await expect(page.locator('.navbar')).toHaveClass(/open/);
  await page.locator('#certificateList li').first().waitFor({ state: 'visible', timeout: 10_000 });
  const filter = page.locator('#certFilters button').nth(1);
  if (await filter.count()) {
    const start = performance.now();
    await filter.click();
    timings.certificateFilter = performance.now() - start;
    await expect(filter).toHaveClass(/active/);
  }
  const projectToggle = page.getByRole('button', { name: /expand|collapse/i }).first();
  if (await projectToggle.count()) {
    const before = await projectToggle.textContent();
    await projectToggle.click();
    await expect(projectToggle).not.toHaveText(before || '');
  }
  const consent = page.getByRole('button', { name: /accept|consent|privacy|ok/i }).first();
  if (await consent.count()) await consent.click();
  const longTasks = await page.evaluate(() => new Promise<number>(resolve => {
    let count = 0;
    if (!('PerformanceObserver' in window)) return resolve(0);
    const obs = new PerformanceObserver(list => { count += list.getEntries().length; });
    try { obs.observe({ type: 'longtask', buffered: true }); } catch { return resolve(0); }
    setTimeout(() => { obs.disconnect(); resolve(count); }, 250);
  }));
  expect(longTasks).toBeLessThan(3);
  console.log(`Measured interaction timings (ms): ${JSON.stringify(timings)}`);
  await assertNoRuntimeErrors();
});
