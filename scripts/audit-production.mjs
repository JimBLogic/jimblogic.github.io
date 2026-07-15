import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const origin = 'https://jimblogic.github.io/';
const failures = [];
const obsolete = ['Ethical Hacker | AWS Cloud Practitioner', 'developed expertise across multiple domains', 'proven track record', 'I help teams', 'triar alertas', 'triar alertes'];
const required = ['Junior SOC Analyst', 'Blue Team', 'Current Focus', 'Raspberry Pi 4'];
const cacheBust = `?audit=${Date.now()}`;
const report = { url: origin, cacheBust, checkedAt: new Date().toISOString(), headers: {}, assets: [], failures };
const fail = msg => failures.push(msg);

async function get(url) {
  const res = await fetch(url, { redirect: 'follow', cache: 'no-store' });
  return res;
}
const pageRes = await get(origin + cacheBust);
report.status = pageRes.status;
for (const h of ['content-type', 'cache-control', 'etag', 'last-modified', 'content-security-policy']) report.headers[h] = pageRes.headers.get(h);
if (!pageRes.ok) fail(`Production returned HTTP ${pageRes.status}`);
const html = await pageRes.text();
report.title = html.match(/<title>([^<]+)<\/title>/i)?.[1] || null;
report.buildFingerprint = html.match(/<meta name="build-version" content="([^"]+)"/i)?.[1] || null;
if (!report.buildFingerprint || report.buildFingerprint.includes('%')) fail('Production build fingerprint is missing or stale');
for (const needle of required) if (!html.includes(needle)) fail(`Production missing required positioning: ${needle}`);
for (const bad of obsolete) if (html.includes(bad)) fail(`Production contains obsolete copy: ${bad}`);
const assetUrls = [...html.matchAll(/(?:src|href)="(\.\/assets\/[^"]+\.(?:css|js))"/g)].map(m => new URL(m[1], origin).href);
if (!assetUrls.length) fail('No same-origin CSS/JS assets found in production HTML');
for (const asset of assetUrls) {
  const res = await get(`${asset}${asset.includes('?') ? '&' : '?'}audit=${Date.now()}`);
  report.assets.push({ url: asset, status: res.status, contentType: res.headers.get('content-type') });
  if (!res.ok) fail(`Broken production asset ${asset}: HTTP ${res.status}`);
}
await mkdir('audit-artifacts', { recursive: true });
const file = path.join('audit-artifacts', `production-audit-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
await writeFile(file, JSON.stringify(report, null, 2));
console.log(`Wrote ${file}`);
if (failures.length) { console.error(`Production audit failed (${failures.length})`); failures.forEach(f => console.error(`- ${f}`)); process.exit(1); }
console.log('Production audit passed');
