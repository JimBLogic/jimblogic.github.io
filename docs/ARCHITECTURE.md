# Architecture

## Delivery model

The portfolio uses Next.js 16, React 19 and TypeScript, but its production output is fully static. `next build` creates the deployable `out/` directory; no application server or database is required.

The same artifact is used by both supported deployment paths:

1. GitHub Actions uploads `out/` to GitHub Pages.
2. Docker copies `out/` into a small Nginx runtime image.

This prevents the GitHub and self-hosted editions from drifting into separate applications.

## Runtime behavior

- English, Spanish and Catalan copy is bundled in `app/page.tsx`.
- CyberDailyLog fetches its public GitHub snapshot in the browser and falls back safely to static portfolio data.
- Language preference and the short-lived CyberDailyLog cache use browser storage only.
- The certification explorer filters 37 verifiable records client-side.
- Images and public documents are served directly from `public/`.

## Content ownership

| Content | Source |
|---|---|
| Main copy, projects and translations | `app/page.tsx` |
| Certifications | `app/certifications/page.tsx` |
| Responsive design | `app/globals.css` |
| Certification design | `app/certifications/certifications.css` |
| SEO and JSON-LD | `app/layout.tsx` |
| Crawl discovery | `app/robots.ts`, `app/sitemap.ts` |
| Images | `public/images/` |
| CV and selected evidence | `public/documents/` |

## Stable public routes

The following paths are part of the public contract and must not be renamed without redirects or coordinated link updates:

- `/`
- `/certifications/`
- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`
- `/llms.txt`
- `/images/jaime-ramsden.webp`
- `/images/generic-sbc-homelab.webp`
- `/documents/Jaime-Ramsden-de-Frutos-CV.pdf`
- `/documents/UpgradeHub-Cert.pdf`
