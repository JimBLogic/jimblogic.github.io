import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { isIP } from "node:net";
import path from "node:path";

// This intentionally small validator accepts only the schema vocabulary used by
// this catalogue. Unknown keywords fail closed; it is not a general JSON Schema
// implementation. Both published schemas are checked before any data is read.
const supported = new Set([
  "$schema", "$id", "title", "description", "type", "properties", "required",
  "additionalProperties", "items", "enum", "const", "minLength", "minItems",
  "pattern", "format",
]);
const primitiveTypes = new Set(["object", "array", "string", "number", "integer", "boolean", "null"]);

export function validateSchemaVocabulary(schema, at = "$schema") {
  assert.ok(schema && typeof schema === "object" && !Array.isArray(schema), `${at}: schema must be an object`);
  for (const keyword of Object.keys(schema)) {
    assert.ok(supported.has(keyword), `${at}: unsupported schema keyword ${keyword}`);
  }
  assert.ok(primitiveTypes.has(schema.type), `${at}: unsupported schema type`);
  if (schema.format !== undefined) assert.ok(["date", "uri"].includes(schema.format), `${at}: unsupported format`);
  if (schema.type === "object") {
    assert.equal(schema.additionalProperties, false, `${at}: object must reject unknown properties`);
    assert.ok(schema.properties && typeof schema.properties === "object", `${at}: missing properties`);
    assert.ok(Array.isArray(schema.required), `${at}: required must be an array`);
    for (const name of schema.required) assert.ok(Object.hasOwn(schema.properties, name), `${at}: required property absent from schema`);
    for (const [name, child] of Object.entries(schema.properties)) validateSchemaVocabulary(child, `${at}.${name}`);
  }
  if (schema.type === "array") validateSchemaVocabulary(schema.items, `${at}[]`);
  if (schema.pattern !== undefined) new RegExp(schema.pattern);
}

function isDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) &&
    new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
}

export function assertHttpsUrl(value, at = "URL") {
  assert.equal(typeof value, "string", `${at}: URL must be a string`);
  assert.ok(!/[\s\\]/.test(value), `${at}: URL contains whitespace or backslash`);
  let parsed;
  assert.doesNotThrow(() => { parsed = new URL(value); }, `${at}: invalid URL`);
  assert.equal(parsed.protocol, "https:", `${at}: HTTPS required`);
  const hostname = parsed.hostname.replace(/^\[|\]$/g, "").replace(/\.$/, "");
  assert.ok(hostname && hostname.includes(".") && !isIP(hostname), `${at}: publisher hostname required; IP literals forbidden`);
  assert.ok(!parsed.username && !parsed.password && !parsed.port, `${at}: credentials and nonstandard ports forbidden`);
  assert.doesNotMatch(hostname, /(?:^|\.)(?:localhost|local|internal|invalid|test|example)$/i, `${at}: placeholder/local URL forbidden`);
  assert.ok(!["example.com", "example.net", "example.org"].includes(hostname), `${at}: placeholder URL forbidden`);
}

export function validateAgainstSchema(value, schema, at = "$") {
  const actualType = value === null ? "null" : Array.isArray(value) ? "array" : typeof value;
  assert.ok(actualType === schema.type || (schema.type === "integer" && Number.isInteger(value)), `${at}: expected ${schema.type}`);
  if (schema.enum) assert.ok(schema.enum.includes(value), `${at}: invalid enum value`);
  if (Object.hasOwn(schema, "const")) assert.deepEqual(value, schema.const, `${at}: constant mismatch`);
  if (schema.type === "object") {
    for (const name of schema.required ?? []) assert.ok(Object.hasOwn(value, name), `${at}: missing required ${name}`);
    for (const [name, child] of Object.entries(value)) {
      assert.ok(Object.hasOwn(schema.properties, name), `${at}: unexpected property ${name}`);
      validateAgainstSchema(child, schema.properties[name], `${at}.${name}`);
    }
  }
  if (schema.type === "array") {
    assert.ok(value.length >= (schema.minItems ?? 0), `${at}: too few items`);
    value.forEach((child, index) => validateAgainstSchema(child, schema.items, `${at}[${index}]`));
  }
  if (schema.type === "string") {
    assert.ok(value.trim().length >= (schema.minLength ?? 0), `${at}: empty/short text`);
    if (schema.pattern) assert.match(value, new RegExp(schema.pattern), `${at}: pattern mismatch`);
    if (schema.format === "date") assert.ok(isDate(value), `${at}: invalid date`);
    if (schema.format === "uri") assert.doesNotThrow(() => new URL(value), `${at}: invalid URI`);
  }
}

