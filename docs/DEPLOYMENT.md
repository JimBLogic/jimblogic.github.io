# Deployment and self-hosting

Both deployment methods serve the same generated `out/` directory.

## GitHub Pages

1. In the repository, open **Settings → Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Merge a validated pull request into `main`.
4. The `Build and deploy portfolio` workflow installs locked dependencies, lints, builds, validates and deploys.
5. Verify:
   - <https://jimblogic.github.io/>
   - <https://jimblogic.github.io/certifications/>
   - <https://jimblogic.github.io/labs/cyberdailylog/>
   - <https://jimblogic.github.io/labs/austrian-monitor/>
   - <https://jimblogic.github.io/robots.txt>
   - <https://jimblogic.github.io/sitemap.xml>

Pull requests validate without deploying. Only successful pushes to `main` publish.

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
