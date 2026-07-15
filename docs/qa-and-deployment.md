# QA and deployment

The repository keeps `dist/` committed because GitHub Pages serves the built portfolio and reviewers can diff generated output against source changes. Every build in CI is followed by `npm run validate:local` and `git diff --exit-code` so stale committed output fails.

## Architecture

- `zero-trust-qa.yml` runs on pull requests, pushes to `main`, and manual dispatch with `contents: read` only.
- `pages-deploy.yml` deploys only after the `Zero-trust QA` workflow succeeds on `main`, or by manual dispatch. Only the deploy job receives `pages: write` and `id-token: write`.
- Production audit runs after deployment so pull requests are not blocked by an older live site.

## Local setup

Use Node.js 24 and install reproducible dependencies with `npm ci`.

Commands:

- `npm run lint` checks source JavaScript/scripts/tests and `style.css`.
- `npm run build` regenerates `dist/`.
- `npm run validate:local` checks locales, source-to-dist parity, required content, same-origin references, build fingerprints, and malformed HTML endings.
- `npx playwright install chromium` installs the browser for UI tests.
- `npm run test:e2e:chromium` runs smoke, responsive, accessibility, degraded-network, and interaction tests.
- `npm run audit:production` writes `reports/production-audit.json` for `https://jimblogic.github.io/`.

## Artifacts

On browser failure, CI uploads `playwright-report/` and `test-results/` once with 10-day retention. Production audit reports are retained for 14 days.

## Common failures

- Locale parity: add new translation keys to EN, ES, and CA.
- Dist parity: run `npm run build`, inspect `git diff`, and commit generated `dist/` updates.
- Browser setup: run `npx playwright install chromium` locally; CI installs Chromium explicitly.
- Production audit: confirm the latest deployment has completed before diagnosing copy or asset failures.

## GitHub Pages settings

Repository owner must set Settings → Pages → Source to GitHub Actions. Do not deploy the repository root; the workflow uploads `dist/`.

## Rollback

Revert the PR commit on `main` and let the gated deploy workflow publish the reverted `dist/`. If Pages settings are broken, restore the previous GitHub Actions Pages source configuration before re-running deployment.
