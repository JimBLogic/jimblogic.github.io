import assert from "node:assert/strict";
import test from "node:test";
import { validatePageSeo, validateSitemap, internalReferences } from "../scripts/seo-validation.mjs";

const canonical = "https://jimblogic.github.io/agent-resources/";
function fixture({ canonicalTags = `<link rel="canonical" href="${canonical}">`, ogUrl = canonical,
  robots = "index, follow", entity = { "@type": "CollectionPage", url: canonical, dateModified: "2026-11-10" } } = {}) {
  return `<html><head><title>Source selection | JimBLogic</title>${canonicalTags}
    <meta name="description" content="Practical source selection with provenance.">
    <meta name="robots" content="${robots}"><meta property="og:url" content="${ogUrl}">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'">
    <script type="application/ld+json">${JSON.stringify(entity)}</script>
    </head><body><main><h1>Source selection</h1></main></body></html>`;
}
const check = html => validatePageSeo(html, "/agent-resources/", { pageType: "CollectionPage", now: new Date("2026-11-10T12:00:00Z") });

test("independent canonical and Open Graph metadata accepts Pages as the mirror's source", () => {
  assert.doesNotThrow(() => check(fixture()));
});

test("rejects missing, duplicate and contradictory canonicals", () => {
  assert.throws(() => check(fixture({ canonicalTags: "" })), /exactly one canonical/);
  assert.throws(() => check(fixture({ canonicalTags: `<link rel="canonical" href="${canonical}"><link rel="canonical" href="${canonical}">` })), /exactly one canonical/);
  assert.throws(() => check(fixture({ canonicalTags: '<link href="https://portfolio.jimblogic.chatgpt.site/agent-resources/" rel="canonical">' })), /conflicting canonical/);
  assert.throws(() => check(fixture({ ogUrl: "https://portfolio.jimblogic.chatgpt.site/agent-resources/" })), /Open Graph URL conflicts/);
});

test("rejects non-indexable pages, future review claims and misleading structured data", () => {
  assert.throws(() => check(fixture({ robots: "noindex, follow" })), /non-indexable/);
  assert.throws(() => check(fixture({ entity: { "@type": "CollectionPage", url: canonical, dateModified: "2099-01-01" } })), /future dateModified/);
  assert.throws(() => check(fixture({ entity: { "@graph": [
    { "@type": "CollectionPage", url: canonical }, { "@type": "AggregateRating", ratingValue: 5 },
  ] } })), /unsupported structured-data claim/);
  assert.throws(() => check(fixture({ entity: { "@type": "CollectionPage", url: "https://example.invalid/" } })), /must describe this canonical/);
  assert.throws(() => check(fixture().replace('{"@type"', '{bad"@type"')), SyntaxError);
});

test("rejects omitted, duplicate and noncanonical sitemap routes", () => {
  const xml = url => `<urlset><url><loc>${url}</loc><lastmod>2026-11-10</lastmod></url></urlset>`;
  const routes = ["/agent-resources/"];
  assert.doesNotThrow(() => validateSitemap(xml(canonical), routes));
  assert.throws(() => validateSitemap("<urlset></urlset>", routes), /must match/);
  assert.throws(() => validateSitemap(xml("https://portfolio.jimblogic.chatgpt.site/agent-resources/"), routes), /must match/);
  assert.throws(() => validateSitemap(xml(canonical).replace("</urlset>", `<url><loc>${canonical}</loc></url></urlset>`), routes), /Duplicate/);
  assert.throws(() => validateSitemap(xml(canonical).replace("2026-11-10", "2099-01-01"), routes), /future sitemap/);
});

test("discovers real relative asset and navigation references without treating external links as local", () => {
  assert.deepEqual(internalReferences('<a href="/labs/3d-lab/">Brief</a><a href="https://example.org/">Publisher</a><a href="//example.org/">Publisher</a><img src="/images/example.webp"><script src="/_next/static/chunk.js"></script><link href="/agent-resources/catalog.json?format=1&amp;v=1" rel="alternate">'),
    ["/labs/3d-lab/", "/agent-resources/catalog.json?format=1&v=1", "/_next/static/chunk.js", "/images/example.webp"]);
});
