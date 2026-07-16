# QA migration audit

Network access to GitHub was blocked from this container (`CONNECT tunnel failed, response 403`), so the audit used the local repository at merged PR #18 commit `16fffcf`, the user-provided PR #17 review findings, and current tracked files. The blocked fetch/pull inspection is recorded as an environment limitation, not an assumption.

## PR #18 content already present and preserved

- ESLint flat configuration exists and ignores `dist/`.
- Stylelint exists and is relaxed enough for the current source CSS.
- Generated PDF copies in `dist/` are ignored by `.gitignore` from the merged state.
- Duplicate closing HTML tags were not present in the current source.
- `npm run lint`, `npm run build`, and `npm run test` existed and were retained/expanded.

## PR #17 intentions still missing before this branch

- Strict zero-trust QA workflow with real failing gates.
- Real GitHub Pages deployment from `dist/`.
- Browser smoke, responsive, accessibility, degraded-network, and interaction tests.
- Local source-to-dist validation and clean-tree enforcement.
- Production audit script and report.
- Least-privilege workflow permissions and SHA-pinned actions.
- Documentation for the QA/deployment model.

## Obsolete, broken, unsafe, or conflicting items

- `.github/workflows/build-deploy.yml` was a placeholder that never deployed.
- `.github/workflows/ci-lint-a11y.yml` used non-project tool installation and hid failures with shell-error masking.
- Repeating the same local validator under multiple CI step names would be noisy and was avoided.
- Binary validation that only checks discovered `dist/` files for existence is ineffective; the replacement uses build validation plus `git diff --exit-code`.
- Local JSON load failures must not show the GitHub repositories fallback.
- Optional GitHub/README network failures must be scoped to degraded-network tests rather than globally suppressing console errors.

## Playwright failure root-cause analysis from available evidence

The failed PR #17 artifacts/logs could not be fetched because direct GitHub access was blocked. The known review failures point to likely causes: optional-external console handling used message text as a URL, mobile menu selectors/accessibility names were brittle, consent interaction could require duplicate event paths, local asset loading needed fatal same-origin detection, and responsive overlap checks risked pixel brittleness. The new suite fixes these by mocking optional providers, making same-origin failures fatal, using role-based selectors, and avoiding pixel-perfect screenshots.
