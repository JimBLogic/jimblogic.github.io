# JimBLogic cybersecurity portfolio

Recruiter-first portfolio for Jaime Ramsden de Frutos, focused on verifiable Junior SOC / Blue Team proof of work. It mirrors the current ChatGPT Sites design, supports English, Spanish and Catalan, and builds as one static artifact for GitHub Pages or self-hosting.

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
npm run start     # preview the generated out/ directory
```

## Documentation

- [Architecture and content map](docs/ARCHITECTURE.md)
- [Development and validation](docs/DEVELOPMENT.md)
- [GitHub Pages and self-hosting](docs/DEPLOYMENT.md)

## Live versions

- GitHub Pages: <https://jimblogic.github.io/>
- ChatGPT Sites mirror: <https://jimblogic-portfolio-lab.jimblogic.chatgpt.site/>

## Rollback archive

The exact pre-migration portfolio remains preserved in `archive/pre-sites-migration-2026-08-11`.

## License

MIT — see [LICENSE](LICENSE).
