import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

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
    // Copy static assets unchanged
    viteStaticCopy({
      targets: [
        { src: 'assets/Images', dest: 'assets' },
        { src: 'assets/css', dest: 'assets' },
        { src: 'assets/js', dest: 'assets' },
        { src: 'assets/locales', dest: 'assets' },
        { src: 'assets/pdfs', dest: 'assets' },
        { src: 'assets/Jamie Ramsden CV.pdf', dest: 'assets' },
        { src: 'assets/Jamie Ramsden Cover Letter.pdf', dest: 'assets' },
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
