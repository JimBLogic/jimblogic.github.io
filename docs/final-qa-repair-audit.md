# Final QA repair audit

## Scope inspected

The repair started from the current merged `main` snapshot available in the workspace at commit `98f35b8`, which is the merge of PR #19. The local shell could not fetch GitHub because outbound Git access returned `CONNECT tunnel failed, response 403`, and the GitHub CLI is not installed, so remote PR/run inspection could not be completed from this container. The repository files, workflow definitions, validation scripts, Vite config, Playwright config, tests, `.gitignore`, and tracked `dist/` tree were inspected before removing tracked build output.

## Root cause

The old QA workflow generated `dist/index.html` with a build version from `git rev-parse --short HEAD`, committed that generated file, rebuilt in CI at a new commit, and then required `git diff --exit-code`. The generated build fingerprint necessarily changed from the pre-commit SHA to the CI commit SHA, so committed-dist parity was self-referential and could not be made stable by repeatedly rebuilding and committing `dist/`.

## `dist/` audit

Tracked `dist/` contained Vite-generated HTML/CSS/JS plus files copied by `vite-plugin-static-copy`: `assets/`, `UpgradeHub/`, JSON data files, `robots.txt`, `sitemap.xml`, and `LICENSE`. The unique authoritative inputs exist outside `dist/`:

- source HTML/CSS/JS in `index.html`, `style.css`, `assets/css/`, and `assets/js/`;
- locale files in `assets/locales/`;
- JSON data in `certificates.json`, `software.json`, and `tools.json`;
- PDFs/images/CSV assets in `assets/` and `UpgradeHub/`;
- static root files `robots.txt`, `sitemap.xml`, and `LICENSE`.

No hand-maintained file was found only in `dist/`; therefore tracked `dist/` contents were removed from Git after the source parity check.

## Migration decision

`dist/` is now an ignored generated Vite output directory. GitHub Pages must deploy the artifact uploaded by the QA job, not committed build output.

## Rollback note

If rollback is required, revert the repair commit and restore the previous workflows, but do not reintroduce commit-SHA-derived committed `dist` parity without also removing commit fingerprints from generated files.
