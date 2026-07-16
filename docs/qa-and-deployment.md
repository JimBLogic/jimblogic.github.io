# QA and deployment

## Architecture

A single workflow, `.github/workflows/site-qa-pages.yml`, owns QA and Pages deployment. The `qa` job checks out source, installs with `npm ci`, runs syntax checks and lint, builds `dist` exactly once, validates that generated output, installs Chromium, runs Playwright/Axe against the already-built `dist` via Vite preview, and uploads the same tested `dist` as the Pages artifact only on `main` push or `workflow_dispatch` on `main`.

`deploy` has `needs: qa` and no checkout/build steps. It consumes the Pages artifact uploaded by `qa`. `production-audit` runs after deployment and requires the live page to expose the expected build version.

## Local commands

```bash
npm ci
node --check assets/js/script.js
node --check assets/js/translate.js
node --check scripts/generate-build-version.mjs
node --check scripts/validate-local.mjs
node --check scripts/audit-production.mjs
npm run lint
npm run build
npm run validate:local
npx playwright install --with-deps chromium
npm run test:e2e:ci
npm test
git diff --check
git status --short
```

## Build version

CI sets `VITE_BUILD_VERSION` to `github.sha`; `scripts/generate-build-version.mjs` sanitizes that to the first 12 safe characters. Local builds without `VITE_BUILD_VERSION` hash authoritative source inputs with SHA-256 and use the first 12 hex characters. No git command, timestamp, or random fallback is used.

## Deployment gating

Deployment is allowed only when `needs.qa.result == 'success'`, `github.ref == 'refs/heads/main'`, and the event is `push` or `workflow_dispatch`. Pull requests never deploy. Manual dispatch on a non-main ref validates but does not deploy.

## Permissions and actions

Workflow-level permissions are `contents: read`. Only `deploy` has `pages: write` and `id-token: write`. Actions are pinned to full commit SHAs with release comments.

## Privacy gate

The build must not publish private LinkedIn export data. `assets/MyLinkedinInfo/` is ignored and removed from source, Vite copies only an explicit public asset allowlist, and generated-output validation fails if `dist/` contains `MyLinkedinInfo` or known LinkedIn export file names. Historical commits may still contain the removed export files; history cleanup is a separate security operation and is not performed by this PR.

## Artifacts

On QA failure, one compact diagnostic artifact includes `playwright-report/` and `test-results/`. On main, one Pages artifact is uploaded from the already tested `dist/`.

## Production audit

Run:

```bash
node scripts/audit-production.mjs --url https://jimblogic.github.io/ --expected-version <expected-12-char-version>
```

The audit uses cache-busted requests, timeouts, retries, build-version equality, required/obsolete copy checks, same-origin CSS/JS status and content-type checks, and writes `reports/production-audit.json`.

## Repository settings required

1. Settings → Pages → Source: GitHub Actions.
2. Protect `main`.
3. Require the `qa` status check.
4. Do not allow merging while checks are pending or failing.
5. Require branches to be up to date where appropriate.
6. Restrict direct pushes to `main` where appropriate.

These settings must be changed in GitHub; this repository patch does not claim to have changed them.

## Troubleshooting

- If validation fails, run `npm run build && npm run validate:local` and inspect the JSON error list.
- If Playwright fails, open `playwright-report/` or `test-results/` from the failure artifact.
- If deployment succeeds but production audit fails, wait for Pages propagation and verify the expected build-version in production HTML.

## Rollback

Revert the repair commit, restore the previous workflow files, and restore tracked `dist/` only if an emergency static deployment is required. Prefer rerunning the artifact workflow after fixing the root cause.
