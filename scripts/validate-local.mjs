import fs from 'node:fs';
import path from 'node:path';

const langs = ['en', 'es', 'ca'];
const locales = Object.fromEntries(langs.map(lang => [lang, JSON.parse(fs.readFileSync(`assets/locales/${lang}.json`, 'utf8'))]));
const keys = Object.keys(locales.en).sort();
for (const lang of langs) {
  const langKeys = Object.keys(locales[lang]).sort();
  if (JSON.stringify(langKeys) !== JSON.stringify(keys)) throw new Error(`Locale key mismatch: ${lang}`);
  const dist = JSON.parse(fs.readFileSync(`dist/assets/locales/${lang}.json`, 'utf8'));
  if (JSON.stringify(dist) !== JSON.stringify(locales[lang])) throw new Error(`Dist locale mismatch: ${lang}`);
}

for (const file of ['index.html', 'dist/index.html']) {
  const base = file.startsWith('dist/') ? 'dist' : '.';
  const html = fs.readFileSync(file, 'utf8');
  const refs = [...html.matchAll(/\s(?:src|href)=["']([^"']+)["']/gi)].map(match => match[1]);
  for (const url of refs) {
    if (!url || /^(https?:|mailto:|#|data:)/.test(url)) continue;
    const clean = decodeURIComponent(url.split('?')[0].split('#')[0].replace(/^\.\//, ''));
    if (clean.startsWith('/')) continue;
    const target = path.join(base, clean);
    if (!fs.existsSync(target)) throw new Error(`${file}: missing local reference ${url} -> ${target}`);
  }
}

for (const file of ['index.html', 'dist/index.html', 'assets/js/translate.js']) {
  const text = fs.readFileSync(file, 'utf8');
  for (const bad of ['Ethical Hacker | AWS Cloud Practitioner', 'developed expertise across multiple domains', 'I help teams', 'triar alertas', 'triar alertes']) {
    if (text.includes(bad)) throw new Error(`${file}: obsolete string found: ${bad}`);
  }
}
console.log('local validation passed');
