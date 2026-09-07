// GitHub Pages supports CSP through HTML; Sites also sets it as an HTTP header.
export const contentSecurityPolicy = [
  "default-src 'self'", "base-uri 'self'", "connect-src 'self'", "font-src 'self'",
  "form-action 'none'", "img-src 'self' data:", "object-src 'none'",
  "script-src 'self' 'unsafe-inline'", "style-src 'self' 'unsafe-inline'",
  "upgrade-insecure-requests",
].join("; ");
