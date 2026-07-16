import { mkdir, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { resolveLocalReferences } from './local-reference-utils.mjs';

const distDir = path.join(process.cwd(), '.tmp-local-reference-fixture');
await rm(distDir, { recursive: true, force: true });
await mkdir(path.join(distDir, 'assets', 'locales'), { recursive: true });
await writeFile(path.join(distDir, 'assets', 'index-example.js'), 'console.log("ok");');
await writeFile(path.join(distDir, 'assets', 'index-example.css'), 'body{}');
await writeFile(path.join(distDir, 'assets', 'file with spaces.pdf'), '%PDF-1.4');
await writeFile(path.join(distDir, 'assets', 'locales', 'en.json'), '{}');
const html = `
<a href="https://example.com/file.js">external</a>
<a href="mailto:user@example.com">mail</a>
<a href="tel:+34123456789">tel</a>
<a href="#maincontent">fragment</a>
<script src="./assets/index-example.js"></script>
<link href="./assets/index-example.css?v=123" rel="stylesheet">
<a href="./assets/file%20with%20spaces.pdf">pdf</a>
<a href="/assets/locales/en.json#section">locale</a>
`;
const result = resolveLocalReferences(html, distDir);
if (result.errors.length) throw new Error(result.errors.join('\n'));
const paths = result.references.map(ref => ref.pathname).sort();
const expected = ['assets/file with spaces.pdf', 'assets/index-example.css', 'assets/index-example.js', 'assets/locales/en.json'].sort();
if (JSON.stringify(paths) !== JSON.stringify(expected)) throw new Error(`Unexpected local refs: ${JSON.stringify(paths)}`);
for (const ref of result.references) if (!existsSync(ref.absolutePath)) throw new Error(`Expected fixture reference to exist: ${ref.pathname}`);
const missing = resolveLocalReferences('<script src="./assets/missing.js"></script>', distDir);
if (!missing.references.some(ref => ref.pathname === 'assets/missing.js')) throw new Error('Missing local file was not classified as local');
if (existsSync(missing.references[0].absolutePath)) throw new Error('Missing local fixture unexpectedly exists');
const traversal = resolveLocalReferences('<a href="../secret.txt">bad</a>', distDir);
if (!traversal.errors.some(error => error.includes('escapes dist directory'))) throw new Error('Path traversal was not rejected');
await rm(distDir, { recursive: true, force: true });
console.log('Local reference parser fixture passed');
