import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

function getGitVersion() {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
  }
}

const version = getGitVersion();
writeFileSync('.env.production.local', `VITE_BUILD_VERSION=${version}\n`, 'utf8');
console.log(`Wrote VITE_BUILD_VERSION=${version}`);
