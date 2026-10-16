# GitHub Pages portfolio — Security & CI audit (candidate)

**Audit date:** 2026-10-16. **Scope:** `JimBLogic/jimblogic.github.io`, GitHub-only branch `audit/portfolio-actions-supply-chain-20261016`, PR **DRAFT**. No merge, GitHub Pages deployment, scheduled workflow dispatch, public JSON update, or production change performed in this audit.

## Baseline and confirmed source findings

- `main` baseline: `26379a86fcc16f26e62826e63831ee7c1cbfa687`. There is a separate open draft PR #57 (`agent/signal-room-portfolio`); do not overwrite or merge that work.
- `.github/workflows/deploy-pages.yml` previously gave the scheduled `refresh` job `contents: write`, persisted checkout credentials, executed external npm dependencies and a remote feed synchronizer, then pushed directly to `main` **before** the downstream build/privacy validation. This concentrates supply-chain and repository-write authority in one job.
- The existing five Actions were referenced by mutable major tags (`@v4`, `@v3`, `@v5`), instead of SHA-pinned code. GitHub recommends full commit SHA references as a supply-chain defense: https://docs.github.com/en/actions/reference/security/secure-use
- `workflow_dispatch` could run the writer on branches other than `main` because the old writer checked out `main` regardless of the triggering ref. The new writer requires the canonical repository and `refs/heads/main`.
- The same concurrency group for a scheduled run and a token-initiated push could cancel in-progress work when `cancel-in-progress: true`; the candidate only cancels superseded PR checks.
- GitHub repository branch API showed `main` with `protected: false` at audit time. **No claim is made that there are no rulesets**. Require reviews/status checks using a future separately authorized repository settings change.
- The baseline workflow schedule is `0 12 * * *` in `Europe/Madrid`; retain it. Prior schedule run #38751865164 succeeded on 2026-10-15, but scheduled execution times vary. Success does not prove punctual ingestion.

## Candidate changes and controls

1. `refresh` is read-only, runs only on canonical `main` scheduled/manual events, installs the locked dependencies, fetches the validated CyberDailyLog public feed and tests mirror/ESLint/privacy/static export **before** passing the two JSON artifacts onward.
2. `publish-snapshot` is the only job with `contents: write`. It runs **only after successful read-only refresh** on trusted main events; no `npm ci` or other package scripts execute with write authority. It downloads the same-run artifact, revalidates its schema/canonical fields, rejects regression to an older generated timestamp, compares the full mirror and commits **only the two allowlisted public JSON paths**, if changed. A validated no-change remains a no-change (no artificial feed update). The normal authorized daily refresh behaviour is preserved after a future merge.
3. `validate` has read-only token, checks PR merge SHA for PRs, uses locked `npm ci`, runs `npm run verify:mirror` and a production-dependency `npm audit --omit=dev --audit-level=high`. Audit failures are **not** suppressed. Static Pages artifact is not uploaded from PRs.
4. `deploy` requires `main`, non-PR event and successful validation. It owns only `pages: write` and `id-token: write`. A PR branch cannot deploy by construction. All runners are `ubuntu-24.04`; Node is major-pinned to 22 for project compatibility; all referenced Actions use their verified official major-tag SHA on audit date.
5. `tests/workflow-security.test.mjs` adds structural regression assertions for SHA pins, privilege separation, allowlists, main-only gates, deploy gate and scheduled timezone; included in the standard `npm test` path.

## Evidence and reproduction

- Prior scheduled baseline: https://github.com/JimBLogic/jimblogic.github.io/actions/runs/38751865164 . This baseline run does not prove the candidate.
- PR branch checks (after PR creation): **PENDING**; record exact final-HEAD Actions URL and test count here or in PR discussion. Do not mark green without checking GitHub jobs and logs.
- Reproduce locally from candidate branch with Node 22: `npm ci`, `node --test tests/workflow-security.test.mjs`, `npm run verify:mirror`, `npm audit --omit=dev --audit-level=high`.
- Review GitHub Actions upload/download artifact origin and path restrictions. The publishing step is explicitly not run on PRs and cannot be exercised with this GitHub-only candidate without authorizing a scheduled/main event; structural checks are **not** proof of a real production refresh or Pages deploy.

## Open risks and deliberate limits

- The GitHub Pages deployment flow, live site, browser/mobile rendering, remote schedule punctuality, actual writing/updating `main`, and downstream hosted Pages behaviour are **NOT tested by this PR**.
- The GitHub Actions npm cache, SHA resolution and any transitive dependencies still need periodic maintenance and review. Action SHA pinning guards tag drift, not all vulnerabilities or malicious code.
- GitHub's read-only job still executes `npm ci` and dependency scripts; it runs on trusted `main` for schedules and with a read-only token on PRs. GitHub-hosted runner and GitHub Artifacts are shared trust boundaries; no security property is perfect.
- The public feed is strictly a historical/sanitized snapshot, not guaranteed fresh. Existing fallback behavior is preserved. Never invent developments on a provider outage.
- Next.js is presently pinned to `16.2.6`; a current 2026 advisory CVE-2026-94543 concerns **self-hosted Pages Router SSG/ISR cache poisoning**, while this repo exports an immutable static `out/` and uses the App Router. Do not automatically claim exploitable impact on the GitHub Pages export; separately assess any runtime self-hosted deployment. Source: https://github.com/advisories/GHSA-4jqv-mc3x-m676
- Node is major-pinned for compatible reproducibility rather than patch-level immutable; npm package-lock provides exact package integrity. Future lifecycle upgrades need CI and mirror validation, not blind mass-upgrades.
- A merge of this draft would activate the new automation on `main` and may redeploy GitHub Pages on the next normal push/schedule. **Owner approval is required**; no automerge, dispatch or deployment in this audit.
