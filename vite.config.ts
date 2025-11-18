import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: '.',
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
        { src: 'assets', dest: '.' },
        { src: 'pdfs', dest: '.' },
        // Copy data JSON files used by runtime fetches
        { src: 'certificates.json', dest: '.' },
        { src: 'software.json', dest: '.' },
        { src: 'tools.json', dest: '.' },
        { src: 'robots.txt', dest: '.' },
        { src: 'sitemap.xml', dest: '.' }
      ]
    })
  ]
});
