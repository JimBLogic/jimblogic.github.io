import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { canonicalOrigin, internalReferences, portfolioRoutes, structuredEntities, validatePageSeo, validateSitemap } from "./seo-validation.mjs";

const required = [
  "out/index.html",
  "out/privacy/index.html",
  "out/data/cyberdailylog.json",
  "out/certifications/index.html",
  "out/labs/cyberdailylog/index.html",
  "out/labs/austrian-monitor/index.html",
  "out/labs/3d-lab/index.html",
  "out/agent-resources/index.html",
  "out/agent-resources/catalog.json",
  "out/agent-resources/catalog.schema.json",
  "out/agent-resources/qa-cases.json",
  "out/agent-resources/qa-cases.schema.json",
  "out/robots.txt",
  "out/sitemap.xml",
  "out/manifest.webmanifest",
  "out/llms.txt",
  "out/documents/Jaime-Ramsden-de-Frutos-CV.pdf",
  "out/documents/UpgradeHub-Cert.pdf",
];

await Promise.all(required.map((path) => stat(path)));

const [home, certifications, cyberDailyLog, austrianMonitor, robots, sitemap] = await Promise.all([
  readFile("out/index.html", "utf8"),
  readFile("out/certifications/index.html", "utf8"),
  readFile("out/labs/cyberdailylog/index.html", "utf8"),
  readFile("out/labs/austrian-monitor/index.html", "utf8"),
  readFile("out/robots.txt", "utf8"),
  readFile("out/sitemap.xml", "utf8"),
]);

assert.match(home, /JimBLogic \| Junior SOC Analyst/);
assert.match(home, /ProfilePage/);
assert.match(home, /SoftwareSourceCode/);
assert.match(home, /https:\/\/jimblogic\.github\.io/);
assert.match(home, /first exam attempt on 29 September 2026/);
assert.match(home, /GitHub main mirror/);
assert.doesNotMatch(home, /codex-preview/i);
assert.match(certifications, /Credentials, without the badge wall/);
assert.match(cyberDailyLog, /View the complete live application/);
assert.match(cyberDailyLog, /How to evaluate the project/);
assert.match(cyberDailyLog, /cyberdailylog\.jimblogic\.chatgpt\.site/);
assert.doesNotMatch(cyberDailyLog, /cyberdailylog-dashboard\.jimblogic\.chatgpt\.site/);
assert.match(austrianMonitor, /Austrian Business Cycle Monitor/);
assert.match(austrianMonitor, /austrian-business-cycle-monitor\.jimblogic\.chatgpt\.site/);
assert.match(robots, /Sitemap: https:\/\/jimblogic\.github\.io\/sitemap\.xml/);
assert.match(sitemap, /https:\/\/jimblogic\.github\.io\/certifications/);
assert.match(sitemap, /https:\/\/jimblogic\.github\.io\/labs\/cyberdailylog/);
assert.match(sitemap, /https:\/\/jimblogic\.github\.io\/labs\/austrian-monitor/);

console.log(`Validated ${required.length} static deployment artifacts.`);

const pages = await Promise.all(portfolioRoutes.map(async route => [route, await readFile(`out${route}index.html`, "utf8")]));
for (const [route, html] of pages) {
  const pageType = route === "/agent-resources/" ? "CollectionPage" : route === "/labs/3d-lab/" ? "WebPage" : undefined;
  validatePageSeo(html, route, { pageType });
  if (route !== "/privacy/") assert.match(html, /href="\/privacy\/"/);
  for (const reference of internalReferences(html)) {
    const { pathname } = new URL(reference, canonicalOrigin);
    const local = decodeURIComponent(pathname);
    const filename = path.join("out", local, local.endsWith("/") ? "index.html" : "");
    const target = await stat(filename).catch(() => null);
    const exists = target?.isFile() || (target?.isDirectory() && (await stat(path.join(filename, "index.html")).catch(() => null))?.isFile());
    assert.ok(exists, `${route}: missing local route or asset ${reference}`);
  }
}
validateSitemap(sitemap);

const resourceHtml = pages.find(([route]) => route === "/agent-resources/")[1];
const catalog = JSON.parse(await readFile("out/agent-resources/catalog.json", "utf8"));
const lists = structuredEntities(resourceHtml).filter(entity => entity["@type"] === "ItemList");
assert.equal(lists.length, 1, "Resource page must expose one editorial source list");
assert.equal(lists[0].itemListElement.length, catalog.sources.length, "JSON-LD must match the visible catalogue");
for (const [index, source] of catalog.sources.entries()) {
  assert.ok(resourceHtml.includes(`id="${source.id}"`), `Missing visible source card: ${source.id}`);
  assert.ok(resourceHtml.includes(`href="${source.url.replaceAll("&", "&amp;")}"`), `Missing publisher link: ${source.id}`);
  const entry = lists[0].itemListElement[index];
  assert.equal(entry.position, index + 1, `Incorrect JSON-LD source order: ${source.id}`);
  assert.equal(entry.url ?? entry.item?.url ?? entry.item, source.url, `JSON-LD publisher mismatch: ${source.id}`);
}
const llms = await readFile("out/llms.txt", "utf8");
assert.match(llms, /optional discovery aid/);
assert.match(llms, /not a universal standard/);
assert.ok(llms.includes(`${canonicalOrigin}/agent-resources/catalog.json`));
assert.ok(llms.includes(`${canonicalOrigin}/labs/3d-lab/`));
console.log(`Verified ${pages.length} independent canonicals, Open Graph URLs, privacy links, CSP, local references and sitemap routes; source JSON-LD matches the catalogue.`);
