import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";
import { transform, transformSync } from "@esbuild-kit/core-utils";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import path from "node:path";

const require = createRequire(import.meta.url);
const fromSatori = createRequire(require.resolve("satori"));
const { zipSync, unzipSync, strToU8, strFromU8 } = fromSatori("fflate");

test("Satori's patched fflate preserves compressed Unicode content", () => {
  const text = "Menorca · seguridad · privacitat · portfolio".repeat(100);
  const archive = zipSync({ "portfolio.txt": strToU8(text) });
  assert.equal(strFromU8(unzipSync(archive)["portfolio.txt"]), text);
});

test("legacy Drizzle loader transforms TypeScript using the patched esbuild", async () => {
  for (const compile of [transformSync, transform]) {
    const result = await compile("const value: number = 42; export default value;", "/tmp/portfolio-compat.mts", { format: "cjs" });
    const module = { exports: {} };
    runInNewContext(result.code, { module, exports: module.exports });
    assert.equal(module.exports.default, 42);
  }
});

test("patched Satori dependency preserves SVG text rendering", async () => {
  const satori = require("satori").default;
  const font = readFileSync(path.join(path.dirname(require.resolve("@vercel/og/package.json")), "dist/Geist-Regular.ttf"));
  const svg = await satori({ type: "div", props: {
    children: "JimBLogic", style: { display: "flex", fontSize: 40 },
  } }, { width: 640, height: 320, fonts: [{ name: "Geist", data: font, weight: 400 }] });
  assert.match(svg, /<svg[^>]*width="640"[^>]*height="320"/);
  assert.match(svg, /<path/);
});
