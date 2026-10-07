import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { careerStatus } from '../lib/career-status.ts';

test('all languages distinguish AWS preparation from earned certification', () => {
  for (const language of ['en','es','ca']) {
    const status = careerStatus[language];
    assert.match(status.aws, /AIF-C01/);
    assert.match(status.aws, /CLF-C02/);
    assert.match(status.aws, /29 .*2026/);
    assert.match(status.badge, /SimuLearn.*Skill Builder/);
    assert.match(status.baseline, /progress|curso|curs/);
  }
  assert.match(careerStatus.en.aws, /Neither is an earned AWS certification/);
  assert.match(careerStatus.es.aws, /Ninguna se presenta como certificación AWS obtenida/);
  assert.match(careerStatus.ca.aws, /Cap no es presenta com una certificació AWS obtinguda/);
});

test('published sources do not revive unsupported claims or excluded projects', async () => {
  const files = ['app/page.tsx','app/layout.tsx','app/ProfessionalEvidence.tsx','app/labs/LabPage.tsx','app/certifications/page.tsx','public/llms.txt'];
  for (const file of files) {
    const source = await readFile(file,'utf8');
    assert.doesNotMatch(source, /AIF-C01 (?:is )?scheduled|AIF-C01 (?:está )?programado|AIF-C01 .*programat|Operational build|incident ownership|Ethical Hacker \| AWS Cloud Practitioner/i, file);
    assert.doesNotMatch(source, /aws-sso-sync-okta|auto-ovpn|PrettyGoodIdentity|LOC-AI/, file);
  }
  const home = await readFile('app/page.tsx','utf8');
  assert.match(home, /careerStatus\.en\.aws/);
  assert.match(home, /careerStatus\.es\.aws/);
  assert.match(home, /careerStatus\.ca\.aws/);
  const structured = await readFile('app/layout.tsx','utf8');
  assert.doesNotMatch(structured, /jobTitle:/);
  assert.match(structured, /operational validation in progress/);
});
