# JimBLogic Portfolio

Production source for Jaime Ramsden de Frutos' cybersecurity portfolio at <https://jimblogic.github.io/>.

## Positioning

The site presents Jaime as a **Junior SOC Analyst / Blue Team candidate** with practical, junior-appropriate proof of work:

- defensive Raspberry Pi 4 homelab work in progress;
- Linux, Docker, networking, monitoring, logs, backups and hardening practice;
- digital forensics, incident response, OSINT and threat-intelligence foundations;
- AWS Cloud Practitioner candidate / AWS cloud foundations;
- Bitcoin-orange JimBLogic identity, avatar, CV, location, email and social links.

Sports Science is intentionally kept as education/background only and not used as a cybersecurity claim.

## Runtime functionality

The portfolio is a Vite-built static site with client-side enhancements:

- EN / ES / CA translations via `assets/js/translate.js` and `assets/locales/*.json`;
- dynamic certificate loading from `certificates.json`, including issuer filters and per-certificate evidence links to GitHub viewers or official issuers;
- dynamic software and tools lists from `software.json` and `tools.json`;
- dynamic GitHub repository fetching from the public GitHub REST API, cached in `sessionStorage` for one hour;
- CSP, canonical URL, Open Graph metadata, Twitter metadata and JSON-LD structured data in `index.html`;
- opt-in Plausible analytics banner.

## Main files

- `index.html` — page structure, metadata, JSON-LD, navigation and static content hooks.
- `assets/css/style.css` — production styling and responsive layout.
- `assets/js/script.js` — certificate rendering, GitHub project rendering, navigation, consent and UI behavior.
- `assets/js/translate.js` — built-in translations plus JSON locale loading.
- `assets/locales/en.json`, `assets/locales/es.json`, `assets/locales/ca.json` — external translation dictionaries.
- `certificates.json`, `software.json`, `tools.json` — dynamic data sources.
- `assets/pdfs/` and `assets/Images/` — source evidence and media; the Pages build publishes only explicitly allowlisted assets, including the linked CV.

## Development

Install dependencies:

```bash
npm ci
```

Run a local development server:

```bash
npm run dev
```

Build the production bundle:

```bash
npm run build
```

Preview the built site:

```bash
npm run preview
```

## Validation checklist

Run the same source and generated-artifact validation used by CI:

```bash
npm test
npm run test:validator-refs
npm run validate:version
npm run validate:privacy
npm run test:e2e:ci
git diff --check
```

Install Playwright's Chromium browser once before the end-to-end command with `npx playwright install chromium`.

## Deployment

`.github/workflows/site-qa-pages.yml` is the deployment authority. Pull requests build and validate the site without deploying it. A successful push to `main` uploads the exact tested `dist/` artifact to GitHub Pages and then audits the live build version and public resources.

## License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE) for details.

## Contact

Professional email: <jrf91@pm.me>

## QA and deployment

See [docs/qa-and-deployment.md](docs/qa-and-deployment.md) for local validation, browser QA, production auditing, and gated GitHub Pages deployment.
