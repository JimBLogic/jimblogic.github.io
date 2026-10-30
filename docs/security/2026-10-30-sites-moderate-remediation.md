# Sites moderate dependency remediation — 2026-10-30

Scope: portfolio Sites appgprj_6a633d89a6988191b5cdd97f66176ab2 and its
source mirror in JimBLogic/jimblogic.github.io/sites. Baselines: Sites
b091ab15e8122a5137d864284d2b52e8a4b08729 (v26), GitHub main
be21bb1753dc8abcd68d56bd233cb0679f7783d5. The commit containing this
report identifies the remediation. No unrelated Site or deployed database changed.

## Confirmed findings

The eight moderate npm audit nodes represent two vulnerable leaf packages:

| Root cause | Affected chain | Evidence | Remediation |
| --- | --- | --- | --- |
| fflate unzipSync malformed ZIP64 infinite loop | Vinext → @vercel/og → Satori → fflate 0.7.3 | GHSA-px8p-9vwx-vf98; npm audit; npm ls | Scoped Satori override to fflate 0.7.5 |
| esbuild development-server cross-origin disclosure | drizzle-kit → @esbuild-kit/esm-loader → @esbuild-kit/core-utils → esbuild 0.18.20 | GHSA-67mh-4wv8-2f99; npm audit; npm ls | Scoped core-utils override to esbuild 0.25.12 |

Severity: moderate, confidence: high for installed dependency versions. These
chains do not prove an exploitable deployed portfolio endpoint. The site does
not expose a development server or use ImageResponse routes. Patching avoids
retaining vulnerable parsers/tooling and removes the inherited audit findings.

Primary references:
- https://github.com/advisories/GHSA-px8p-9vwx-vf98
- https://github.com/advisories/GHSA-67mh-4wv8-2f99

Both overrides are limited to their immediate consumers. Unrelated esbuild
instances remain on their resolved patched versions. No global major-version
replacement, audit suppression, or npm audit fix --force is used.

## Verification

- npm audit, full tree including development dependencies: **0 vulnerabilities**.
- npm ls: Satori/OpenType resolve fflate 0.7.5; the legacy Drizzle loader resolves
  esbuild 0.25.12. Vite/Wrangler resolve esbuild 0.28.2.
- Three compatibility tests: Unicode ZIP round-trip via Satori's dependency,
  synchronous/asynchronous TypeScript transformation through core-utils,
  and Satori SVG text rendering with the bundled font.
- Local Drizzle generation from the example schema succeeds in an ignored
  test directory. No generated SQL is applied or published as a migration.
- Full production Worker build, six privacy/claims tests, five rendered
  workerd tests, artifact validation, and dependency security floors pass.
- Shared public content remains identical between GitHub and its tracked
  Sites mirror (33 files).

The build now runs the compatibility tests. The dependency guard additionally
rejects vulnerable fflate and esbuild versions, including the separate esbuild
0.27.3–0.28.0 Windows advisory range.

An extra diagnostic attempting the optional @vercel/og Node PNG wrapper failed
inside its bundled dynamic require of fs. That unchanged upstream package is
not used by the portfolio; it is not reported as a passed test. The direct
Satori rendering test and production portfolio Worker tests pass. Browser/mobile
interaction and optional dynamic OG routes remain NOT TESTED.

Status: corrected source and locally verified artifact. Publication state must
be checked against the saved version/deployment; this report alone does not
establish that production has received the correction.
