import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Ensures all public asset paths (e.g. "/bg9.png", "/bottle.png") in the compiled
 * bundle are automatically prefixed with the GitHub Pages base repository path
 * so no images are ever broken or forgotten on GitHub Pages.
 */
function githubPagesAssetPlugin(base: string): Plugin {
  return {
    name: 'github-pages-asset-plugin',
    renderChunk(code) {
      if (!base || base === '/' || base === './') return null;
      const publicDir = path.resolve(__dirname, 'public');
      if (!fs.existsSync(publicDir)) return null;
      const files = fs.readdirSync(publicDir);
      if (files.length === 0) return null;

      const filePattern = files
        .map((f) => f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('|');

      const regex = new RegExp(`(["'])\\/(${filePattern})\\1`, 'g');
      return code.replace(regex, `$1${base}$2$1`);
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  const base = isProd ? '/Shake-gulp2.0/' : '/';

  return {
    base,
    plugins: [react(), tailwindcss(), githubPagesAssetPlugin(base)],
    server: {
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  };
});
