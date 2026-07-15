import { writeFile, mkdir } from 'node:fs/promises';
const base = 'https://jimblogic.github.io/';
const errors = [];
const sanitize = e => String(e && e.message || e).replace(/[A-Za-z0-9_=-]{24,}/g,'[redacted]');
async function get(url){ const r = await fetch(url); return r; }
try {
  const url = `${base}?qa=${Date.now()}`;
  const res = await get(url);
  if (!res.ok) errors.push(`Homepage HTTP ${res.status}`);
  const headers = Object.fromEntries(['content-type','cache-control','x-github-request-id'].map(h => [h,res.headers.get(h)]));
  const html = await res.text();
  if (!/<meta name="build-version" content="[^"]+"/.test(html)) errors.push('Build fingerprint missing');
  for (const n of ['Junior SOC Analyst / Blue Team','Raspberry Pi 4','Current Focus']) if (!html.includes(n)) errors.push(`Required copy missing: ${n}`);
  for (const n of ['Senior SOC Analyst','production SOC analyst']) if (html.includes(n)) errors.push(`Obsolete copy present: ${n}`);
  const assets = [...html.matchAll(/(?:src|href)="\.\/([^"?#]+\.(?:css|js))(?:\?[^"]*)?"/g)].map(m => new URL(m[1], base).href);
  if (!assets.length) errors.push('No same-origin CSS/JS assets found');
  const assetResults = [];
  for (const a of assets) { const ar = await get(`${a}${a.includes('?')?'&':'?'}qa=${Date.now()}`); assetResults.push({url:a,status:ar.status,ok:ar.ok}); if(!ar.ok) errors.push(`Asset failed: ${a} HTTP ${ar.status}`); }
  await mkdir('reports',{recursive:true});
  await writeFile('reports/production-audit.json', JSON.stringify({ok:!errors.length,url,headers,assets:assetResults,errors},null,2));
} catch (e) { errors.push(sanitize(e)); await mkdir('reports',{recursive:true}); await writeFile('reports/production-audit.json', JSON.stringify({ok:false,errors},null,2)); }
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('Production audit passed');
