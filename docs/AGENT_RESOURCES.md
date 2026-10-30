# Agent Source Router v0.1 and portfolio project spotlight

This pilot adds a human-readable source index and a small JSON discovery catalogue, not a generic keyword doorway or a live crawling service.

## Portfolio presentation
- CyberDailyLog: featured CTI work and a fast internal gateway.
- Austrian Business Cycle Monitor: economic data and provenance, with a dedicated project brief.
- CyberSecurity 3D Lab: experimental, optional interactive 3D experience with a 2D alternative within the lab. Link: https://lab.jimblogic.chatgpt.site/. External availability has **not** been asserted.
- A compact three-column project navigation (one column on mobile) appears before the detailed portfolio projects. The 3D runtime is not embedded and therefore cannot slow down the main portfolio.
- Existing Homelab, portfolio, certification evidence and legal/privacy routes remain present.

## Routes and content
- `/agent-resources/`: statically renderable, human-readable source discovery.
- `/agent-resources/catalog.json`: 12 manually curated links with question, publisher, intent and limitation.
- `/llms.txt` and `/sitemap.xml`: discovery pointers, not ranking guarantees.
- Canonical domain: https://jimblogic.github.io/. The Sites mirror is for the same content, not an independent canonical.

## Safety and maintenance
- No proxy to external websites, no user-supplied URLs, no server APIs, no paid dependencies, no runtime crawling and no trackers.
- All external URLs are explicit and constrained by test allowlist. Sources remain owned by their publishers; reuse is subject to third-party conditions.
- Curated on 2026-10-30; **not** verified as a real-time source-health report. Link destinations can be changed or blocked by providers.
- CISA KEV, FIRST EPSS and NVD serve different evidentiary roles.
- Aim for genuinely useful discovery, not doorway-page SEO or artificial AI crawler traffic.

## Deployment gates
Run `npm run verify:mirror` in repo root, `npm test`, then `cd sites && npm run verify`. Check final HTML, metadata, keyboard navigation, responsive layout and both published domains after deployments. GitHub Pages deploys only after merge and the normal workflow. The `sites/` directory is a source mirror; **committing it does not publish ChatGPT Sites**. Apply the change using the supported Sites publishing interface and verify externally, separately.

Rollback: revert the feature PR. Other portfolio routes must remain accessible. No changes to CyberDailyLog, ABCM or 3D lab repositories or their deployed applications are included.
