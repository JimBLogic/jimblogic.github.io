# Portfolio professional audit — 2026-07-17

## Executive summary

The portfolio is a solid junior cybersecurity site: it is static, multilingual, privacy-conscious and backed by inspectable public work. The main recruiter risk was not a broken feature, but first-impression clarity. The first screen did not immediately group target role, location, opportunity type, strongest public evidence, CV, GitHub and lab notes into one recruiter path.

This PR keeps the existing Vite/GitHub Pages architecture, CyberDailyLog integration, CSP, consent banner, scrollspy/sidebar behavior and EN/ES/CA support. It adds a focused recruiter snapshot, stronger hero calls to action, compact project case-study summaries and a documented audit.

A follow-up review of the PR also corrected four quality issues before merge: untranslated accessible labels, missing in-bundle fallbacks for the new translation keys, unnatural Spanish/Catalan wording and an unclear boundary between the private homelab repository and publicly inspectable GitHub work.

## Current strengths

- Static Vite portfolio with GitHub Pages deployment and an exact-tested-artifact workflow.
- Clear junior positioning as a SOC / Blue Team candidate rather than an employed analyst.
- CyberDailyLog is a strong public proof-of-work item because it combines automation, source-backed reporting, validation and safe fallback behavior.
- The site includes EN, ES and CA content, CV links, certificate data, GitHub project loading and privacy-conscious analytics consent.
- Existing Playwright and Axe tests cover accessibility, responsive behavior, CyberDailyLog live/fallback states and core interactions.

## Recruiter risks

- **P1:** The hero did not answer the full recruiter checklist within ten seconds: target role, location, remote/hybrid relevance, strongest evidence, CV, GitHub and training-lab notes were split across the page.
- **P1:** Project evidence was too dependent on a generic GitHub repository list. Recruiters and interviewers need a short explanation of purpose, what was built, defensive relevance and honest status.
- **P1:** The homelab is valuable interview material, but its detailed repository is private. The site must not imply that recruiters can inspect source that is not public.
- **P2:** Certificates and tools are useful, but they should not compete visually with stronger proof-of-work items.

## Technical risks

- **P1:** `assets/js/scroll-sidebar-ux.js` remains in the repository as an older implementation while `assets/js/site-ux.js` is the loaded implementation. It is not loaded by `index.html`, but it is a source of future confusion.
- **P1, corrected in this PR:** the original change added locale keys only to JSON files. If those files could not be parsed, new elements could display raw translation keys because the in-bundle fallback dictionary did not contain them.
- **P2:** Runtime project data depends on the GitHub API. The current fallback is acceptable, but the featured manual project summaries should carry the recruiter story if the API is unavailable.
- **P2:** The original Codex environment could not complete `npm ci` because the registry returned HTTP 403 for `@axe-core/playwright`; GitHub Actions remains the authoritative browser-validation environment.

## Accessibility findings

- Existing structure uses a skip link, main landmark, semantic sections, buttons and visible focus styles.
- Existing Axe tests target serious and critical violations; this PR does not weaken exclusions or suppress errors.
- The recruiter snapshot uses a semantic description list, and the case studies use headings, lists and ordinary links.
- **Corrected in review:** the hero action group, external proof links and recruiter snapshot now receive translated accessible names in EN, ES and CA.
- **Corrected in review:** keyboard-order testing starts from the first recruiter link and follows the actual DOM order instead of relying on a brittle fixed number of Tab presses from the top of the page.
- No P0 accessibility blockers were identified.

## Responsive findings

- Existing responsive coverage includes mobile, tablet and desktop layouts across EN/ES/CA.
- The focused recruiter suite covers 320×568, 390×844, 768×1024, 1366×650, 1366×768 and 1920×1080.
- New proof and case-study grids collapse to one column below 760px to avoid horizontal overflow and preserve mobile readability.
- The tests check horizontal overflow, child containment and overlap in the new CTA and evidence groups.

## Content findings

- The copy remains honest and junior-appropriate.
- The hero now states opportunity intent without claiming professional SOC experience.
- **Corrected in review:** Spanish `triar alertas` was replaced with natural Spanish, and mixed English wording such as `reporting` and `troubleshooting` was removed from the new Spanish/Catalan case-study copy.
- **Corrected in review:** the homelab status explicitly states that detailed repository work is private while public documentation is being prepared; its link is labelled as general public GitHub work rather than direct homelab source.
- TryHackMe/Hack The Box points to a public repository of lab notes and is labelled accordingly, not presented as a platform profile link.
- Some passion-section phrasing still sounds broader than necessary for a cybersecurity hiring review; this is P2 and remains deferred.

