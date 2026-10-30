import assert from "node:assert/strict";
import test, { before, after } from "node:test";
import { Miniflare, convertV4MiniflareOptions } from "miniflare";
import path from "node:path";
import { readdirSync } from "node:fs";

const snapshot = { above_threshold: 2, generated_at: "2026-09-06T13:20:48Z", pipeline_status: "operational",
  qualified_developments: 4, source_health: { core: { healthy: 3, total: 3 } } };
const outboundRequests = [];
function createRuntime(outboundService = (request) => {
  outboundRequests.push({ url: request.url, headers: Object.fromEntries(request.headers) });
  return Response.json({ ...snapshot, private_extra: "must not be exposed" });
}) {
  return new Miniflare(convertV4MiniflareOptions({
  modules: ["index.js", ...readdirSync("dist/server", { recursive: true }).filter((p) => p.endsWith(".js") && p !== "index.js")]
    .map((file) => ({ type: "ESModule", path: path.resolve("dist/server", file) })),
  modulesRoot: path.resolve("dist/server"),
  compatibilityDate: "2026-10-23",
  compatibilityFlags: ["nodejs_compat"],
  serviceBindings: { ASSETS: () => new Response("Not found", { status: 404 }) },
  outboundService,
}));
}
const runtime = createRuntime();

before(async () => { await runtime.ready; });
after(async () => { await runtime.dispose(); });
const worker = { fetch: (request) => runtime.dispatchFetch(request.url, request) };


test("renders production portfolio metadata and content", async () => {

  const response = await worker.fetch(
    new Request("https://portfolio.jimblogic.chatgpt.site/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/);
  assert.match(response.headers.get("permissions-policy") ?? "", /camera=\(\)/);

  const html = await response.text();
  assert.doesNotMatch(html, /codex-preview/i);
  assert.match(html, /Experience that transfers into security work\./);
  assert.match(html, /Blue Team Junior Analyst Pathway/);
  assert.match(html, /EU \+ UK work rights/);
  assert.match(html, /first exam attempt on 29 September 2026/);
  assert.match(html, /GitHub main mirror/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /ProfilePage/);
  assert.match(html, /SoftwareSourceCode/);
  assert.match(html, /JimBLogic Portfolio/);
  assert.match(html, /sitemap\.xml|manifest\.webmanifest/);
  assert.match(html, /src="\/images\/jaime-ramsden\.webp"/);
  assert.match(html, /src="\/images\/generic-sbc-homelab\.webp"/);
  assert.doesNotMatch(html, /_vinext\/image/);
  assert.doesNotMatch(html, /419 items assessed/);
});

test("renders every public portfolio route from the same production worker", async () => {
  const env = {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  };
  const ctx = { waitUntil() {}, passThroughOnException() {} };
  const routes = [
    ["/certifications", /Credentials, without the badge wall\./],
    ["/privacy", /Privacy &amp; local storage|Privacy &amp; Local Storage|Privacy &amp;|Privacy & local storage/],
    ["/labs/cyberdailylog", /How to evaluate the project\./],
    ["/labs/austrian-monitor", /Austrian Business Cycle Monitor/],
  ];

  for (const [pathname, expected] of routes) {
    const response = await worker.fetch(
      new Request(`https://portfolio.jimblogic.chatgpt.site${pathname}`),
      env,
      ctx,
    );
    assert.equal(response.status, 200, pathname);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, expected);
    assert.ok(html.includes(`href="https://jimblogic.github.io${pathname}/"`), pathname);
    assert.equal(response.headers.get("set-cookie"), null);
    if (pathname === "/labs/cyberdailylog") {
      assert.match(html, /https:\/\/cyberdailylog\.jimblogic\.chatgpt\.site/);
      assert.doesNotMatch(
        html,
        /cyberdailylog-dashboard\.jimblogic\.chatgpt\.site/,
      );
    }
  }
});

test("serves crawl discovery routes", async () => {
  const env = {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  };
  const ctx = { waitUntil() {}, passThroughOnException() {} };

  const robots = await worker.fetch(
    new Request("https://portfolio.jimblogic.chatgpt.site/robots.txt"),
    env,
    ctx,
  );
  assert.equal(robots.status, 200);
  const robotsText = await robots.text();
  assert.match(robotsText, /User-Agent: \*/);
  assert.match(robotsText, /User-Agent: Googlebot/);
  assert.match(robotsText, /Sitemap: .*\/sitemap\.xml/);

  const sitemap = await worker.fetch(
    new Request("https://portfolio.jimblogic.chatgpt.site/sitemap.xml"),
    env,
    ctx,
  );
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.match(xml, /<loc>.*\/certifications\/<\/loc>/);
  assert.match(xml, /<lastmod>2026-10-07/);

  const manifest = await worker.fetch(
    new Request("https://portfolio.jimblogic.chatgpt.site/manifest.webmanifest"),
    env,
    ctx,
  );
  assert.equal(manifest.status, 200);
  const manifestJson = await manifest.json();
  assert.deepEqual(
    manifestJson.icons.map((icon) => icon.src),
    ["/favicon.svg", "/icon-192.png", "/icon-512.png"],
  );
});

test("serves the public feed without forwarding visitor headers or upstream extra fields", async () => {
  const response = await worker.fetch(new Request("https://portfolio.jimblogic.chatgpt.site/data/cyberdailylog.json", {
    headers: { Cookie: "visitor=secret", Authorization: "Bearer not-forwarded", "X-Forwarded-For": "192.0.2.1" },
  }), { ASSETS: { fetch: async () => new Response("missing", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 200, JSON.stringify(outboundRequests));
  assert.equal(response.headers.get("set-cookie"), null);
  assert.deepEqual(await response.json(), snapshot);
  assert.equal(outboundRequests.length, 1);
  assert.equal(outboundRequests[0].url, "https://jimblogic.github.io/data/cyberdailylog.json");
  assert.equal(outboundRequests[0].headers.accept, "application/json");
  for (const name of ["cookie", "authorization", "x-forwarded-for"]) {
    assert.equal(outboundRequests[0].headers[name], undefined, `${name} must not leave the Worker`);
  }
  assert.match(response.headers.get("content-security-policy"), /connect-src 'self'/);
});


test("does not follow an upstream redirect to a different destination", async () => {
  const requested = [];
  const redirected = createRuntime((request) => {
    requested.push(request.url);
    return new Response(null, { status: 302, headers: { location: "https://example.invalid/private" } });
  });
  try {
    await redirected.ready;
    const response = await redirected.dispatchFetch("https://portfolio.jimblogic.chatgpt.site/data/cyberdailylog.json");
    assert.equal(response.status, 404); // Controlled missing-asset fallback.
    assert.deepEqual(requested, ["https://jimblogic.github.io/data/cyberdailylog.json"]);
  } finally {
    await redirected.dispose();
  }
});
