import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const json = JSON.parse(await readFile("public/agent-resources/catalog.json", "utf8"));
const allowedHosts = new Set(["www.cisa.gov", "nvd.nist.gov", "www.first.org", "attack.mitre.org", "cheatsheetseries.owasp.org", "www.nist.gov", "docs.aws.amazon.com", "learn.microsoft.com", "developer.mozilla.org", "www.rfc-editor.org", "developers.cloudflare.com", "ec.europa.eu"]);

test("editorial catalogue is structured, strictly allowlisted and useful", () => {
  assert.equal(json.schema_version, "0.1.0");
  assert.equal(json.sources.length, 12);
  assert.equal(new Set(json.sources.map(item => item.id)).size, json.sources.length);
  assert.match(json.review_scope, /not continuously monitored/);
  for (const row of json.sources) {
    for (const key of ["id", "name", "publisher", "topic", "intent", "question", "url", "format", "limitation"]) {
      assert.equal(typeof row[key], "string", row.id + ":" + key);
      assert.ok(row[key].length > 5, row.id + ":" + key);
    }
    assert.match(row.id, /^[a-z0-9-]+$/);
    const uri = new URL(row.url);
    assert.equal(uri.protocol, "https:");
    assert.ok(allowedHosts.has(uri.hostname), uri.hostname);
    assert.equal(uri.username, "");
    assert.equal(uri.password, "");
    assert.ok(["security", "identity", "web", "data"].includes(row.topic));
  }
});
test("static route has readable HTML source and protects external links", async () => {
  const route = await readFile("app/agent-resources/page.tsx", "utf8");
  assert.match(route, /catalog\.sources\.filter/);
  assert.match(route, /aria-labelledby/);
  assert.match(route, /rel="noopener noreferrer"/);
  assert.doesNotMatch(route, /fetch\(|dangerouslySetInnerHTML|<iframe|eval\(/);
});
test("portfolio prominently links three projects without embedding 3D runtime", async () => {
  const home = await readFile("app/page.tsx", "utf8");
  assert.match(home, /projectSpotlight\[language\]/);
  assert.match(home, /CyberDailyLog/);
  assert.match(home, /Austrian Business Cycle Monitor/);
  assert.match(home, /CyberSecurity 3D Lab/);
  assert.match(home, /https:\/\/lab\.jimblogic\.chatgpt\.site\//);
  assert.match(home, /\/agent-resources\//);
  assert.doesNotMatch(home, /<iframe/);
});
test("all mirrored feature files match byte-for-byte", async () => {
  const paths = ["app/page.tsx", "app/globals.css", "app/sitemap.ts", "app/agent-resources/page.tsx", "app/agent-resources/page.module.css", "public/agent-resources/catalog.json", "public/llms.txt"];
  for (const p of paths) {
    assert.equal(await readFile(p, "utf8"), await readFile("sites/" + p, "utf8"), p);
  }
});
