import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const buildVersion = process.env.VITE_BUILD_VERSION || 'dev';

const hardenGeneratedHtml = {
  name: 'harden-generated-html',
  enforce: 'post',
  transformIndexHtml(html) {
    const withPlausibleCsp = html.replace(
      "script-src 'self' https://unpkg.com https://cdn.jsdelivr.net;",
      "script-src 'self' https://unpkg.com https://cdn.jsdelivr.net https://plausible.io;"
    );

    const withStabilityStyles = withPlausibleCsp.replace(
      '</head>',
      [
        '  <link rel="stylesheet" href="./assets/css/qa-fixes.css">',
        `  <link rel="stylesheet" href="./assets/css/stability-hotfix.css?v=${buildVersion}">`,
        '</head>'
      ].join('\n')
    );

    return withStabilityStyles.replace(
      '</body>',
      [
        `  <script type="module" src="./assets/js/stability-hotfix.js?v=${buildVersion}"></script>`,
        '</body>'
      ].join('\n')
    );
  }
};

export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      input: 'index.html'
    }
  },
  plugins: [
    hardenGeneratedHtml,
    // Copy only explicitly public static assets unchanged.
    viteStaticCopy({
      targets: [
        { src: 'assets/Images', dest: '.' },
        { src: 'assets/css', dest: '.' },
        { src: 'assets/js', dest: '.' },
        { src: 'assets/locales', dest: '.' },
        { src: 'assets/pdfs', dest: '.' },
        { src: 'assets/data', dest: '.' },
        { src: 'assets/Jamie Ramsden CV.pdf', dest: '.' },
        { src: 'assets/Jamie Ramsden Cover Letter.pdf', dest: '.' },
        { src: 'UpgradeHub', dest: '.' },
        // Copy data JSON files used by runtime fetches
        { src: 'certificates.json', dest: '.' },
        { src: 'software.json', dest: '.' },
        { src: 'tools.json', dest: '.' },
        { src: 'robots.txt', dest: '.' },
        { src: 'sitemap.xml', dest: '.' },
        { src: 'LICENSE', dest: '.' }
      ]
    })
  ]
});
