# Portfolio professional audit — 2026-07-17

## Executive summary

The portfolio is a solid junior cybersecurity site: it is static, multilingual, privacy-conscious and backed by GitHub-visible work. The main recruiter risk was not a broken feature, but first-impression clarity. The live page explained the homelab and learning path, but the first screen did not immediately group target role, location, opportunity type, strongest evidence, CV, GitHub and TryHackMe/HackTheBox links into a single recruiter path.

This PR keeps the existing Vite/GitHub Pages architecture, CyberDailyLog integration, CSP, consent banner, scrollspy/sidebar behavior and EN/ES/CA support. It adds a focused recruiter snapshot, stronger hero calls to action, compact project case-study summaries and a documented audit.

## Current strengths

- Static Vite portfolio with GitHub Pages deployment and tested artifact workflow.
- Clear junior positioning as a SOC / Blue Team candidate rather than an employed analyst.
- CyberDailyLog is a strong proof-of-work item because it combines automation, source-backed reporting, validation and safe fallback behavior.
- The site already includes EN, ES and CA content, CV links, certificate data, GitHub project loading and privacy-conscious analytics consent.
- Existing Playwright and Axe tests cover accessibility, responsive behavior, CyberDailyLog live/fallback states and core interactions.

## Recruiter risks

- **P1:** The hero did not answer the full recruiter checklist within ten seconds: target role, location, remote/hybrid relevance, strongest evidence, CV, GitHub and TryHackMe/HackTheBox were split across the page.
- **P1:** Project evidence was too dependent on a generic GitHub repo list. Recruiters and interviewers need a short explanation of purpose, what was built, defensive relevance and honest status.
- **P2:** Certificates and tools are useful, but they should not compete visually with stronger proof-of-work items.

## Technical risks

- **P1:** `assets/js/scroll-sidebar-ux.js` remains in the repository as an older implementation while `assets/js/site-ux.js` is the loaded implementation. It is not loaded by `index.html`, but it is a source of future confusion.
- **P2:** Runtime project data depends on the GitHub API. The current fallback is acceptable, but the featured manual project summaries should carry the recruiter story even if the API is unavailable.
- **P2:** `npm ci` could not complete in this environment because the registry returned HTTP 403 for `@axe-core/playwright`; this blocked local full test execution here, not necessarily CI.

## Accessibility findings

- Existing structure uses skip link, main landmark, semantic sections, buttons and visible focus styles.
- Existing Axe test targets serious and critical violations; this PR does not weaken exclusions or suppress errors.
- New recruiter snapshot uses a semantic description list, and new case studies use headings, lists and ordinary links.
- No P0 accessibility blockers were identified from source review.

## Responsive findings

- Existing responsive suite covers 320×568, 390×844, 768×1024, 1366×768 and 1920×1080 across EN/ES/CA.
- Requested manual viewport list is broader than the existing automated list; audit review did not identify a source-level blocker, but local browser verification was limited by dependency installation failure.
- New proof and case-study grids collapse to one column below 760px to avoid horizontal overflow and preserve mobile readability.

## Content findings

- The current copy is generally honest and junior-appropriate.
- The hero needed stronger recruiter-first wording and explicit opportunity intent.
- Some passion-section phrasing on the live page still sounds broader than necessary for a cybersecurity hiring review; this is P2 and was deferred to keep the PR focused.
- Education copy should avoid implying professional incident-response experience; existing text is acceptable but could be tightened further later.

## Performance findings

- The PR adds only small HTML/CSS content and one focused Playwright test file.
- No new dependencies, frameworks, remote scripts, analytics or heavy assets were added.
- Existing images and external icon/font behavior were preserved.

## Security/privacy findings

- CSP, consent banner, Plausible opt-in behavior, external-link `rel` attributes and CyberDailyLog validation/safe text rendering were preserved.
- New links use `noopener noreferrer` where opened in a new tab.
- No tracking, cookies, private exports or generated artifacts were added.

## SEO findings

- Existing title, meta description, canonical URL, Open Graph/Twitter metadata, JSON-LD, robots and sitemap were reviewed from source.
- The hero and project summaries now include natural recruiter-relevant terms without keyword stuffing.
- No SEO architecture changes were necessary in this focused PR.

## EN/ES/CA findings

- Locale JSON files are authoritative for runtime translations and now include parity for the recruiter snapshot, hero CTAs, case-study labels and contact text.
- Translations were written as natural professional copy rather than literal word-for-word translations.
- Stable `data-txt` keys remain the mechanism for UI translation.

## Priority definitions

- **P0:** broken, unsafe or blocking.
- **P1:** high-value credibility, recruiter or UX improvement.
- **P2:** useful but non-essential refinement.

## P0 priorities

- None identified in the inspected source.

## P1 priorities

1. Make the first screen recruiter-complete: role, location, remote/hybrid relevance, proof, CV, GitHub, TryHackMe/HackTheBox and contact.
2. Turn project evidence into compact case-study summaries that explain purpose, build, defensive relevance, evidence and current status.
3. Keep strongest proof-of-work ahead of generic project/tool inventories.

## P2 priorities

1. Remove or consolidate obsolete duplicate UX files in a future cleanup after confirming no workflow or documentation references them.
2. Tighten passion-section language so it supports the security narrative without becoming a long interests section.
3. Extend automated responsive coverage to include 1024×768, 1366×650, 1440×900 and desktop zoom checks if CI runtime remains acceptable.

## Changes implemented in this PR

- Added a recruiter-first hero statement and direct links to projects, GitHub evidence, CV, TryHackMe/HackTheBox and email.
- Added a semantic recruiter snapshot covering target role, location, best evidence and current learning.
- Added compact case-study cards for CyberDailyLog and the Raspberry Pi defensive homelab.
- Updated EN/ES/CA locale files for all new and changed visible copy.
- Added Playwright coverage for the recruiter snapshot, hero proof links and honest project case-study status.

## Recommendations deliberately deferred

- Deleting duplicate legacy UX files: useful but riskier than necessary for this content-focused PR.
- Reordering entire site navigation: could be valuable, but the current architecture is stable and tested.
- Redesigning certificates, tools or passion sections: lower priority than first-screen recruiter clarity and project credibility.
- Adding new dependencies or a framework rewrite: not justified.

## Evidence and affected files

- Latest remote `main` was verified through the GitHub commits page as commit `36da04b` dated 2026-07-16. Local `git fetch` could not reach GitHub because the environment returned `CONNECT tunnel failed, response 403`.
- Current production at `https://jimblogic.github.io/` was inspected and showed the pre-PR hero copy, CyberDailyLog section and existing recruiter flow.
- Authoritative files reviewed: `index.html`, `assets/css/style.css`, `assets/js/script.js`, `assets/js/translate.js`, `assets/js/cyberdailylog-feed.js`, `assets/js/site-ux.js`, `vite.config.ts`, `assets/locales/*.json`, `certificates.json`, `software.json`, `tools.json`, `tests/*.spec.js`, `.github/workflows/site-qa-pages.yml`, `README.md` and existing docs.
- Generated files that must not be edited directly: `dist/`, Playwright reports, test results and the `gh-pages` publication artifact.
