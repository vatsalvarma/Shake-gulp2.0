import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Recursively collects all relative web paths inside `public/`
 * (e.g., "bg9.png", "assets/images/Barley-544x652.png", "drinks/images/water.jpeg").
 */
function getAllPublicFiles(dir: string, rootDir: string = dir): string[] {
  let results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllPublicFiles(fullPath, rootDir));
    } else {
      const rel = path.relative(rootDir, fullPath).split(path.sep).join('/');
      results.push(rel);
    }
  }
  return results;
}

/**
 * Ensures all public asset paths (e.g. "/bg9.png", "/drinks/images/water.jpeg") in the
 * compiled production bundle are automatically prefixed with the GitHub Pages base path
 * so no images are ever broken or forgotten on GitHub Pages.
 */
function githubPagesAssetPlugin(base: string): Plugin {
  return {
    name: 'github-pages-asset-plugin',
    renderChunk(code) {
      if (!base || base === '/' || base === './') return null;
      const publicDir = path.resolve(__dirname, 'public');
      if (!fs.existsSync(publicDir)) return null;
      const files = getAllPublicFiles(publicDir);
      if (files.length === 0) return null;

      // Sort longest paths first so nested paths match before shorter substrings
      const filePattern = files
        .sort((a, b) => b.length - a.length)
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
