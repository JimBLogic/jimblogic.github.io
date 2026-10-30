# Portfolio framework security update — 2026-10-30

Scope: JimBLogic/jimblogic.github.io (GitHub Pages static export) and
Sites appgprj_6a633d89a6988191b5cdd97f66176ab2 (public portfolio Worker).
Other projects, including the independent 3D Lab, were not modified.

## Evidence and exposure

Reviewed source bases: GitHub main commit
4f7c424f7c211dbf43be734cff40f0e11df69b4e; Sites commit
dc312910af9d7c40cf7a380b75dd4274b8372ce5. The final remediation commit is
the commit containing this report (and its corresponding Sites source commit).

Primary sources retrieved directly over HTTPS:

- https://nextjs.org/blog/nextjs-security-update-october-14-2026
- https://github.com/react/react/security/advisories/GHSA-xqc2-xf4c-x3h3
- https://github.com/react/react/security/advisories/GHSA-h3gv-c5rc-p453

The Next.js notice fixes critical cache/RSC RCE, critical image processing RCE,
and high Server Actions DoS. React RSC fixes include 19.2.9 and 19.3.1.
Installed vulnerable versions are confirmed; exploitability of the deployed
portfolio has NOT been demonstrated. Confidence in the dependency finding: high.

GitHub uses output: export and deploys only out/. It has no deployed Next.js
server, Server Action handler, or image optimization server. Do not describe
these server vulnerabilities as an equivalent remote exploit on GitHub Pages.
Build and dependency maintenance still apply.

Sites uses Vinext, the Vite RSC plugin, and Cloudflare Workers. Treat its RSC
runtime separately. The glibc/sharp Next.js image-server scenario cannot be
assumed for a Worker. No application use-server or use-cache directive was
found. This limits known reachability; it does not replace patching.

## Remediation

- Next.js / eslint-config-next: 16.2.6 → 16.4.3.
- React / React DOM / explicit RSC package: 19.2.6 → 19.3.1.
- Sites Vite RSC plugin: 0.5.26 → 0.5.38; inspected its bundled RSC package,
  which is also 19.3.1. Merely updating the explicit RSC dependency is insufficient.
- Sites Vinext: 0.0.50 → 1.4.0; Vite: 8.0.13 → 8.3.5;
  Cloudflare plugin: 1.37.1 → 1.66.0; Wrangler: 4.92.0 → 4.154.0.
- Regenerated integrity-pinned locks and applied compatible transitive patches.
- Build guard checks the lock, sharp >=0.35.5, and the actual bundled RSC copy.
- Worker feed now uses redirect: manual and rejects non-2xx responses. workerd
  rejects redirect: error; the prior Node-only test missed this runtime defect.
- Rendered checks now execute the built Worker in Miniflare/workerd with
  controlled outbound responses, including visitor-header isolation and redirects.

## Verification and limits

PASS: GitHub lint, shared-content mirror hashes (33 files), six privacy/claims
tests, Next.js static build, and 12 artifact checks covering all five HTML routes.
PASS: Sites privacy/claims tests, production Worker build and artifact checks;
five rendered workerd tests cover all five HTML routes, security headers, canonicals,
metadata, discovery routes, and public-feed privacy.
PASS: October advisory version floors, including vendor copy.

npm audit snapshot: GitHub 0 vulnerabilities; Sites 0 critical / 0 high /
8 moderate. Sites remaining audit nodes are esbuild, @esbuild-kit/core-utils,
@esbuild-kit/esm-loader, drizzle-kit, fflate, satori, @vercel/og, and vinext.
These are transitive chains, not eight independent confirmed deployed exploits.
The esbuild advisory concerns the development server; the fflate chain needs
separate reachability review. Do not force npm's proposed older major versions
as a purported security fix. Overall residual dependency status: DEGRADED.

Browser interaction/mobile QA and intrusive exploitation: NOT TESTED in this
dependency-only change. Local workerd checks do not establish production state.
Production deployment and GitHub merge remain pending explicit user approval.
