import test from "node:test";
import assert from "node:assert/strict";
import { readSavedLanguage, rememberLanguage, clearLocalPreferences } from "../lib/local-preferences.ts";
import { isCyberDailySnapshot } from "../lib/feed.ts";

function storage(initial = {}) {
  const values = new Map(Object.entries(initial));
  const writes = [];
  return { values, writes, getItem: k => values.get(k) ?? null,
    setItem(k, v) { writes.push([k, v]); values.set(k, v); }, removeItem: k => values.delete(k) };
}

test("initial visits read preferences without writes; only explicit valid language selections persist", () => {
  const localStorage = storage();
  const browser = { localStorage };
  assert.equal(readSavedLanguage(browser), null);
  assert.deepEqual(localStorage.writes, []);
  assert.equal(rememberLanguage(browser, "es"), true);
  assert.equal(readSavedLanguage(browser), "es");
  assert.equal(rememberLanguage(browser, "constructor"), false);
  assert.deepEqual(localStorage.writes, [["jimblogic-language", "es"]]);
  localStorage.values.set("jimblogic-language", "constructor");
  assert.equal(readSavedLanguage(browser), null);
});

test("deletion removes only portfolio keys, including the legacy session cache", () => {
  const browser = { localStorage: storage({ "jimblogic-language": "ca", unrelated: "keep" }),
    sessionStorage: storage({ "jimblogic-cyberdailylog-snapshot": "old", unrelated: "keep" }) };
  assert.equal(clearLocalPreferences(browser), true);
  assert.deepEqual([...browser.localStorage.values], [["unrelated", "keep"]]);
  assert.deepEqual([...browser.sessionStorage.values], [["unrelated", "keep"]]);
  assert.deepEqual(browser.localStorage.writes, []);
});

test("blocked storage remains usable and deletion never reports false success", () => {
  const browser = { get localStorage() { throw new Error("blocked"); }, get sessionStorage() { throw new Error("blocked"); } };
  assert.equal(readSavedLanguage(browser), null);
  assert.equal(rememberLanguage(browser, "en"), false);
  assert.equal(clearLocalPreferences(browser), false);
});

test("feed validation rejects invalid dates and non-numeric counts before rendering", () => {
  const data = { generated_at: "2026-09-04T13:55:37Z", pipeline_status: "operational", above_threshold: 2,
    qualified_developments: 4, source_health: { core: { healthy: 3, total: 3 } } };
  assert.equal(isCyberDailySnapshot(data), true);
  assert.equal(isCyberDailySnapshot({ ...data, generated_at: "not a date" }), false);
  assert.equal(isCyberDailySnapshot({ ...data, above_threshold: -1 }), false);
  assert.equal(isCyberDailySnapshot(null), false);
});
