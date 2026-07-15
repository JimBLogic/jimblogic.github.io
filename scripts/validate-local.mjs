import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const warn = [];
const must = (ok, msg) => { if (!ok) errors.push(msg); };
const json = async p => JSON.parse(await readFile(path.join(root,p),'utf8'));
const files = ['index.html','dist/index.html','assets/locales/en.json','assets/locales/es.json','assets/locales/ca.json','dist/assets/locales/en.json','dist/assets/locales/es.json','dist/assets/locales/ca.json','certificates.json','software.json','tools.json','dist/certificates.json','dist/software.json','dist/tools.json'];
for (const f of files) must(existsSync(path.join(root,f)), `Missing required file: ${f}`);

const locales = Object.fromEntries(await Promise.all(['en','es','ca'].map(async l => [l, await json(`assets/locales/${l}.json`)])));
const keys = Object.fromEntries(Object.entries(locales).map(([l,o]) => [l, Object.keys(o).sort()]));
for (const l of ['es','ca']) {
  must(JSON.stringify(keys.en) === JSON.stringify(keys[l]), `Locale key parity failed: en vs ${l}`);
}
for (const l of ['en','es','ca']) {
  const built = await json(`dist/assets/locales/${l}.json`);
  must(JSON.stringify(locales[l]) === JSON.stringify(built), `Built locale differs from source: ${l}`);
}
for (const [f, label] of [['certificates.json','certificates'],['software.json','software'],['tools.json','tools']]) {
  const src = await json(f); const dst = await json(`dist/${f}`);
  must(Array.isArray(src), `${label} must be an array`);
  must(JSON.stringify(src) === JSON.stringify(dst), `Built ${f} differs from source`);
}
const html = await readFile('index.html','utf8');
const distHtml = await readFile('dist/index.html','utf8');
for (const needle of ['Junior SOC Analyst / Blue Team','Raspberry Pi 4','Current Focus','mailto:jrf91@pm.me','https://github.com/JimBLogic','https://www.linkedin.com/in/jimblogic/']) {
  must(html.includes(needle) || distHtml.includes(needle), `Required portfolio copy/link missing: ${needle}`);
}
for (const obsolete of ['Senior SOC Analyst','production SOC analyst']) {
  must(!html.includes(obsolete) && !distHtml.includes(obsolete), `Obsolete copy found: ${obsolete}`);
}
must(!/<\/html>\s*<\/html>/i.test(html + distHtml), 'Malformed duplicate HTML ending found');
const buildVersion = distHtml.match(/<meta name="build-version" content="([^"]+)"/);
must(buildVersion && /^(\d{4}-\d{2}-\d{2}T|[0-9a-f]{7,40})/.test(buildVersion[1]), 'Build fingerprint missing or invalid');
const assetRefs = [...distHtml.matchAll(/(?:src|href)="\.\/([^"?#]+)(?:\?[^"]*)?"/g)].map(m => m[1]).filter(v => !v.startsWith('#'));
for (const ref of assetRefs) must(existsSync(path.join(root,'dist',ref)), `Same-origin asset/link missing in dist: ${ref}`);
must(assetRefs.some(r => /^assets\/index-.*\.js$/.test(r)), 'Hashed built JavaScript not referenced');
must(assetRefs.some(r => /^assets\/index-.*\.css$/.test(r)) || distHtml.includes('assets/css/style.css'), 'Built CSS not referenced');
try {
  const status = execFileSync('git',['status','--porcelain','--untracked-files=no','dist','certificates.json','software.json','tools.json','assets/locales','index.html','style.css','assets/js'],{encoding:'utf8'}).trim();
  if (status) warn.push(`Tracked source/dist changes are present (expected while editing, fatal in CI clean-tree step): ${status.split('\n').join('; ')}`);
} catch (e) { warn.push('Git status check unavailable'); }
for (const f of files) await stat(path.join(root,f));
const report = { ok: errors.length === 0, errors, warnings: warn };
console.log(JSON.stringify(report,null,2));
if (errors.length) process.exit(1);
