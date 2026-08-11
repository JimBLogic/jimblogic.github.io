# JimBLogic cybersecurity portfolio

Recruiter-first portfolio for Jaime Ramsden de Frutos, focused on verifiable Junior SOC / Blue Team proof of work. The site is multilingual (English, Spanish and Catalan), statically exported, deployable to GitHub Pages and packaged for self-hosting.

## Architecture

- Next.js 16 App Router with React 19 and TypeScript.
- Static export to `out/`; no application server or database is required.
- Dynamic CyberDailyLog data is fetched client-side from its public GitHub snapshot, with safe static fallbacks when unavailable.
- GitHub Pages deployment through Actions.
- Optional Docker + Nginx deployment for a VPS, NAS, Raspberry Pi or homelab.
- SEO includes canonical metadata, Open Graph, Twitter cards, JSON-LD, `robots.txt`, `sitemap.xml`, manifest and `llms.txt`.

## Requirements

- Node.js 22 or newer.
- npm 10 or newer.
- Docker with Compose only when using the container path.

## Run locally

```bash
git clone https://github.com/JimBLogic/jimblogic.github.io.git
cd jimblogic.github.io
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Reproduce the production build

```bash
npm ci
npm run lint
npm test
```

`npm test` creates the static site in `out/` and validates the homepage, certifications route, crawl files and preserved PDF evidence. Preview that exact artifact with:

```bash
npm run start
```

## Deploy with GitHub Pages

1. Open **Settings → Pages** in the repository.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Merge the migration pull request into `main`.
4. The `Build and deploy portfolio` workflow validates and publishes `out/`.
5. Confirm `https://jimblogic.github.io`, `/robots.txt`, `/sitemap.xml` and `/certifications/`.

Pull requests run the same lint, build and artifact checks without deploying. Pushes to `main` deploy only after validation passes.

## Self-host with Docker

Build and start the hardened static container:

```bash
docker compose up -d --build
docker compose ps
```

Open `http://localhost:8080`. Stop it with `docker compose down`.

The container serves only the generated static files, runs with a read-only filesystem, disables privilege escalation and exposes a health check. For internet access, place it behind Caddy, Traefik, Nginx Proxy Manager or another TLS reverse proxy and point your domain to that proxy.

## Self-host without Docker

```bash
npm ci
npm run build
```

Serve the `out/` directory from any static server. Example Nginx document root:

```text
/var/www/jimblogic-portfolio/out
```

Use `deploy/nginx.conf` as a reproducible reference for routing and baseline security headers.

## Updating content

- Main copy, languages, projects and links: `app/page.tsx`.
- Certifications: `app/certifications/page.tsx`.
- Global styling and responsive layout: `app/globals.css`.
- SEO and structured data: `app/layout.tsx`.
- Static images and documents: `public/`.

After every update, run `npm run lint && npm test` before opening a pull request.

## Rollback and archive

The pre-migration portfolio is preserved in the branch:

```text
archive/pre-sites-migration-2026-08-11
```

That branch points to the exact final legacy commit before this Next.js migration. To inspect or restore it:

```bash
git fetch origin
git switch archive/pre-sites-migration-2026-08-11
```

The migration is developed independently on `agent/reproducible-sites-portfolio`; `main` remains untouched until the pull request is explicitly merged.

## License

MIT — see `LICENSE`.
