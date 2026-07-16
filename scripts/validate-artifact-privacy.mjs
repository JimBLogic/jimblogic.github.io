import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const args = new Map(process.argv.slice(2).map((v, i, a) => v.startsWith('--') ? [v, a[i + 1]] : []).filter(Boolean));
const distDir = path.resolve(process.cwd(), args.get('--dist-dir') || process.env.DIST_DIR || 'dist');
const forbidden = ['MyLinkedinInfo','SearchQueries.csv','ImportedContacts.csv','Email Addresses.csv','PhoneNumbers.csv','Logins.csv','messages.csv','Job Applications.csv'];
const found = [];
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const relative = path.relative(distDir, full).replaceAll('\\\\', '/');
    const lower = relative.toLowerCase();
    for (const marker of forbidden) if (lower.includes(marker.toLowerCase())) found.push(marker);
    if (statSync(full).isDirectory()) walk(full);
  }
}
walk(distDir);
if (found.length) {
  console.error(`Private LinkedIn export markers found in generated artifact: ${[...new Set(found)].join(', ')}`);
  process.exit(1);
}
console.log('Generated artifact privacy gate passed');
