# Compatibility and mirror contract

The root is the GitHub Pages static export; `sites/` contains the complete Sites Worker source. All root application pages, helpers and public assets are mirrored byte for byte. The Sites-only authentication helper remains unused and is not a public route.

| Target | Runtime | Output |
|---|---|---|
| GitHub Pages | Next.js static export | `out/` |
| Docker / Nginx | The same static export | `out/` |
| ChatGPT Sites | Vinext / Cloudflare-compatible Worker | `sites/dist/` |

Run `npm ci` then `npm run verify:mirror`. To verify the Sites adapter, run `npm ci` and `npm run verify` in `sites/`. The two lockfiles and build configurations remain adapter-specific.

The canonical origin is https://jimblogic.github.io/ on both publications. Each content route has its own canonical URL. The source snapshot preserves the existing Sites project identity; credentials and generated output are excluded. Forks must register their own Site identity.

A GitHub push publishes Pages through Actions. Sites publication uses the native Sites workflow after checking the same application source. Daily public feed updates are mirrored in source and served by Sites through its own server, without browser calls to GitHub.

See [the privacy inventory and deployment procedure](PRIVACY_AUDIT.md).
