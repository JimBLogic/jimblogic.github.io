import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

// Floors from the 2026-10-14 Next.js and React advisories. This is a
// regression guard for those advisories, not a replacement for npm audit.
const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));
function atLeast(version, minimum) {
  assert.match(version, /^\d+\.\d+\.\d+$/, `Unreviewed prerelease: ${version}`);
  const actual = version.split(".").map(Number);
  return actual.some((n, i) => n > minimum[i] && actual.slice(0, i).every((v, j) => v === minimum[j])) || actual.every((n, i) => n === minimum[i]);
}
for (const [name, entry] of Object.entries(lock.packages)) {
  if (name.endsWith("node_modules/next")) assert.ok(atLeast(entry.version, [16, 4, 1]), `${name}: vulnerable Next.js ${entry.version}`);
  if (/node_modules\/(react|react-dom|react-server-dom-(webpack|turbopack|parcel))$/.test(name)) {
    assert.ok(atLeast(entry.version, [19, 3, 1]), `${name}: unreviewed React/RSC ${entry.version}`);
  }
  if (name.endsWith("node_modules/sharp")) assert.ok(atLeast(entry.version, [0, 35, 5]), `${name}: vulnerable sharp ${entry.version}`);
  if (name.endsWith("node_modules/fflate")) assert.ok(atLeast(entry.version, [0, 7, 5]), `${name}: vulnerable fflate ${entry.version}`);
  if (name.endsWith("node_modules/esbuild")) {
    assert.ok(atLeast(entry.version, [0, 25, 0]), `${name}: vulnerable esbuild development server ${entry.version}`);
    assert.ok(!atLeast(entry.version, [0, 27, 3]) || atLeast(entry.version, [0, 28, 1]), `${name}: vulnerable esbuild Windows file handling ${entry.version}`);
  }
}
const vendor = "node_modules/@vitejs/plugin-rsc/dist/vendor/react-server-dom/package.json";
if (lock.packages["node_modules/@vitejs/plugin-rsc"]) {
  assert.ok(existsSync(vendor), "Install dependencies before checking the bundled RSC copy");
  const bundled = JSON.parse(readFileSync(vendor, "utf8"));
  assert.ok(atLeast(bundled.version, [19, 3, 1]), `Bundled RSC is vulnerable: ${bundled.version}`);
  assert.equal(bundled.version, lock.packages["node_modules/react"].version, "Bundled RSC and React must agree");
}
console.log("October framework security floors verified, including bundled RSC when present.");
