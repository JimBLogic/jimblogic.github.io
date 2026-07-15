import fs from 'node:fs';
import crypto from 'node:crypto';

const url = process.env.PRODUCTION_URL || 'https://jimblogic.github.io/';
const res = await fetch(`${url}?audit=${Date.now()}`, { redirect: 'follow' });
if (!res.ok) throw new Error(`Production fetch failed: ${res.status} ${res.statusText}`);
const html = await res.text();
fs.mkdirSync('audit-artifacts', { recursive: true });
fs.writeFileSync('audit-artifacts/live-index.html', html);
const sha = crypto.createHash('sha256').update(html).digest('hex');
console.log(JSON.stringify({ url: res.url, status: res.status, etag: res.headers.get('etag'), cacheControl: res.headers.get('cache-control'), lastModified: res.headers.get('last-modified'), bytes: html.length, sha }, null, 2));
for (const bad of ['Ethical Hacker | AWS Cloud Practitioner', 'developed expertise across multiple domains', 'Cybersecurity Professional', 'proven track record']) {
  if (html.includes(bad)) throw new Error(`Production exposes obsolete string: ${bad}`);
}
for (const expected of ['Junior SOC Analyst', 'Blue Team', 'Current Focus', 'Raspberry Pi']) {
  if (!html.includes(expected)) throw new Error(`Production missing expected string: ${expected}`);
}
const local = fs.readFileSync('index.html', 'utf8');
const liveBuild = html.match(/<meta name="build-version" content="([^"]*)"/i)?.[1] || null;
const localBuild = local.match(/<meta name="build-version" content="([^"]*)"/i)?.[1] || null;
if (liveBuild !== localBuild) throw new Error(`Build version mismatch: live=${liveBuild} local=${localBuild}`);
