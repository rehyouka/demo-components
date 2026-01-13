### map `src/pages/...` to `dist/pages/...`

```js
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { readdirSync, statSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

function computePageEntries() {
    const entries = {};
    const pagesDir = resolve(__dirname, 'src/pages');

    for (const dir of readdirSync(pagesDir)) {
        const fullDir = resolve(pagesDir, dir);
        if (!statSync(fullDir).isDirectory()) continue;

        const files = readdirSync(fullDir);
        for (const file of files) {
            if (!file.endsWith('.html')) continue;

            const name = file.replace('.html', '');
            const key = `/${dir}/${name}`;
            const value = `pages/${dir}/${file}`;
            entries[key] = value;
        }
    }

    return entries;
}

export default defineConfig({
    root: resolve(__dirname, 'src'),
    publicDir: resolve(__dirname, 'public'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: computePageEntries(),
        },
    },
});

```