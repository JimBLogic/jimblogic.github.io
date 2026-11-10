# AI Source Router 1.0 — baseline and integration boundaries

Read-only discovery: 10 November 2026. Repository:
<https://github.com/JimBLogic/jimblogic.github.io>.

## Verified starting point

| Component | Evidence | State |
| --- | --- | --- |
| Main source | `28141ba1bbfa9a65fb0425ec02bb217d0cb2293d`; clean checkout before implementation | PASS |
| Repository instructions | No `AGENTS.md` found in the checkout or its parent | PASS |
| PR #66 | Open, draft, unmerged, not mergeable; head `cfc1f15520526865abdf671ec6ebed41cdd8fbd9` | DEGRADED |
| Remote feature branch | `origin/feat/agent-source-router-v01` resolves to `6b99b1ccb5b3d3f449f9dcb4de0f898b9bff9b73`, one commit after the PR head also independently verified through `refs/pull/66/head` | DEGRADED |
| Remote branch divergence | Merge-base `407eb7c6186b0f39ee8169a13d8cbcf8ed2a4942`; Git counts 11 main-only and 48 feature-only commits; the PR API reports 47 commits | DEGRADED |
| PR #67 security fixes | Merge `be21bb1753dc8abcd68d56bd233cb0679f7783d5` is an ancestor of main | PASS |
| Subsequent main fixes | PR #68 merge `ffb9906` patches Sites fflate/esbuild; PR #69 merge `2a21627` preserves responsive experience/principles spacing | PASS |
| GitHub Actions | Run [42699749333](https://github.com/JimBLogic/jimblogic.github.io/actions/runs/42699749333), main SHA above: refresh did not start; validate and deploy skipped | BLOCKED |
| GitHub Pages availability | Coordinator observed HTTP 200 at `https://jimblogic.github.io/`, 10 November at 13:53 UTC | PASS |
| Sites availability | Initial HEAD returned HTTP 404 at 13:53 UTC; later independent HEAD and GET returned HTTP 200 with a Pages canonical. No production change was made or cause established | DEGRADED |
| Baseline execution checks | No build or runtime tests were executed during the read-only architecture audit | NOT TESTED |

The Actions failure is an account-level blocker, not an observed application test
failure. Check-run `129441005598` has no executed steps, runner ID zero, and the
annotation: “The job was not started because your account is locked due to a
billing issue.” The owner must resolve the account issue before hosted CI can
provide evidence. Do not weaken workflow permissions, checks or deployment gates.

## Existing architecture and contract

GitHub Pages uses Next.js `16.4.3`, React `19.3.1`, `output: "export"`,
`trailingSlash: true`, and local unoptimized images. Only `out/` is deployed;
there is no deployed Next.js server.

Sites uses Vinext `1.4.0`, Vite `8.3.5` and a Cloudflare Worker, with retained
project ID `appgprj_6a633d89a6988191b5cdd97f66176ab2`. Its build emits
`dist/server/index.js` and deployment metadata. Publication is a separate
owner-approved action; committing `sites/` does not publish it.

`app/`, `lib/` and `public/` are shared byte-for-byte. The mirror checker hashes
all shared files. Worker, build tooling and hosting configuration remain
Sites-specific. Both implementations already point canonical URLs, robots and
sitemap entries to GitHub Pages.

Preserve `/`, `/privacy/`, `/certifications/`, `/labs/cyberdailylog/`,
`/labs/austrian-monitor/`, crawl-discovery routes, CV/certificate assets, homelab
content and the public CyberDailyLog snapshot. Preserve the Worker feed's fixed
upstream, visitor-header isolation, manual-redirect rejection and safe fallback.

Root `npm run verify:mirror` includes lint, mirror verification and `npm test`.
The test command includes privacy/claims checks, dependency security floors,
static build and artifact checks. `npm run validate` checks existing artifacts.
Sites `npm run verify` includes lint and its verified build. That build includes
privacy/claims checks, three dependency compatibility tests, artifact validation
and five Miniflare/workerd rendered tests. Baseline CI only validates the root;
Sites CI coverage requires a focused addition.

## Selective reuse and conflicts

PR #66 contributes useful source attribution, a 12-source editorial catalogue,
evaluation examples, a static resource route and project discovery. Recover and
adapt those ideas; do not merge its historical branch wholesale.

Do not restore its package manifests/locks, Worker feed, security guards, build
scripts or whole workflow. The old tree would regress PR #67/#68 protections,
dependency compatibility tests, security documentation, current snapshots and
PR #69 spacing. The prototype also needs substantive project interpretation,
schema and negative validation, transparent evaluation limits and evidence for
3D-related claims. Its catalogue date denotes editorial selection, not verified
live health or current content.

Append scoped styles while preserving `.background-grid > div`,
`.principles article` and the 901–1120px media rule added by PR #69. Keep the 3D
runtime external and optional, with a practical portfolio-hosted non-3D route.
Mirror shared source only after compatible changes are integrated.

## Ownership and review boundaries

| Responsibility | Files / decisions |
| --- | --- |
| A — architecture | This baseline, integration boundaries, selective recovery rationale |
| B — source discovery | Catalogue, evaluation cases, schemas, typed data interface and methodology |
| C — SEO/content | Sitemap, `llms.txt`, metadata, canonical and structured-data checks |
| D — frontend | Human resource page, homepage project discovery, scoped styles, non-3D Lab brief |
| E — security | Integrated diff, dependency/Worker/privacy boundaries, evidence-backed findings |
| F — QA | Negative validation, static and rendered Worker tests, CI verification |
| Coordinator | Clean feature branch, conflict resolution, mirror integration, final evidence and PR |

Implementation branch: `feat/ai-source-router-1.0`, created from the verified
main SHA. No direct main changes, PR #66 closure, production deployment, merge,
separate-project modification or visitor analytics are authorized by this work.