function uniqueIds(items, label) {
  const ids = items.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length, `${label}: duplicate IDs`);
  return new Set(ids);
}

export function validateResources(catalog, qa, schemas, today = new Date().toISOString().slice(0, 10)) {
  assert.ok(isDate(today), "validation reference date must be a real ISO date");
  validateSchemaVocabulary(schemas.catalog);
  validateSchemaVocabulary(schemas.qa);
  validateAgainstSchema(catalog, schemas.catalog, "catalog");
  validateAgainstSchema(qa, schemas.qa, "qa");
  assert.equal(catalog.$schema, "https://jimblogic.github.io/agent-resources/catalog.schema.json");
  assert.equal(qa.$schema, "https://jimblogic.github.io/agent-resources/qa-cases.schema.json");
  assert.equal(catalog.canonical_url, "https://jimblogic.github.io/agent-resources/");
  const sourceIds = uniqueIds(catalog.sources, "sources");
  uniqueIds(catalog.workflows, "workflows");
  uniqueIds(qa.cases, "evaluation cases");
  for (const [label, date] of [["catalog", catalog.reviewed_on], ["qa", qa.reviewed_on], ...catalog.sources.map((source) => [source.id, source.reviewed_on])]) {
    assert.ok(date <= today, `${label}: review date is in the future`);
  }
  for (const source of catalog.sources) {
    assertHttpsUrl(source.url, source.id);
    assert.ok(source.reviewed_on <= catalog.reviewed_on, `${source.id}: source review newer than catalogue review`);
  }
  for (const workflow of catalog.workflows) {
    assert.equal(new Set(workflow.source_ids).size, workflow.source_ids.length, `${workflow.id}: duplicate source references`);
    for (const id of workflow.source_ids) assert.ok(sourceIds.has(id), `${workflow.id}: missing source ${id}`);
    for (const evidence of workflow.evidence) assertHttpsUrl(evidence.url, `${workflow.id} evidence`);
  }
  for (const item of qa.cases) assert.ok(sourceIds.has(item.expected_source_id), `${item.id}: missing expected source`);
  assert.deepEqual([...new Set(qa.cases.map((item) => item.expected_source_id))].sort(), [...sourceIds].sort(), "evaluation cases must cover every source");
  assert.equal(qa.evaluation.status, "NOT TESTED", "editorial fixtures must not claim an agent evaluation passed");
  return { sources: catalog.sources.length, workflows: catalog.workflows.length, cases: qa.cases.length };
}

export async function loadResourceFiles(root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")) {
  const directory = path.join(root, "public", "agent-resources");
  const readJson = async (name) => JSON.parse(await readFile(path.join(directory, name), "utf8"));
  const [catalog, qa, catalogSchema, qaSchema] = await Promise.all([
    readJson("catalog.json"), readJson("qa-cases.json"), readJson("catalog.schema.json"), readJson("qa-cases.schema.json"),
  ]);
  return { catalog, qa, schemas: { catalog: catalogSchema, qa: qaSchema } };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { catalog, qa, schemas } = await loadResourceFiles();
  const counts = validateResources(catalog, qa, schemas);
  console.log(`Validated resource schemas and references: ${counts.sources} sources, ${counts.workflows} workflows, ${counts.cases} editorial cases; agent evaluation NOT TESTED.`);
}
