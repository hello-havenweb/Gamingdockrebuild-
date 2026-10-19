import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

const getHtmlInputs = () => {
  const rootDir = process.cwd();
  const inputs: Record<string, string> = {
    main: path.resolve(rootDir, 'index.html'),
  };
  const rootPages = ['games', 'categories', 'about', 'contact', 'faq', 'privacy-policy', 'terms', '404'];
  rootPages.forEach((name) => {
    const filePath = path.resolve(rootDir, `${name}.html`);
    if (fs.existsSync(filePath)) {
      inputs[name] = filePath;
    }
  });

  const gamesDir = path.resolve(rootDir, 'games');
  if (fs.existsSync(gamesDir)) {
    fs.readdirSync(gamesDir).forEach((file) => {
      if (file.endsWith('.html')) {
        const entryKey = `games/${file.replace('.html', '')}`;
        inputs[entryKey] = path.resolve(gamesDir, file);
      }
    });
  }
  return inputs;
};

export default defineConfig(() => {
  return {
    base: process.env.BASE_PATH || './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    build: {
      rollupOptions: {
        input: getHtmlInputs(),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

