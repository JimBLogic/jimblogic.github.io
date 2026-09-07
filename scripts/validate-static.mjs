import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";

const required = [
  "out/index.html",
  "out/privacy/index.html",
  "out/data/cyberdailylog.json",
  "out/certifications/index.html",
  "out/labs/cyberdailylog/index.html",
  "out/labs/austrian-monitor/index.html",
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
assert.match(home, /AIF-C01 is scheduled for September 2026/);
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

const pages = [["", home], ["certifications/", certifications], ["labs/cyberdailylog/", cyberDailyLog], ["labs/austrian-monitor/", austrianMonitor], ["privacy/", await readFile("out/privacy/index.html", "utf8")]];
for (const [route, html] of pages) {
  const tags = html.match(/<link[^>]+rel="canonical"[^>]*>/g) || [];
  assert.equal(tags.length, 1, route);
  assert.ok(tags[0].includes(`href="https://jimblogic.github.io/${route}"`), route);
  assert.match(html, /Content-Security-Policy/);
  assert.doesNotMatch(html, /fonts\.googleapis\.com|googletagmanager\.com/);
  if (route !== "privacy/") assert.match(html, /href="\/privacy\/"/);
}
assert.match(sitemap, /https:\/\/jimblogic\.github\.io\/privacy\//);
console.log("Verified independent canonicals, privacy links and CSP on all five routes.");
