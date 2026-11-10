import assert from "node:assert/strict";

export const canonicalOrigin = "https://jimblogic.github.io";
export const portfolioRoutes = [
  "/", "/certifications/", "/privacy/", "/labs/cyberdailylog/",
  "/labs/austrian-monitor/", "/labs/3d-lab/", "/agent-resources/",
];

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/gs)]
    .map(([, name, , value]) => [name.toLowerCase(), value.replaceAll("&amp;", "&")]));
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(([tag]) => attributes(tag));
}

export function structuredEntities(html) {
  const entities = [];
  function visit(value) {
    if (!value || typeof value !== "object") return;
    if (value["@type"]) entities.push(value);
    for (const child of Object.values(value)) {
      if (Array.isArray(child)) child.forEach(visit);
      else if (child && typeof child === "object") visit(child);
    }
  }
  for (const [, opening, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (attributes(opening).type === "application/ld+json") visit(JSON.parse(body));
  }
  return entities;
}

function hasType(entity, type) {
  return [entity["@type"]].flat().includes(type);
}

export function validatePageSeo(html, route, { pageType, now = new Date() } = {}) {
  const canonical = new URL(route, canonicalOrigin).href;
  const links = tags(html, "link").filter(tag => tag.rel?.split(/\s+/).includes("canonical"));
  assert.equal(links.length, 1, `${route}: exactly one canonical required`);
  assert.equal(links[0].href, canonical, `${route}: conflicting canonical`);

  const meta = tags(html, "meta");
  const ogUrls = meta.filter(tag => tag.property === "og:url");
  assert.equal(ogUrls.length, 1, `${route}: exactly one Open Graph URL required`);
  assert.equal(ogUrls[0].content, canonical, `${route}: Open Graph URL conflicts with canonical`);
  assert.ok(meta.some(tag => tag.name === "description" && tag.content?.trim()), `${route}: description required`);
  for (const tag of meta.filter(tag => ["robots", "googlebot"].includes(tag.name))) {
    assert.doesNotMatch(tag.content ?? "", /\b(?:noindex|none)\b/i, `${route}: unexpectedly non-indexable`);
  }
  assert.match(html, /<title>[^<]+<\/title>/i, `${route}: title required`);
  assert.ok(meta.some(tag => tag["http-equiv"]?.toLowerCase() === "content-security-policy"), `${route}: CSP missing`);
  assert.doesNotMatch(html, /fonts\.googleapis\.com|googletagmanager\.com|codex-preview/i, `${route}: unexpected third-party or preview content`);

  const entities = structuredEntities(html);
  for (const entity of entities) {
    for (const field of ["dateModified", "datePublished"]) {
      if (entity[field]) {
        const date = new Date(entity[field]);
        assert.ok(Number.isFinite(date.getTime()) && date <= now, `${route}: invalid or future ${field}`);
      }
    }
  }
  if (pageType) {
    const page = entities.find(entity => hasType(entity, pageType) && entity.url === canonical);
    assert.ok(page, `${route}: ${pageType} must describe this canonical page`);
    // These pages publish editorial source guidance and a project brief; they
    // contain no answered FAQ, ratings, credential awards or measured results.
    for (const entity of entities) {
      assert.ok(!["FAQPage", "AggregateRating", "Review", "EducationalOccupationalCredential"].some(type => hasType(entity, type)),
        `${route}: unsupported structured-data claim`);
    }
  }
  return entities;
}

export function validateSitemap(xml, routes = portfolioRoutes, now = new Date()) {
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
  const expected = routes.map(route => new URL(route, canonicalOrigin).href);
  assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URL");
  assert.deepEqual([...urls].sort(), [...expected].sort(), "Sitemap must match public HTML routes");
  for (const [, value] of xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
    const date = new Date(value);
    assert.ok(Number.isFinite(date.getTime()) && date <= now, "Invalid or future sitemap modification date");
  }
}

export function internalReferences(html) {
  const references = new Set();
  for (const tag of ["a", "link", "script", "img"]) {
    for (const attrs of tags(html, tag)) {
      const reference = attrs[tag === "script" || tag === "img" ? "src" : "href"];
      if (reference?.startsWith("/") && !reference.startsWith("//")) references.add(reference);
    }
  }
  return [...references];
}
