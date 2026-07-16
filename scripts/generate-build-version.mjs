import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const supplied = process.env.VITE_BUILD_VERSION;
const sanitize = value => String(value).trim().toLowerCase().replace(/[^0-9a-z._-]/g, '').slice(0, 12);

function walk(input) {
  const full = path.join(root, input);
  if (!existsSync(full)) return [];
  const st = statSync(full);
  if (st.isFile()) return [input];
  return readdirSync(full).flatMap(name => walk(path.join(input, name))).sort();
}

function deterministicVersion() {
  const inputs = [
    'index.html', 'style.css', 'assets/css', 'assets/js', 'assets/locales',
    'certificates.json', 'software.json', 'tools.json', 'package.json',
    'package-lock.json', 'vite.config.ts'
  ];
  const hash = createHash('sha256');
  for (const file of inputs.flatMap(walk).sort()) {
    hash.update(`${file}\0`);
    hash.update(readFileSync(path.join(root, file)));
    hash.update('\0');
  }
  return hash.digest('hex').slice(0, 12);
}

const version = supplied ? sanitize(supplied) : deterministicVersion();
if (!version) throw new Error('Unable to calculate VITE_BUILD_VERSION');
writeFileSync(path.join(root, '.env.production.local'), `VITE_BUILD_VERSION=${version}\n`, 'utf8');
console.log(`Wrote deterministic VITE_BUILD_VERSION=${version}`);
