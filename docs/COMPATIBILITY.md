# Compatibility and mirror contract

## Canonical source

This GitHub repository is the public, reproducible source for the portable portfolio interface. The ChatGPT Sites edition mirrors the same visible product surface: copy, translations, styles, project cards and the two `/labs/` routes.

Platform-specific adapters are intentionally not forced into one configuration:

| Target | Adapter | Output |
|---|---|---|
| GitHub Pages | Next.js static export | `out/` |
| Docker / Nginx | The same static export | `out/` served by Nginx |
| ChatGPT Sites | Vinext + Cloudflare-compatible Worker | Sites deployment artifact |

This split keeps the interface portable without pretending that GitHub Pages can execute a Worker runtime.

## Compatibility mode

Run the complete portable verification path with:

```bash
npm ci
npm run verify:mirror
```

`verify:mirror` lints the source, builds the static export and checks the homepage, certifications, both project briefs, crawl routes and stable public documents. The generated `out/` directory requires no Node.js server, database or secret at runtime.

## Mirror scope

The following paths must remain equivalent between GitHub and Sites:

- `app/page.tsx`
- `app/globals.css`
- `app/labs/LabPage.tsx`
- `app/labs/cyberdailylog/page.tsx`
- `app/labs/austrian-monitor/page.tsx`
- `public/llms.txt`

Metadata bases, build configuration, hosting manifests and deployment helpers are adapter-specific and may differ.

## Safe update sequence

1. Update the portable interface in this repository.
2. Run `npm run verify:mirror`.
3. Review the generated routes locally with `npm run start`.
4. Merge only after GitHub Actions passes.
5. Apply the same portable-surface change to Sites and verify its deployment independently.

No credentials, generated build directories or platform-owned deployment identifiers belong in the portable source.
