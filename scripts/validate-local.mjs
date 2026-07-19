import { readFile, stat } from 'node:fs/promises';
import { existsSync, readdirSync } from 'node:fs';
import { Buffer } from 'node:buffer';
import path from 'node:path';
import { resolveLocalReferences } from './local-reference-utils.mjs';

const root = process.cwd();
const argDist = process.argv.find((a, i) => process.argv[i - 1] === '--dist-dir');
const distDir = path.resolve(root, argDist || process.env.DIST_DIR || 'dist');
const errors = [];
const fail = msg => errors.push(msg);
const rel = p => path.relative(root, p) || '.';
const join = (...p) => path.join(...p);
const mustExist = async p => { if (!existsSync(p)) fail(`Missing required file: ${rel(p)}`); else if ((await stat(p)).size === 0) fail(`Zero-byte generated file: ${rel(p)}`); };
const read = p => readFile(p, 'utf8');
const readJson = async p => JSON.parse(await read(p));
const stable = value => JSON.stringify(value);

for (const f of ['index.html','assets/locales/en.json','assets/locales/es.json','assets/locales/ca.json','certificates.json','software.json','tools.json','assets/pdfs/Jaime Ramsden de Frutos CV.pdf']) await mustExist(join(root, f));
for (const f of ['index.html','certificates.json','software.json','tools.json','assets/locales/en.json','assets/locales/es.json','assets/locales/ca.json']) await mustExist(join(distDir, f));

let html = '';
try { html = await read(join(distDir, 'index.html')); } catch { html = ''; }
if (!/<html[\s>]/i.test(html) || !/<\/html>\s*$/i.test(html)) fail('Generated HTML is not structurally complete');
if ((html.match(/<\/html>/gi) || []).length !== 1) fail('Duplicate or missing closing HTML tag in generated HTML');
if (/%VITE_[A-Z0-9_]+%/.test(html)) fail('Generated HTML contains unresolved Vite placeholders');

const locales = {};
for (const lang of ['en','es','ca']) {
  try { locales[lang] = await readJson(join(root, `assets/locales/${lang}.json`)); } catch (e) { fail(`Invalid source locale ${lang}: ${e.message}`); }
}
const enKeys = Object.keys(locales.en || {}).sort();
for (const lang of ['es','ca']) if (stable(enKeys) !== stable(Object.keys(locales[lang] || {}).sort())) fail(`Locale key parity failed: en vs ${lang}`);
for (const lang of ['en','es','ca']) {
  try { if (stable(locales[lang]) !== stable(await readJson(join(distDir, `assets/locales/${lang}.json`)))) fail(`Generated locale differs from source: ${lang}`); } catch (e) { fail(`Invalid generated locale ${lang}: ${e.message}`); }
}
for (const file of ['certificates.json','software.json','tools.json']) {
  try { if (stable(await readJson(join(root,file))) !== stable(await readJson(join(distDir,file)))) fail(`Generated ${file} differs from source`); } catch (e) { fail(`Invalid JSON parity for ${file}: ${e.message}`); }
}

try {
  const certificates = await readJson(join(root, 'certificates.json'));
  for (const certificate of certificates.filter(item => item.badgeLocal)) {
    const badge = String(certificate.badgeLocal).replaceAll('\\', '/');
    if (path.isAbsolute(badge) || badge.split('/').includes('..')) {
      fail(`Unsafe local certificate badge path: ${badge}`);
      continue;
    }
    const sourceBadge = join(root, 'assets', 'Images', 'certs', badge);
    const generatedBadge = join(distDir, 'assets', 'Images', 'certs', badge);
    await mustExist(sourceBadge);
    await mustExist(generatedBadge);
    if (!existsSync(sourceBadge)) continue;
    const bytes = await readFile(sourceBadge);
    const extension = path.extname(badge).toLowerCase();
    const isPng = bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    if ((extension === '.png' && !isPng) || (['.jpg', '.jpeg'].includes(extension) && !isJpeg)) fail(`Certificate badge content does not match its extension: ${badge}`);
  }
} catch (e) { fail(`Invalid certificate badge inventory: ${e.message}`); }

const version = process.env.VITE_BUILD_VERSION?.toLowerCase().replace(/[^0-9a-z._-]/g, '').slice(0, 12);
const meta = html.match(/<meta name="build-version" content="([^"]+)"/i);
if (!meta) fail('Generated build-version meta tag is missing');
else if (version && meta[1] !== version) fail(`Generated build-version ${meta[1]} does not match expected ${version}`);


const privateNames = ['MyLinkedinInfo','SearchQueries.csv','ImportedContacts.csv','Email Addresses.csv','PhoneNumbers.csv','Logins.csv','messages.csv','Job Applications.csv'];
const generatedPaths = existsSync(distDir) ? readdirSync(distDir, { recursive: true, withFileTypes: true })
  .filter(d => d.isFile() || d.isDirectory())
  .map(d => path.relative(distDir, path.join(d.parentPath || d.path, d.name)).replaceAll('\\', '/')) : [];
const generatedPdfs = generatedPaths.filter(generated => /\.pdf$/i.test(generated)).sort();
const expectedGeneratedPdfs = ['assets/pdfs/Jaime Ramsden de Frutos CV.pdf'];
if (stable(generatedPdfs) !== stable(expectedGeneratedPdfs)) {
  fail(`Generated PDF allowlist mismatch: expected ${expectedGeneratedPdfs.join(', ')}, found ${generatedPdfs.join(', ') || 'none'}`);
}
for (const name of privateNames) {
  const lower = name.toLowerCase();
  if (generatedPaths.some(generated => generated.toLowerCase().includes(lower))) fail(`Private LinkedIn export marker found in generated artifact: ${name}`);
  if (html.toLowerCase().includes(lower)) fail(`Private LinkedIn export marker referenced by generated HTML: ${name}`);
}

const { references: localRefs, errors: localRefErrors } = resolveLocalReferences(html, distDir);
for (const error of localRefErrors) fail(error);
const refs = localRefs.map(ref => ref.pathname);
const assetsDir = join(distDir, 'assets');
const assets = existsSync(assetsDir) ? readdirSync(assetsDir, { recursive: true, withFileTypes: true }).filter(d => d.isFile()).map(d => path.join(d.parentPath || d.path, d.name)) : [];
if (!refs.some(r => /^assets\/index-[\w-]+\.js$/.test(r))) fail('Hashed JavaScript bundle is not referenced');
if (!refs.some(r => /^assets\/index-[\w-]+\.css$/.test(r))) fail('Hashed CSS bundle is not referenced');
for (const ref of localRefs) if (!existsSync(ref.absolutePath)) fail(`Same-origin generated reference is missing: ${ref.pathname}`);
for (const ref of localRefs.filter(r => /\.pdf$/i.test(r.pathname))) if (!existsSync(ref.absolutePath)) fail(`PDF/CV reference missing: ${ref.pathname}`);
for (const f of assets) if ((await stat(f)).size === 0) fail(`Zero-byte generated file: ${rel(f)}`);
for (const needle of ['Junior SOC Analyst / Blue Team','Raspberry Pi 4','Current Focus','mailto:jrf91@pm.me','github.com/JimBLogic','linkedin.com/in/jimblogic']) if (!html.includes(needle)) fail(`Missing source-derived content in generated HTML: ${needle}`);
if (html.includes('Senior SOC Analyst') || html.includes('production SOC analyst')) fail('Generated HTML contains obsolete positioning copy');

const report = { ok: errors.length === 0, distDir: rel(distDir), errors };
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exit(1);
