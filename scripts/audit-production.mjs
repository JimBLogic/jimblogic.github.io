import { mkdir, writeFile } from 'node:fs/promises';

const args = new Map(process.argv.slice(2).map((v, i, a) => v.startsWith('--') ? [v, a[i + 1]] : []).filter(Boolean));
const baseUrl = args.get('--url') || 'https://jimblogic.github.io/';
const expectedVersion = args.get('--expected-version') || process.env.VITE_BUILD_VERSION?.slice(0, 12);
const timeoutMs = 15000;
const attempts = 8;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const sanitize = value => String(value?.message || value).replace(/[A-Za-z0-9_=-]{24,}/g, '[redacted]');

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try { return await fetch(url, { signal: controller.signal, cache: 'no-store' }); }
  finally { clearTimeout(timer); }
}

async function attempt() {
  const errors = [];
  const url = new URL(baseUrl);
  url.searchParams.set('qa_build', `${Date.now()}`);
  const res = await fetchWithTimeout(url.href);
  const type = res.headers.get('content-type') || '';
  if (!res.ok) errors.push(`Homepage HTTP ${res.status}`);
  if (!type.includes('text/html')) errors.push(`Homepage content-type was ${type || 'missing'}`);
  const html = await res.text();
  const version = html.match(/<meta name="build-version" content="([^"]+)"/i)?.[1];
  if (!version) errors.push('Build-version meta tag missing');
  if (expectedVersion && version !== expectedVersion) errors.push(`Build version ${version || 'missing'} did not equal expected ${expectedVersion}`);
  for (const n of ['Junior SOC Analyst / Blue Team', 'Raspberry Pi 4', 'Current Focus']) if (!html.includes(n)) errors.push(`Required visible positioning missing: ${n}`);
  for (const n of ['Senior SOC Analyst', 'production SOC analyst', 'personal cyber-security habit tracker']) if (html.includes(n)) errors.push(`Obsolete copy present: ${n}`);
  const assets = [...html.matchAll(/(?:src|href)="\.\/([^"?#]+\.(?:css|js))(?:\?[^"#]*)?/g)].map(m => new URL(m[1], url).href);
  if (!assets.length) errors.push('No same-origin CSS/JS assets found');
  const assetResults = [];
  for (const asset of assets) {
    const assetUrl = new URL(asset); assetUrl.searchParams.set('qa_build', `${Date.now()}`);
    const ar = await fetchWithTimeout(assetUrl.href);
    const at = ar.headers.get('content-type') || '';
    assetResults.push({ url: asset, status: ar.status, contentType: at });
    if (!ar.ok) errors.push(`Asset ${asset} returned HTTP ${ar.status}`);
    if (asset.endsWith('.css') && !/text\/css/.test(at)) errors.push(`CSS asset ${asset} content-type was ${at || 'missing'}`);
    if (asset.endsWith('.js') && !/(javascript|ecmascript)/.test(at)) errors.push(`JS asset ${asset} content-type was ${at || 'missing'}`);
  }
  return { ok: errors.length === 0, checkedUrl: url.href, version, expectedVersion, assets: assetResults, errors };
}

await mkdir('reports', { recursive: true });
let report = { ok: false, errors: ['audit did not run'] };
for (let i = 1; i <= attempts; i += 1) {
  try { report = { attempt: i, ...(await attempt()) }; }
  catch (e) { report = { attempt: i, ok: false, errors: [sanitize(e)] }; }
  if (report.ok) break;
  if (i < attempts) await sleep(Math.min(30000, 5000 * i));
}
await writeFile('reports/production-audit.json', JSON.stringify(report, null, 2));
if (!report.ok) { console.error(report.errors.join('\n')); process.exit(1); }
console.log(`Production audit passed for build ${report.version}`);
