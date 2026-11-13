# AI Source Router 1.0

The source router helps a reader choose evidence for a specific question. It is
an authored, static reference in the portfolio, not a question-answering service,
search proxy, crawler or live vulnerability feed. The canonical publication is
`https://jimblogic.github.io/agent-resources/`; Sites mirrors the same content
while retaining its separate Worker deployment.

## What adds value

The 12 publisher-attributed entries preserve the useful selection from PR #66.
Four original walkthroughs explain how to combine or distinguish those sources:

| Question | Selection boundary | Portfolio connection |
| --- | --- | --- |
| How should a CVE be triaged? | KEV is known-exploitation evidence, NVD is metadata/enrichment, and EPSS is a dated prediction. Local exposure and vendor remediation still need verification. | CyberDailyLog state tracking, publication evidence and explicit degradation. |
| Is a cloud access failure authentication or authorisation? | AWS IAM permission decisions and Entra authentication methods answer different questions. Neither documentation entry establishes a secure tenant. | Cloud foundations are learning context, with professional claims kept within their evidence. |
| Which layer explains an HTTP response? | RFC 9110 is normative; MDN is explanatory; Cloudflare documentation concerns that vendor's product and configuration. | Shared portfolio source still needs separate Pages and Worker runtime checks. |
| Are two economic observations comparable? | Dataset definitions, units, reference periods, adjustment, revisions and missing values come before a trend interpretation. | ABCM separates observations from educational interpretation. This does not claim Eurostat is an implemented ABCM provider. |

Each walkthrough names its question, source IDs, review steps, forbidden
inferences, project relationship and inspectable evidence links. They make the
catalogue useful without an AI client. Neither these walkthroughs nor the
project summaries establish current operation, professional SOC experience,
certification, investment advice or independent verification of another project.

The optional 3D Lab is a separate visual experiment. The portfolio and its text
brief remain the practical route to non-3D information. No 3D runtime belongs on
the portfolio homepage or this source router.

## Static public contract

| Resource | Purpose |
| --- | --- |
| `/agent-resources/` | Server-rendered human reference, selection workflows and machine-data links. |
| `/agent-resources/catalog.json` | Versioned source and walkthrough data. |
| `/agent-resources/catalog.schema.json` | JSON Schema draft 2020-12 for the catalogue. |
| `/agent-resources/qa-cases.json` | Human-authored prompts, expected starting sources, reasons and cautions. |
| `/agent-resources/qa-cases.schema.json` | JSON Schema draft 2020-12 for those fixtures. |
| `/llms.txt` | Optional discovery aid. No universal adoption, access, indexing or citation guarantee is claimed. |

`lib/agent-resources.ts` exports the public JSON plus presentation categories for
the server-rendered page. There is one authored data source, no runtime lookup,
private configuration, token, user input or embedded third-party content.

Catalogue version `1.0.0` retains the 12 original source IDs. Source records
include publisher attribution, provenance kind, topic, intent, question, direct
HTTPS URL, format, limitation and review date. Workflows reference source IDs
instead of repeating source descriptions. IDs must be unique and references must
resolve. URLs must be public HTTPS links without credentials. Do not change a
stable ID to silently change its meaning; version breaking contract changes.

MDN is explicitly a secondary reference, OWASP is community guidance, and an
official publisher is responsible only for its own material. Publisher identity
is not an endorsement of JimBLogic. Third-party data and documentation retain
their publishers' authorship, licensing and terms. The catalogue republishes
original descriptions and links, not source datasets or advisories.

## Review dates and evidence

The top-level `reviewed_on: 2026-11-10` records the editorial review of the
selection logic and the new walkthroughs. Per-source `reviewed_on: 2026-10-30`
preserves the original selection review recorded in PR #66. Neither date is a
publisher update date, availability check, content snapshot or freshness promise.
The exact scope is also recorded in `review_scope` in the catalogue.

Review dates are authored facts. Do not refresh them automatically during builds,
feed updates or deployments. Record an endpoint check separately with the actual
time, URL, method, response and redirect chain. A successful response does not
prove semantic accuracy or acceptable reuse permissions. A failed response may
reflect access restrictions and should remain an observation with its limits.

Evidence links are starting points for inspection. GitHub `main` URLs can change;
when reporting a concrete finding, record the inspected commit and relevant
lines. Publication timing reports and datasets have their own timestamps, which
must not be replaced by the catalogue's editorial date.

## Evaluation fixtures and maintenance

The 12 QA fixtures cover every selected source. The NIST case asks about the
Cybersecurity Framework, distinct from the NIST Risk Management Framework.
Prompts specify expected source selection and preserve an explicit caution.
Their `evaluation.status` is `NOT TESTED`: no actual AI-model source-selection
run is recorded. Schema/reference checks verify the fixture's structure, not
answer quality, retrieval capability, citation correctness or agent performance.

