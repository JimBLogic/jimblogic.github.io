import { test, expect } from '@playwright/test';
import { openHome } from './helpers';
for (const size of [{width:320,height:568},{width:390,height:844},{width:768,height:1024},{width:1366,height:768},{width:1920,height:1080}]) {
  for (const lang of ['en','es','ca']) test(`responsive ${lang} ${size.width}x${size.height}`, async ({ page }) => {
    await page.setViewportSize(size); const guard = await openHome(page);
    await page.locator(`button[data-lang="${lang}"]`).click();
    await expect(page.getByRole('heading').first()).toBeVisible();
    if (size.width < 700) { await page.getByRole('button', { name: /menu/i }).click(); await expect(page.getByRole('button', { name: /menu/i })).toHaveAttribute('aria-expanded','true'); }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(2);
    const overlaps = await page.locator('#certificateList, #projectsList, .software-list, .tools-list').evaluateAll(containers => containers.some(container => Array.from(container.children).some((a,i,arr) => arr.slice(i+1).some((b) => { const r1=a.getBoundingClientRect(), r2=b.getBoundingClientRect(); return r1.width&&r2.width&&Math.max(0, Math.min(r1.right,r2.right)-Math.max(r1.left,r2.left))*Math.max(0, Math.min(r1.bottom,r2.bottom)-Math.max(r1.top,r2.top)) > 80; }))));
    expect(overlaps).toBe(false); guard.assertNoSameOriginFailures();
  });
}
