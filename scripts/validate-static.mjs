import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";

const required = [
  "out/index.html",
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
assert.match(certifications, /Credentials, without the badge wall/);
assert.match(cyberDailyLog, /View the complete live application/);
assert.match(cyberDailyLog, /cyberdailylog-dashboard\.jimblogic\.chatgpt\.site/);
assert.match(austrianMonitor, /Austrian Business Cycle Monitor/);
assert.match(austrianMonitor, /austrian-business-cycle-monitor\.jimblogic\.chatgpt\.site/);
assert.match(robots, /Sitemap: https:\/\/jimblogic\.github\.io\/sitemap\.xml/);
assert.match(sitemap, /https:\/\/jimblogic\.github\.io\/certifications/);
assert.match(sitemap, /https:\/\/jimblogic\.github\.io\/labs\/cyberdailylog/);
assert.match(sitemap, /https:\/\/jimblogic\.github\.io\/labs\/austrian-monitor/);

console.log(`Validated ${required.length} static deployment artifacts.`);
