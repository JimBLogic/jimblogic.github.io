import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const appendQaStylesheet = {
  name: 'append-qa-stylesheet',
  enforce: 'post',
  transformIndexHtml(html) {
    return html.replace(
      '</head>',
      '  <link rel="stylesheet" href="./assets/css/qa-fixes.css">\n</head>'
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
    appendQaStylesheet,
    // Copy only explicitly public static assets unchanged.
    viteStaticCopy({
      targets: [
        { src: 'assets/Images', dest: '.' },
        { src: 'assets/css', dest: '.' },
        { src: 'assets/js', dest: '.' },
        { src: 'assets/locales', dest: '.' },
        { src: 'assets/pdfs', dest: '.' },
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
