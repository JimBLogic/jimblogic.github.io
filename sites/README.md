# JimBLogic Portfolio

Source for Jaime Ramsden de Frutos' multilingual cybersecurity portfolio: Junior SOC, Blue Team, cloud security and practical automation.

The `main` branch is the canonical reproducible mirror of the version published through ChatGPT Sites. The same application can run locally or in a self-hosted container without rewriting the portfolio into a second codebase.

## What is included

- Recruiter-first portfolio in English, Spanish and Catalan
- Auditable project summaries for CyberDailyLog, Defensive Homelab and Austrian Business Cycle Monitor
- Searchable credential catalogue
- Responsive and keyboard-accessible navigation
- Production metadata, sitemap, manifest, structured data and security headers
- Local production validation and Docker self-hosting

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Main portfolio and proof-of-work path |
| `/certifications` | Searchable learning evidence |
| `/labs/cyberdailylog` | CyberDailyLog project brief and live gateway |
| `/labs/austrian-monitor` | Austrian Business Cycle Monitor project brief and live gateway |
| `/robots.txt` | Crawl policy |
| `/sitemap.xml` | Search discovery |
| `/manifest.webmanifest` | Installable-site metadata |

## Requirements

- Node.js 22.13 or newer
- npm 10 or newer
- Linux, WSL 2 or Docker for the verified production scripts

## Run on localhost

Install the exact locked dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev -- --host 0.0.0.0 --port 3000
```

Open `http://localhost:3000`.

## Verify the production source

Run the same lint, build, rendered-route and artifact checks used before publication:

```bash
npm run verify
```

The build must produce:

- `dist/server/index.js`, with an ESM default `fetch(request, env, ctx)` handler
- `dist/.openai/hosting.json`
- the client assets required by the rendered routes

Run the verified production server locally:

```bash
npm run start
```

By default it listens on `0.0.0.0:3000`. Override with `HOST` and `PORT`.

## Self-host with Docker

Build and start the portfolio:

```bash
docker compose up --build -d
```

Open `http://localhost:3000`. To expose another host port:

```bash
PORT=8080 docker compose up --build -d
```

The container runs as the unprivileged `node` user and includes a health check against the portfolio root.

## Deployment model

```text
main source
  ├─ ChatGPT Sites checkpoint
  ├─ localhost development / production
  └─ Docker self-host
```

ChatGPT Sites uses `.openai/hosting.json` only to identify the Sites project. Local and Docker execution do not require a ChatGPT sign-in or external database. The CyberDailyLog live snapshot is an optional public fetch with a static fallback, so the portfolio remains useful if that feed is unavailable.

## Security and privacy notes

- No credentials or private environment values are committed.
- External links use `noopener noreferrer` where a new tab is opened.
- The Worker applies CSP, frame, MIME, referrer and permissions headers.
- Public project evidence is deliberately separated from sensitive lab data.

## Source layout

- `app/` — pages, content, metadata and styles
- `public/` — local images, icons and machine-readable portfolio context
- `worker/` — production security-header wrapper
- `tests/` — rendered route, metadata and security checks
- `scripts/` — deterministic install, build and artifact validation
- `.openai/hosting.json` — Sites project identity

## License and personal content

The code may be inspected and reused as a technical reference. Jaime Ramsden de Frutos' name, portrait, CV and personal career content are not granted for impersonation or republication as another person's portfolio.