## Performance findings

- The PR adds small HTML/CSS content, translation data, resilient UI copy handling and one focused Playwright test file.
- No new dependencies, frameworks, remote scripts, analytics or heavy assets were added.
- Existing images and external icon/font behavior were preserved.

## Security/privacy findings

- CSP, consent banner, Plausible opt-in behavior, external-link `rel` attributes and CyberDailyLog validation/safe text rendering were preserved.
- New links use `noopener noreferrer` where opened in a new tab.
- No tracking, cookies, private exports or generated artifacts were added.
- The private homelab repository URL is not exposed by the portfolio.

## SEO findings

- Existing title, meta description, canonical URL, Open Graph/Twitter metadata, JSON-LD, robots and sitemap were reviewed from source.
- The hero and project summaries include natural recruiter-relevant terms without keyword stuffing.
- No SEO architecture changes were necessary in this focused PR.

## EN/ES/CA findings

- Locale JSON files contain parity for the recruiter snapshot, hero CTAs, case-study labels, accessible group names and contact text.
- `assets/js/site-ux.js` installs matching in-bundle fallbacks so the new UI remains readable when locale JSON cannot be parsed.
- Translations were reviewed for natural professional wording rather than literal word-for-word equivalence.
- Stable `data-txt` keys remain the mechanism for visible UI translation; language changes also update the new `aria-label` values.

## Priority definitions

- **P0:** broken, unsafe or blocking.
- **P1:** high-value credibility, recruiter or UX improvement.
- **P2:** useful but non-essential refinement.

## P0 priorities

- None identified in the inspected source or PR diff.

## P1 priorities

1. Make the first screen recruiter-complete: role, location, remote/hybrid relevance, public proof, CV, GitHub, lab notes and contact.
2. Turn project evidence into compact case-study summaries that explain purpose, build, defensive relevance, evidence boundaries and current status.
3. Keep strongest proof-of-work ahead of generic project/tool inventories.
4. Keep all new visible and accessible copy functional in EN/ES/CA, including degraded locale-loading conditions.

## P2 priorities

1. Remove or consolidate obsolete duplicate UX files in a future cleanup after confirming no workflow or documentation references them.
2. Tighten passion-section language so it supports the security narrative without becoming a long interests section.
3. Extend automated responsive coverage to include 1024×768, 1440×900 and desktop zoom checks if CI runtime remains acceptable.
4. Publish a recruiter-safe version of the homelab documentation when it is ready for public review.

## Changes implemented in this PR

- Added a recruiter-first hero statement and direct links to projects, GitHub evidence, CV, public TryHackMe/Hack The Box lab notes and email.
- Added a semantic recruiter snapshot covering target role, location, public evidence and current AWS learning.
- Added compact case-study cards for CyberDailyLog and the Raspberry Pi defensive homelab.
- Clarified that CyberDailyLog is not a production SOC feed and that the detailed homelab repository remains private.
- Updated EN/ES/CA locale files for all new and changed visible and accessible copy.
- Added in-bundle recruiter-copy fallbacks and translated accessible labels in `assets/js/site-ux.js`.
- Added Playwright coverage for semantic structure, locale parity, fallback behavior, evidence boundaries, responsive containment, keyboard order and Axe serious/critical checks.

## Recommendations deliberately deferred

- Deleting duplicate legacy UX files: useful but riskier than necessary for this content-focused PR.
- Reordering the entire site navigation: potentially useful, but the current architecture is stable and tested.
- Redesigning certificates, tools or passion sections: lower priority than first-screen recruiter clarity and project credibility.
- Adding new dependencies or a framework rewrite: not justified.
- Publishing the private homelab repository without a separate privacy/content review: explicitly out of scope.

## Evidence and affected files

- PR base is remote `main` commit `36da04be708fcefe509f8819a5ba9d652ac7e6a0`, which contains the merged UX, CyberDailyLog and tested `gh-pages` publication work from PRs #22, #23 and #24.
- The PR is reviewed against its real GitHub branch and workflow rather than local-only Codex metadata.
- Authoritative files reviewed include `index.html`, `assets/css/style.css`, `assets/js/script.js`, `assets/js/translate.js`, `assets/js/cyberdailylog-feed.js`, `assets/js/site-ux.js`, `vite.config.ts`, `assets/locales/*.json`, data files, tests, `.github/workflows/site-qa-pages.yml`, `README.md` and existing documentation.
- Generated files that must not be edited directly: `dist/`, Playwright reports, test results and the `gh-pages` publication artifact.
