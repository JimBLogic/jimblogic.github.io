# Portfolio privacy and mirror review — 7 September 2026

Scope: the public portfolio at `jimblogic.github.io` and `portfolio.jimblogic.chatgpt.site`.

| Surface | Application behavior |
|---|---|
| Cookies | No application cookie reads or writes |
| localStorage | `jimblogic-language`, only after an explicit EN/ES/CA selection; no automatic expiry; deleted by the visitor |
| sessionStorage | No writes; the deletion button removes the old `jimblogic-cyberdailylog-snapshot` key if present |
| IndexedDB / service workers | Not used by portfolio source |
| Forms / accounts / uploads | No public application forms, account flows or uploads |
| Database / object storage | Sites bindings remain null; unused template authentication code is not routed |
| Fonts / images / CV | Local assets, served by the domain being visited |
| Public news snapshot | Browser fetches only `/data/cyberdailylog.json`, omitting credentials and referrer |
| Sites snapshot adapter | Fixed public GitHub Pages URL; no visitor headers forwarded; validated fields only; 15-minute memory cache and bundled fallback |
| Hosting | GitHub may process technical/usage data; Sites automatically measures visitors and page views independently of the application |

Deletion affects only the current origin. It preserves unrelated storage and reports failure when browser storage is blocked. It cannot erase hosting logs or disable platform analytics. No fictional accept/reject control has been added.

The source audit and regression tests cover preference initialization, explicit writes, invalid saved values, blocked APIs, targeted deletion and malformed feed dates. The production render checks cover all five routes, their independent canonical URLs, privacy links and security headers. They do not inspect undisclosed hosting internals or establish a guarantee against legal penalties.

Primary references: [AEPD cookie guide](https://www.aepd.es/guias/guia-cookies.pdf), [Sites analytics](https://learn.chatgpt.com/docs/sites), [GitHub privacy](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement), [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## Reproduce both destinations

- The repository root builds the GitHub Pages static export.
- `sites/` is the complete Sites source snapshot, including its existing runtime, lockfile, Worker, tests and project identity. It contains no credentials or generated output.
- `node scripts/verify-mirror.mjs` checks every root `app/`, `lib/` and `public/` file byte for byte against `sites/`.
- `npm run verify:mirror` runs privacy checks, tests, lint, mirror comparison and the static build validation.
- In the Sites source directory, `npm ci` and `npm run verify` verify the Worker build. Publication still uses the native Sites save/deploy flow; a GitHub push alone does not publish a new Sites interface.
- For interface edits, apply the same files to both source trees and publish both verified outputs. Keep each adapter's package and build configuration intact.

## Daily snapshot

The Pages workflow refreshes the public snapshot at 12:00 Europe/Madrid (DST-aware), records changes in both copies, then builds once and deploys that checked artifact. GitHub scheduling is best effort. Sites reads the published Pages snapshot on its server, so news refreshes do not require redeploying the Sites interface. Failure keeps the previous dated snapshot; it never invents a current timestamp.
