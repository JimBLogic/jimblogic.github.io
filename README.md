# JimBLogic cybersecurity portfolio

## Current professional profile · 16 November 2026

**Cybersecurity · Ethical Hacking · AWS Cloud**

UpgradeHub Cybersecurity, Ethical Hacking & Cloud bootcamp graduate (350 hours). Open to junior **Red Team / pentesting**, **Blue Team / threat intelligence** and **AWS cloud security** roles, with hands-on practice in authorised laboratories, Linux, Docker, web request inspection, automation and technical reporting.

- **Training evidence:** [UpgradeHub diploma](public/documents/UpgradeHub-Cert.pdf), [verifiable certificates and labs](https://github.com/JimBLogic/jimblogic.github.io/tree/main/app/certifications), [TryHackMe profile](https://tryhackme.com/p/JimBLogic).
- **Local lab evidence:** [Defensive Homelab WSL2 validation and limitations](https://github.com/JimBLogic/defensive-homelab-blue-team/pull/14).
- **Technical projects:** [CyberDailyLog](https://github.com/JimBLogic/CyberDailyLog), [Austrian Business Cycle Monitor](https://github.com/JimBLogic/AustrianBusinessCycleMonitor).
- **Additional portfolio host:** [portfolio.jimblogic.chatgpt.site](https://portfolio.jimblogic.chatgpt.site/). Its publication is independent of GitHub Pages; latest publication status should be verified on the live site.

**AWS status:** studying for CLF-C02; AIF-C01 attempted but not passed. AWS training badges are **not** official AWS certifications.

**Note for visitors:** GitHub Pages can temporarily show an older release when publishing is unavailable; this repository's `main` branch is the source of truth for the updated profile. No GitHub Actions billing or runner is required to read this documentation.

---

Recruiter-first portfolio for Jaime Ramsden de Frutos, presenting cybersecurity, ethical hacking, junior Red Team/pentesting, defensive security and AWS cloud foundations through verifiable evidence. This repository is the public, reproducible compatibility source for the GitHub Pages edition and the published ChatGPT Sites version. It supports English, Spanish and Catalan and produces one static artifact for GitHub Pages or self-hosting.

## Quick start

```bash
git clone https://github.com/JimBLogic/jimblogic.github.io.git
cd jimblogic.github.io
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Repository map

| Path | Purpose |
|---|---|
| `app/` | Next.js routes, portfolio content, SEO and styling |
| `app/certifications/` | Searchable certification explorer |
| `app/labs/` | Portable project briefs and gateways to the live applications |
| `public/images/` | Production portfolio imagery |
| `public/documents/` | Stable public CV and certificate routes |
| `docs/` | Architecture, development, deployment and rollback guides |
| `infra/nginx/` | Nginx configuration used by the self-hosted image |
| `scripts/` | Static artifact validation |
| `.github/workflows/` | Pull-request validation and GitHub Pages deployment |
| `Dockerfile` / `compose.yaml` | Standard zero-guesswork Docker entry points |

Files such as `package.json`, `next.config.ts`, `tsconfig.json`, PostCSS and ESLint intentionally remain in the repository root because their tools discover them there automatically.

## Commands

```bash
npm run dev       # local development
npm run lint      # source checks
npm test          # production build + artifact validation
npm run build:compat  # generate the portable static out/ artifact
npm run verify:mirror # lint, build and validate every mirrored route
npm run start     # preview the generated out/ directory
```

## Documentation

- [Architecture and content map](docs/ARCHITECTURE.md)
- [Development and validation](docs/DEVELOPMENT.md)
- [GitHub Pages and self-hosting](docs/DEPLOYMENT.md)
- [Compatibility and mirror contract](docs/COMPATIBILITY.md)

## Live versions

- GitHub Pages: <https://jimblogic.github.io/>
- ChatGPT Sites mirror: <https://portfolio.jimblogic.chatgpt.site/>

The UI, translations, portfolio content and lab routes match the published Sites version reviewed on 21 August 2026. Platform adapters remain deliberately separate: GitHub uses a static Next.js export, while Sites uses its Cloudflare-compatible runtime. This keeps the user-facing source equivalent without breaking GitHub Pages, localhost or the Docker/Nginx self-host path.

## Rollback archive

The exact pre-migration portfolio remains preserved in `archive/pre-sites-migration-2026-08-11`.

## License

MIT — see [LICENSE](LICENSE).

## Privacy and Sites mirror

The complete Sites source is in `sites/`. Run `npm run verify:mirror` to verify shared source, privacy and the static export. See [the privacy audit and reproduction instructions](docs/PRIVACY_AUDIT.md). The CV is served locally on both domains. The portfolio snapshot refresh is manual. Current daily editions are available on [CyberDailyLog](https://cyberdailylog.jimblogic.chatgpt.site/).
