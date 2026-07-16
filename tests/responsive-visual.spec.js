import { test, expect } from '@playwright/test';
import { openHome } from './helpers';

const sizes = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1366, height: 768 },
  { width: 1920, height: 1080 }
];

for (const size of sizes) {
  for (const lang of ['en', 'es', 'ca']) {
    test(`responsive ${lang} ${size.width}x${size.height}`, async ({ page }) => {
      await page.setViewportSize(size);
      const guard = await openHome(page);

      await page.locator(`button[data-lang="${lang}"]`).click();
      await expect(page.getByRole('heading').first()).toBeVisible();

      await page.evaluate(() => {
        document.documentElement.classList.add('qa-stable');
      });

      if (size.width < 700) {
        const menuButton = page.getByRole('button', { name: /menu/i });
        await menuButton.click();
        await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
        await menuButton.click();
        await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      }

      const consent = page.locator('#consent');
      if (await consent.isVisible()) {
        await page.locator('#consent-decline').click();
        await expect(consent).toBeHidden();
      }

      await page.evaluate(
        () => new Promise(resolve => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve)))
      );

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow).toBeLessThanOrEqual(2);

      const overlaps = await page
        .locator('#certificateList, #projectsList, .software-list, .tools-list')
        .evaluateAll(containers =>
          containers.some(container => {
            const children = Array.from(container.children).filter(element => {
              const style = window.getComputedStyle(element);
              const rect = element.getBoundingClientRect();
              return (
                style.display !== 'none' &&
                style.visibility !== 'hidden' &&
                rect.width > 0 &&
                rect.height > 0
              );
            });

            return children.some((first, index) =>
              children.slice(index + 1).some(second => {
                const firstRect = first.getBoundingClientRect();
                const secondRect = second.getBoundingClientRect();
                const overlapWidth = Math.max(
                  0,
                  Math.min(firstRect.right, secondRect.right) - Math.max(firstRect.left, secondRect.left)
                );
                const overlapHeight = Math.max(
                  0,
                  Math.min(firstRect.bottom, secondRect.bottom) - Math.max(firstRect.top, secondRect.top)
                );
                return overlapWidth * overlapHeight > 80;
              })
            );
          })
        );

      expect(overlaps).toBe(false);
      guard.assertNoSameOriginFailures();
    });
  }
}
