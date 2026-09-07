import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

async function collect(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await collect(file));
    else if (/\.(tsx?|jsx?|mjs|css)$/.test(file)) files.push(file);
  }
  return files;
}
const files = [...await collect("app"), ...await collect("lib")];
const forbidden = /google-analytics\.com|googletagmanager\.com|connect\.facebook\.net|static\.hotjar\.com|clarity\.ms\/tag|fonts\.(googleapis|gstatic)\.com|document\.cookie|navigator\.sendBeacon|indexedDB\.open|serviceWorker\.register|sessionStorage\.setItem|FingerprintJS\.load/;
for (const file of files) {
  const source = await readFile(file, "utf8");
  assert.doesNotMatch(source, forbidden, file);
  if (file !== "lib/local-preferences.ts") assert.doesNotMatch(source, /localStorage\.(setItem|removeItem|clear)/, file);
  if (file.startsWith("app/") && file.endsWith("page.tsx")) assert.doesNotMatch(source, /raw\.githubusercontent\.com|<iframe\b/, file);
}
const hook = await readFile("lib/use-language.ts", "utf8");
assert.doesNotMatch(hook.split("const chooseLanguage")[0], /rememberLanguage\(window/);
const home = await readFile("app/page.tsx", "utf8");
assert.match(home, /"\/data\/cyberdailylog\.json"/);
assert.match(home, /credentials: "omit"/);
console.log(`Privacy audit passed: ${files.length} source files.`);
