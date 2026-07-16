import { readFile } from 'node:fs/promises';
import path from 'node:path';

const args = new Map(process.argv.slice(2).map((v, i, a) => v.startsWith('--') ? [v, a[i + 1]] : []).filter(Boolean));
const distDir = path.resolve(process.cwd(), args.get('--dist-dir') || process.env.DIST_DIR || 'dist');
const sourceVersion = args.get('--source-version') || process.env.GITHUB_SHA || process.env.VITE_BUILD_VERSION || '';
const canonical = String(sourceVersion).trim().toLowerCase().replace(/[^0-9a-f]/g, '').slice(0, 12);
const envVersion = String(process.env.VITE_BUILD_VERSION || '').trim().toLowerCase();
const html = await readFile(path.join(distDir, 'index.html'), 'utf8');
const metaVersion = html.match(/<meta name="build-version" content="([^"]+)"/i)?.[1];
const errors = [];
if (!canonical || canonical.length !== 12) errors.push(`Canonical build version is invalid for ${sourceVersion || 'empty source version'}`);
if (envVersion && envVersion !== canonical) errors.push(`VITE_BUILD_VERSION ${envVersion} does not match canonical ${canonical}`);
if (metaVersion !== canonical) errors.push(`Generated meta build-version ${metaVersion || 'missing'} does not match canonical ${canonical}`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Canonical build version verified: ${canonical}`);
