import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const obsolete = [
  'Ethical Hacker | AWS Cloud Practitioner',
  'developed expertise across multiple domains',
  'proven track record',
  'I help teams',
  'triar alertas',
  'triar alertes'
];
const requiredCopy = ['Junior SOC Analyst', 'Blue Team', 'Current Focus', 'Raspberry Pi 4', 'jrf91@pm.me'];
const locales = ['en', 'es', 'ca'];
const posix = p => p.split(path.sep).join('/');
const fail = msg => failures.push(msg);
const read = rel => readFile(path.join(root, rel), 'utf8');

async function parseJson(rel) {
  try { return JSON.parse(await read(rel)); } catch (error) { fail(`Invalid JSON in ${rel}: ${error.message}`); return null; }
}
function flattenKeys(obj, prefix = '') {
  return Object.keys(obj || {}).flatMap(k => {
    const key = prefix ? `${prefix}.${k}` : k;
    return obj[k] && typeof obj[k] === 'object' && !Array.isArray(obj[k]) ? flattenKeys(obj[k], key) : [key];
  }).sort();
}
async function walk(dir) {
  const out = [];
  if (!existsSync(path.join(root, dir))) return out;
  for (const entry of await readdir(path.join(root, dir))) {
    const rel = path.join(dir, entry);
    const s = await stat(path.join(root, rel));
    if (s.isDirectory()) out.push(...await walk(rel)); else out.push(posix(rel));
  }
  return out;
}
function checkLocalTarget(from, target) {
  if (!target || target.includes('${') || /^(https?:|mailto:|tel:|#|data:|javascript:)/i.test(target)) return;
  const clean = decodeURI(target.split('#')[0].split('?')[0]).replace(/^\.\//, '');
  if (!clean) return;
  const base = from.startsWith('dist/') ? 'dist' : '';
  if (!existsSync(path.join(root, base, clean))) fail(`${from} references missing local asset/link: ${target}`);
}

const localeData = Object.fromEntries(await Promise.all(locales.map(async l => [l, await parseJson(`assets/locales/${l}.json`)])));
const baseKeys = flattenKeys(localeData.en);
for (const lang of locales.slice(1)) {
  const keys = flattenKeys(localeData[lang]);
  const missing = baseKeys.filter(k => !keys.includes(k));
  const extra = keys.filter(k => !baseKeys.includes(k));
  if (missing.length || extra.length) fail(`${lang} locale key parity failed. missing=${missing.join(',')} extra=${extra.join(',')}`);
}
for (const rel of ['certificates.json', 'software.json', 'tools.json']) await parseJson(rel);

const index = await read('index.html');
for (const needle of requiredCopy) if (!index.includes(needle)) fail(`index.html missing required copy: ${needle}`);
for (const bad of obsolete) if (index.includes(bad)) fail(`Obsolete copy found in index.html: ${bad}`);
const sourceTextFiles = ['index.html', 'assets/js/script.js', 'assets/js/translate.js', ...(await walk('assets/locales'))];
for (const rel of sourceTextFiles) {
  const text = await read(rel);
  for (const bad of obsolete) if (text.includes(bad)) fail(`Obsolete copy found in ${rel}: ${bad}`);
  for (const match of text.matchAll(/(?:href|src)=['"]([^'"]+)['"]/g)) checkLocalTarget(rel, match[1]);
  for (const match of text.matchAll(/['"](\.\.?\/[^'"]+)['"]/g)) checkLocalTarget(rel, match[1]);
}

if (!existsSync(path.join(root, 'dist/index.html'))) fail('dist/index.html is missing; run npm run build before validate:local');
else {
  const distIndex = await read('dist/index.html');
  const fp = distIndex.match(/<meta name="build-version" content="([^"]+)"/i)?.[1];
  if (!fp || fp.includes('%') || !/^[a-zA-Z0-9._-]{4,}$/.test(fp)) fail(`Malformed or missing build fingerprint: ${fp || 'missing'}`);
  for (const needle of requiredCopy) if (!distIndex.includes(needle)) fail(`dist/index.html missing required copy: ${needle}`);
  for (const bad of obsolete) if (distIndex.includes(bad)) fail(`Obsolete copy found in dist/index.html: ${bad}`);
  for (const match of distIndex.matchAll(/(?:href|src)=['"]([^'"]+)['"]/g)) checkLocalTarget('dist/index.html', match[1]);
  for (const match of distIndex.matchAll(/(?:href|src)=['"]\.\/assets\/([^'"]+)['"]/g)) {
    if (!existsSync(path.join(root, 'dist/assets', decodeURI(match[1])))) fail(`dist/index.html references missing hashed asset: ${match[0]}`);
  }
  for (const lang of locales) {
    const distLocale = await parseJson(`dist/assets/locales/${lang}.json`);
    if (JSON.stringify(distLocale) !== JSON.stringify(localeData[lang])) fail(`Locale source-to-dist mismatch for ${lang}`);
  }
}
const changedBinary = (await walk('dist')).filter(f => /\.(png|jpe?g|gif|webp|pdf|zip|woff2?)$/i.test(f));
if (changedBinary.some(f => !existsSync(path.join(root, f)))) fail('Unexpected binary diff state detected');
if (failures.length) { console.error(`validate-local failed (${failures.length})`); failures.forEach(f => console.error(`- ${f}`)); process.exit(1); }
console.log('validate-local passed');