When editing a source or workflow:

1. Read the responsible publisher's material and verify the exact question and
   limitations. Keep normative standards, guidance, observations and predictions
   distinct. Do not invent a live result or make a third-party project claim.
2. Update the JSON, both schemas when necessary, the walkthrough references and
   the QA reason/caution together. Record only review activity actually done.
3. Validate schemas, unique IDs, safe URLs, dates and references, including negative
   fixtures. Check rendered content, canonical metadata and route availability.
4. Synchronise the authored `app/`, `lib/` and `public/` files into `sites/` and
   run the mirror verifier. Preserve Sites-specific Worker, build and hosting
   files. Do not copy historical lockfiles or tooling from PR #66.
5. Run the root `npm run verify:mirror`, `npm test`, `npm run build` and
   `npm run validate` as appropriate; under `sites/`, run `npm run verify` and
   `npm test`. The Worker must pass rendered tests independently of static export.
6. Review links, mobile layout, keyboard navigation, reduced motion, privacy and
   dependency results. Report unavailable capabilities as `NOT TESTED`.

All source links are direct. Do not add a fetch-by-URL endpoint, server-side
scraper, redirect relay or model API as part of maintenance. Do not forward
visitor cookies, authorisation or private request headers to any source. No
tracking, fingerprinting, hidden crawler content, paid service or analytics
activation is necessary for this feature.

## Baseline-first measurement plan

The implementation supplies no analytics and establishes no traffic, search or
AI-citation baseline. Current indexing, impressions, traffic and agent quality
are unknown unless the owner supplies actual dated evidence. Save available
baseline aggregates before an owner-approved deployment and compare the same
definitions, target, reporting period and timezone afterward.

| Measure | Owner-approved evidence | Limits and follow-up |
| --- | --- | --- |
| Indexing and search impressions | Existing owner-only Search Console coverage, URL inspection and page/query impression aggregates. | Record access and reporting lag. A live HTTP 200 or submitted sitemap does not establish indexing. Compare at deployment +14 and +28 days. |
| Organic and referral traffic | Existing aggregate privacy-respecting reports, if available. | Do not silently enable analytics, store identifiers or infer visits from search impressions. If no existing source is available, use `NOT TESTED`. |
| AI-related referrals | Existing aggregate referrer reports where an identifiable source is actually present. | Missing or stripped referrers remain unknown; a referral does not prove that an AI cited a particular passage. Do not fingerprint clients. |
| Link and resource availability | Bounded, dated direct link checks and static/Worker route checks. | Record failures and redirects without claiming continuous uptime or publisher freshness. Check independently of traffic. |
| Human or AI source selection | A manual run using the published fixtures, with model/tool version, date, exact prompt, observed selected source, warning retention and citation verification. | Obtain owner approval for a named model/tool and any cost or retrieval access. Keep fixture validation separate from measured agent results. Do not publish prompts containing private data. |
| Known bot access | Existing aggregate hosting logs, only if the owner already has lawful access and retention appropriate to the task. | Hosting logs may be unavailable. User-agent strings can be spoofed, and crawler requests do not prove indexing, citations or usefulness. Do not introduce visitor logging. |

At +14 days, compare resource access and initial indexing observations with the
pre-deployment baseline. At +28 days, compare equal reporting windows for the
same measures, annotating deployment time, reporting delay, unrelated site
changes and external events. State actual observations separately from
estimates and unknowns. A small uncontrolled comparison cannot establish that
the router caused a change in traffic, rankings or citations.

## Hosting, approval and rollback

GitHub Pages remains the canonical source. Every mirror page must name its Pages
canonical; the sitemap and discovery links must not advertise competing origins.
Static export and a Sites Worker are separate deliverables, and successful
local builds do not establish the currently deployed version or production
response headers.

The feature PR must not merge or deploy without separate owner approval. Merging
an approved PR can trigger the repository's Pages deployment workflow; Sites
publication requires its separate supported source/build/version workflow. Keep
unrelated Sites changes intact. Never modify or deploy the CyberDailyLog, ABCM
or 3D Lab repositories for this feature.

Rollback the feature through a normal reviewed revert commit, validate both
hosting targets again, and publish only with approval. Do not force-push or
rewrite `main`. Sites can separately return to its last verified saved version
through an owner-approved publication. Leave PR #66 open; recommend superseding
it only after this replacement is accepted so its historical work remains
traceable. Preserve the dependency and request-boundary fixes from PR #67 and
subsequent security fixes throughout integration and rollback.
