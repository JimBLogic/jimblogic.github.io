# Deployment and self-hosting

The root application generates a portable static `out/` directory. The source repository is updated through ordinary commits and pull requests, **without requiring GitHub Actions**. Cloudflare Pages or another static host can deploy `out/`; ChatGPT Sites publishes its independent `sites/` build through the native Sites editor.

## Historical GitHub Pages URL

`https://jimblogic.github.io/` may continue serving its last successful GitHub Pages deployment, but **commits to `main` do not update that URL** while GitHub Actions publishing is unavailable. Do not describe source merges as live deployments. The legacy workflow is manual-only to stop automatic failed runs.

Verify the existing URL only as a historical mirror (not proof of the latest release):
   - <https://jimblogic.github.io/>
   - <https://jimblogic.github.io/certifications/>
   - <https://jimblogic.github.io/labs/cyberdailylog/>
   - <https://jimblogic.github.io/labs/austrian-monitor/>
   - <https://jimblogic.github.io/robots.txt>
   - <https://jimblogic.github.io/sitemap.xml>

Pull requests and pushes update repository code only. For new releases, validate locally and publish via Sites or a separate free static host; verify live output before switching recruiter links.

## Docker Compose

```bash
docker compose up -d --build
docker compose ps
```

Open `http://localhost:8080`. Stop the service with:

```bash
docker compose down
```

The multi-stage image:

- creates and validates the static artifact with Node 22;
- copies only `out/` into Nginx;
- serves on port `8080`;
- uses a read-only filesystem and `no-new-privileges`;
- includes an HTTP health check.

The Nginx policy is stored in `infra/nginx/default.conf`.

## Static hosting without Docker

```bash
npm ci
npm run build:compat
npm run validate
```

Serve `out/` using any static host. For a traditional Nginx server, copy the directory beneath your web root and adapt `infra/nginx/default.conf` to the chosen domain and filesystem path.

## Public internet deployment

Place the container behind a TLS reverse proxy such as Caddy, Traefik, Nginx Proxy Manager or an existing Nginx installation. Point the domain DNS record to the host and proxy HTTPS traffic to port `8080`; do not expose a development server.

## Rollback

The pre-Next.js portfolio is preserved at:

```text
archive/pre-sites-migration-2026-08-11
```

To inspect it locally:

```bash
git fetch origin
git switch archive/pre-sites-migration-2026-08-11
```

For a production rollback, create a dedicated rollback branch or revert the relevant merge on `main`, validate it, and use the normal pull-request workflow. Avoid force-pushing `main`.
