import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { assertHttpsUrl, loadResourceFiles, validateResources, validateSchemaVocabulary } from "../scripts/validate-agent-resources.mjs";

const fixture = await loadResourceFiles();
const today = new Date().toISOString().slice(0, 10);
function rejectsMutation(mutate, expected) {
  const changed = structuredClone(fixture);
  mutate(changed);
  assert.throws(() => validateResources(changed.catalog, changed.qa, changed.schemas, today), expected);
}

test("published schemas validate every source, workflow and editorial case", () => {
  const result = validateResources(fixture.catalog, fixture.qa, fixture.schemas, today);
  assert.equal(result.sources, 12);
  assert.equal(result.workflows, 4);
  assert.equal(result.cases, 12);
});

test("rejects malformed JSON and entries with missing or extra fields", () => {
  rejectsMutation(({ catalog }) => { delete catalog.sources[0].publisher; }, /missing required publisher/);
  rejectsMutation(({ catalog }) => { catalog.sources[0].secret = "must not publish"; }, /unexpected property secret/);
  rejectsMutation(({ catalog }) => { catalog.sources[0].topic = "unrelated"; }, /invalid enum value/);
  rejectsMutation(({ catalog }) => { catalog.sources[0].limitation = " "; }, /empty\/short text/);
});

test("file loading fails for malformed catalogue JSON or a missing published schema", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "jimblogic-resources-"));
  const publicDirectory = path.join(directory, "public", "agent-resources");
  try {
    await mkdir(publicDirectory, { recursive: true });
    const files = { "catalog.json": fixture.catalog, "qa-cases.json": fixture.qa, "catalog.schema.json": fixture.schemas.catalog, "qa-cases.schema.json": fixture.schemas.qa };
    await Promise.all(Object.entries(files).map(([name, value]) => writeFile(path.join(publicDirectory, name), JSON.stringify(value))));
    await writeFile(path.join(publicDirectory, "catalog.json"), '{"sources":[');
    await assert.rejects(loadResourceFiles(directory), SyntaxError);
    await writeFile(path.join(publicDirectory, "catalog.json"), JSON.stringify(fixture.catalog));
    await rm(path.join(publicDirectory, "catalog.schema.json"));
    await assert.rejects(loadResourceFiles(directory), { code: "ENOENT" });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("rejects duplicate IDs across every referenced collection", () => {
  rejectsMutation(({ catalog }) => { catalog.sources[1].id = catalog.sources[0].id; }, /sources: duplicate IDs/);
  rejectsMutation(({ catalog }) => { catalog.workflows[1].id = catalog.workflows[0].id; }, /workflows: duplicate IDs/);
  rejectsMutation(({ qa }) => { qa.cases[1].id = qa.cases[0].id; }, /evaluation cases: duplicate IDs/);
});

test("rejects dangling and repeated source references", () => {
  rejectsMutation(({ catalog }) => { catalog.workflows[0].source_ids.push("missing-source"); }, /missing source missing-source/);
  rejectsMutation(({ catalog }) => { catalog.workflows[0].source_ids.push(catalog.workflows[0].source_ids[0]); }, /duplicate source references/);
  rejectsMutation(({ qa }) => { qa.cases[0].expected_source_id = "missing-source"; }, /missing expected source/);
  rejectsMutation(({ qa }) => { qa.cases[0].expected_source_id = qa.cases[1].expected_source_id; }, /cover every source/);
});

test("rejects unsafe, malformed and misleading publisher URLs", () => {
  for (const value of ["javascript:alert(1)", "http://www.cisa.gov/", "https://user:password@www.cisa.gov/", "https://localhost/", "https://127.0.0.1/", "https://[::1]/", "https://example.test/", "https://publisher.invalid/", "https://www.cisa.gov:8443/", "https://www.cisa.gov/ bad", "https://www.cisa.gov\\@example.invalid/", "/relative/"]) {
    assert.throws(() => assertHttpsUrl(value), undefined, value);
  }
  rejectsMutation(({ catalog }) => { catalog.sources[0].url = "http://www.cisa.gov/"; }, /pattern mismatch|HTTPS required/);
  rejectsMutation(({ catalog }) => { catalog.workflows[0].evidence[0].url = "https://user:password@github.com/a/b"; }, /credentials/);
});

test("rejects future, impossible and inconsistent review dates", () => {
  rejectsMutation(({ catalog }) => { catalog.reviewed_on = "2099-01-01"; }, /future/);
  rejectsMutation(({ catalog }) => { catalog.sources[0].reviewed_on = "2026-02-30"; }, /invalid date/);
  rejectsMutation(({ catalog }) => { catalog.reviewed_on = "2026-10-01"; }, /source review newer/);
  rejectsMutation(({ qa }) => { qa.reviewed_on = "2099-01-01"; }, /future/);
});

test("rejects canonical conflicts, missing schema resources and fabricated evaluation success", () => {
  rejectsMutation(({ catalog }) => { catalog.canonical_url = "https://portfolio.jimblogic.chatgpt.site/agent-resources/"; }, /constant mismatch|equal/);
  rejectsMutation(({ catalog }) => { catalog.$schema = "https://jimblogic.github.io/missing.schema.json"; }, /constant mismatch|equal/);
  rejectsMutation(({ qa }) => { qa.evaluation.status = "PASS"; }, /constant mismatch|invalid enum|must not claim/);
});

test("schema validator fails closed for unsupported keywords and formats", () => {
  const unsupported = structuredClone(fixture.schemas.catalog);
  unsupported.not = {};
  assert.throws(() => validateSchemaVocabulary(unsupported), /unsupported schema keyword not/);
  const format = structuredClone(fixture.schemas.catalog);
  format.properties.reviewed_on.format = "date-time";
  assert.throws(() => validateSchemaVocabulary(format), /unsupported format/);
});
