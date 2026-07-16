import path from 'node:path';

const ignoredProtocols = new Set(['http:', 'https:', 'mailto:', 'tel:', 'data:', 'blob:', 'javascript:']);

export function extractSrcHrefValues(html) {
  return [...html.matchAll(/\b(?:src|href)\s*=\s*(["'])(.*?)\1/gi)].map(match => match[2].trim());
}

export function resolveLocalReferences(html, distDir) {
  const resolved = [];
  const errors = [];
  const distRoot = path.resolve(distDir);
  for (const rawValue of extractSrcHrefValues(html)) {
    if (!rawValue || rawValue.startsWith('#')) continue;
    if (rawValue.startsWith('//')) continue;
    if (!/^[a-z][a-z0-9+.-]*:/i.test(rawValue) && rawValue.split(/[?#]/, 1)[0].split('/').includes('..')) {
      errors.push(`Local reference escapes dist directory: ${rawValue}`);
      continue;
    }
    let parsed;
    try {
      parsed = new URL(rawValue, 'https://site.local/');
    } catch (error) {
      errors.push(`Unable to parse local reference: ${rawValue}`);
      continue;
    }
    if (ignoredProtocols.has(parsed.protocol) && /^[a-z][a-z0-9+.-]*:/i.test(rawValue)) continue;
    if (ignoredProtocols.has(parsed.protocol) && parsed.origin !== 'https://site.local') continue;
    let decodedPath;
    try {
      decodedPath = decodeURIComponent(parsed.pathname);
    } catch (error) {
      errors.push(`Unable to decode local reference: ${rawValue}`);
      continue;
    }
    const cleanPath = decodedPath.replace(/^\/+/, '').replace(/^\.\//, '');
    if (!cleanPath) continue;
    const absolutePath = path.resolve(distRoot, cleanPath);
    if (absolutePath !== distRoot && !absolutePath.startsWith(`${distRoot}${path.sep}`)) {
      errors.push(`Local reference escapes dist directory: ${rawValue}`);
      continue;
    }
    resolved.push({ raw: rawValue, pathname: cleanPath, absolutePath });
  }
  return { references: resolved, errors };
}
