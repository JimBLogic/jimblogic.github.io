# Professional claims review - 7 October 2026

## Scope and method

Reviewed the complete tracked file inventory of the Pages repository and Sites source, all five page routes, privacy, PDF text, llms.txt, metadata/JSON-LD, sitemap, robots, build scripts, CI and tests. Compared shared app/lib/public files by bytes. This is a professional-content and implementation review, not a guarantee of external platform availability or a legal certification.

## Findings and corrections

- AIF-C01 was still scheduled in September in EN/ES/CA and literally required by tests. Replaced with first attempt completed 29 September 2026, targeted study and future retake; not earned. CLF-C02 remains preparation. No score is displayed.
- AWS training badges and official exam certification are explicitly distinguished on the home page, training catalogue, CV and llms.txt.
- Homelab status overstated operational maturity and tested recovery. Deployment configuration and procedures are real; operational validation remains pending. Six next-evidence deliverables are labelled pending, not completed.
- Hero wording implied security incident employment. Replaced with operational ownership and an explicit first professional SOC / Blue Team role objective. Removed the aspirational SOC jobTitle from Person JSON-LD.
- Removed unversioned TryHackMe ranking/room counts. The live profile remains the verification destination.
- CV prioritises original projects, separates employment from guided labs, and matches the AWS/homelab states. Previous UK support employment had conflicting end years (2021 on the site, 2022 in the PDF); the unconfirmed range is omitted consistently. Property work is labelled 2026 instead of the PDF's conflicting 2025 start; no assertion of ongoing employment is made. Exact employment dates remain an owner confirmation item.
- Four original project repositories remain featured. Upstream resources are identified as third-party work. Two additional repositories considered during discovery were excluded from publication at the owner's explicit request. Private/unverified projects are not public proof-of-work.
- General Credly profile link returned 404. Selected Cisco evidence now uses its working badge URL; the selected arcX card without a working direct verification target was replaced with the already-catalogued KCCS evidence. Historical arcX training in the supplied CV is not promoted as independently verified here.
- Ported the September Sites privacy improvements to Pages. Preserved local-only explicit language preferences, deletion controls and no application trackers.
- Updated sitemap lastmod, ProfilePage dateModified, software descriptions and llms.txt. GitHub Pages remains canonical for each corresponding route. Search-engine recrawl timing cannot be forced by a source update.

## Evidence checked beyond README claims

Homelab source at `70caa6dffa3d12ae7c4a6e398f9df66de284098f`: deploy/compose*.yaml, deploy/scripts/verify-stack.sh, security/incident-response-notes.md and tracked file tree. The incident note is explicitly a template and fictional example; no completed operational exercises were located.

CyberDailyLog: src/cyberdailylog/state.py, tests/unit/test_state_transitions.py, reports/cti-state.json, reports/latest.md and reports/publication-timing.json. The last inspected publication record is dated 6 October 2026. The implementation records material state changes; test source covers ransomware-linked transitions and deduplication. Public timing artifacts support a monitoring claim, not a guarantee of punctuality. Its tests were inspected, but not executed here because pytest was unavailable; portfolio validation is separate.

## Validation

- Sites: ESLint, production Worker build, four privacy/storage tests, two professional-claim regression tests, four production render/security/feed tests.
- Pages: ESLint, TypeScript/static production build, six privacy/professional tests, 12 artifact checks and five independent canonical/privacy/CSP route checks.
- Shared app/lib/public content checked byte-for-byte using scripts/verify-mirror.mjs; updated CV bytes included.
- Five generated HTML routes checked for valid JSON-LD, duplicate IDs, image alt text and internal links/fragments (117 links).
- All 36 external training-catalogue destinations returned HTTP 200. Public Pages, CyberDailyLog and homelab repository links and TryHackMe profile returned 200. ABCM repository exists through the GitHub API, but its browser page request timed out (504). LinkedIn returned automated-access status 999; neither is classified as a confirmed broken link.
- PDF rendered and both pages visually inspected, with embedded fonts and no clipping.
- Global manual review of requested terms: remaining September dates describe a completed exam or historic privacy review. No future September exam claim, operational homelab claim or earned AWS certification claim remains in application content.
- Source/HTML accessibility review: preserved keyboard focus, labelled controls, skip links, reduced-motion handling and mobile breakpoints. New details/summary controls use native keyboard semantics. No visual mobile/browser audit was possible: the required control-browser capability was unavailable. This is not an automated WCAG certification.
- Public source scanned for credential patterns; no secrets found. Deployment credentials were never written into the repositories.

## Deliberately preserved

Existing visual design, EN/ES/CA switching, five routes, responsive rules, platform-specific builds, canonical URLs, privacy model, workflows, document URLs and project boundaries. No dependencies or new tracking services introduced. Source-feed timestamps are data timestamps, not proof of a newly completed professional exercise.

## Owner clarification and document preference - 7 October 2026

Owner confirmed Community employment through 2022 and administration in 2026. Public dates now show 2016-2022 and 2026 consistently. Restored the previous two-page photo CV layout with accurate candidate/AWS claims and no volatile ranking. The project-focused replacement is now a separate one-page cover letter, linked from Contact. Earlier pending-date and browser-QA notes above describe the prior review, not outstanding date questions.
