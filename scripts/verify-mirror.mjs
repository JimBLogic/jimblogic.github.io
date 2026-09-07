import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const mirror = process.argv[2] || "sites";
let checked = 0;
const hashes = [];
async function compare(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await compare(file);
    else {
      const original = await readFile(file);
      const copy = await readFile(path.join(mirror, file));
      assert.ok(original.equals(copy), `Mirror differs: ${file}`);
      hashes.push(`${file}:${createHash("sha256").update(original).digest("hex")}`);
      checked++;
    }
  }
}
for (const dir of ["app", "lib", "public"]) await compare(dir);
console.log(`Mirror verified: ${checked} shared files; SHA-256 ${createHash("sha256").update(hashes.sort().join("\n")).digest("hex")}`);
