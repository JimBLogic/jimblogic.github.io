import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const workflow = readFileSync(".github/workflows/deploy-pages.yml", "utf8");
function job(name) {
  const start = workflow.indexOf("\n  " + name + ":\n");
  assert.ok(start >= 0, "Missing job: " + name);
  const text = workflow.slice(start + 1);
  const next = text.slice(("  " + name + ":\n").length).search(/\n  [a-z][a-z-]*:\n/);
  return next === -1 ? text : text.slice(0, ("  " + name + ":\n").length + next);
}

test("only full 40-character SHA GitHub Actions dependencies are used", () => {
  const actions = [...workflow.matchAll(/^\s+(?:-\s+)?uses:\s+([^\s#]+)/gm)].map(x => x[1]);
  assert.ok(actions.length >= 9);
  for (const action of actions) {
    assert.match(action, /^actions\/[a-z-]+@[0-9a-f]{40}$/, action);
  }
  assert.doesNotMatch(workflow, /pull_request_target|workflow_run:/);
});

test("daily refresh remains timezone aware, read-only and cannot start from PRs", () => {
  assert.match(workflow, /cron: '0 12 \* \* \*'\n\s+timezone: Europe\/Madrid/);
  const refresh = job("refresh");
  assert.match(refresh, /github\.ref == 'refs\/heads\/main'/);
  assert.match(refresh, /github\.repository == 'JimBLogic\/jimblogic\.github\.io'/);
  assert.match(refresh, /permissions:\n\s+contents: read/);
  assert.match(refresh, /persist-credentials: false/);
  assert.match(refresh, /npm run verify:mirror/);
  assert.doesNotMatch(refresh, /\bgit push\b/);
});

test("only dedicated trusted publisher can write and staged file paths are limited", () => {
  const publisher = job("publish-snapshot");
  assert.match(publisher, /needs: refresh/);
  assert.match(publisher, /needs\.refresh\.result == 'success'/);
  assert.match(publisher, /github\.ref == 'refs\/heads\/main'/);
  assert.match(publisher, /github\.repository == 'JimBLogic\/jimblogic\.github\.io'/);
  assert.match(publisher, /permissions:\n\s+contents: write/);
  assert.match(publisher, /public\/data\/cyberdailylog\.json/);
  assert.match(publisher, /sites\/public\/data\/cyberdailylog\.json/);
  assert.match(publisher, /node scripts\/verify-mirror\.mjs/);
  assert.match(publisher, /Date\.parse\(current\.generated_at\) < Date\.parse\(previous\.generated_at\)/);
  assert.doesNotMatch(publisher, /\bnpm (ci|install|run|exec)\b/);
  assert.doesNotMatch(job("validate"), /contents: write/);
});

test("PR CI is read-only and cannot upload Pages artifacts or deploy", () => {
  const validate = job("validate");
  const deploy = job("deploy");
  assert.match(validate, /permissions:\n\s+contents: read/);
  assert.match(validate, /npm ci/);
  assert.match(validate, /npm run verify:mirror/);
  assert.match(validate, /npm audit --omit=dev --audit-level=high/);
  assert.match(validate, /github\.event_name != 'pull_request' && github\.ref == 'refs\/heads\/main'/);
  assert.match(deploy, /github\.event_name != 'pull_request' && github\.ref == 'refs\/heads\/main'/);
  assert.match(deploy, /needs\.validate\.result == 'success'/);
  assert.match(deploy, /pages: write/);
  assert.match(deploy, /id-token: write/);
});
