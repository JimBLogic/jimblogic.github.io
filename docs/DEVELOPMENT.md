# Development and validation

## Requirements

- Node.js 22 or newer.
- npm 10 or newer.

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Reproduce production

```bash
npm ci
npm run lint
npm test
```

`npm test` builds the static site into `out/` and validates:

- the homepage and certification route;
- canonical SEO and structured data;
- `robots.txt`, `sitemap.xml`, manifest and `llms.txt`;
- the stable CV and UpgradeHub certificate paths.

Preview that exact artifact with:

```bash
npm run start
```

## Safe content updates

1. Create a branch from `main`.
2. Edit only the relevant source or public asset.
3. Preserve the stable routes listed in [ARCHITECTURE.md](ARCHITECTURE.md).
4. Run `npm run lint` and `npm test`.
5. Open a pull request and let GitHub Actions repeat the checks.

Generated directories (`.next/` and `out/`) are intentionally ignored and must not be committed.
