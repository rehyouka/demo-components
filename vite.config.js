import {defineConfig} from 'vite';
import {fileURLToPath} from 'url';
import {join, resolve} from 'path';
import {existsSync, readdirSync, readFileSync, statSync, writeFileSync} from 'fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Recursively reads all SVG files in the directory
 * @param {string} dir
 * @param {string} basePath
 * @returns {Record<string, string>}
 */
function readSvgFiles(dir, basePath = '') {
    const icons = {};
    const entries = readdirSync(dir, {withFileTypes: true});

    for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        const relativePath = basePath ? basePath + '/' + entry.name : entry.name;

        if (entry.isDirectory()) {
            Object.assign(icons, readSvgFiles(fullPath, relativePath));
        } else if (entry.isFile() && entry.name.endsWith('.svg')) {
            const name = entry.name.replace('.svg', '');
            const key = basePath ? basePath + '/' + name : name;
            icons[key] = readFileSync(fullPath, 'utf-8');
        }
    }

    return icons;
}

/**
 * build map for icons >> src/icons.js
 */
function buildIconMap() {
    const iconSourceDir = resolve(__dirname, 'src/assets/icons');
    const outputFile = resolve(__dirname, 'src/icons.js');
    const iconMap = {};

    try {
        if (existsSync(iconSourceDir) && statSync(iconSourceDir).isDirectory()) {
            Object.assign(iconMap, readSvgFiles(iconSourceDir));
        }

        const entries = Object.entries(iconMap)
            .map(function ([key, value]) {
                const escaped = value
                    .replace(/\\/g, '\\\\')
                    .replace(/`/g, '\\`')
                    .replace(/\${/g, '\\${');

                return "  '" + key + "': `" + escaped + "`";
            })
            .join(',\n');

        const code =
            `// ======================================================
// ⚠️ GENERATED FILE - DO NOT EDIT MANUALLY
// This file is generated at dev/build time.
// ======================================================

export const iconMap = {
${entries}
};

export function getIcon(category, name, style) {
  if (!category?.length || !name?.length || !style?.length) {
    return '<svg viewBox="0 0 24 24"></svg>';
  }
  const key = \`\${category}/\${style}/\${name}\`;
  return iconMap[key] || '<svg viewBox="0 0 24 24"></svg>';
}
`;

        writeFileSync(outputFile, code, 'utf-8');

        console.log(`✓ Icon map generated (${Object.keys(iconMap).length} icons)`);
    } catch (err) {
        console.warn('Warning: icon map generation failed:', err && err.message);

        const fallback =
            `// GENERATED FILE (fallback)
export const iconMap = {};
export function getIcon(category, name, style) {
  return '<svg viewBox="0 0 24 24"></svg>';
}
`;

        writeFileSync(outputFile, fallback, 'utf-8');
    }
}
buildIconMap();

export default defineConfig({
                                build: {
                                    lib: {
                                        entry: resolve(__dirname, 'src/index.js'),
                                        name: 'DemoComponents',
                                        fileName: function (format) {
                                            return 'demo-components.' + format + '.js';
                                        },
                                        formats: ['es']
                                    },

                                    rollupOptions: {
                                        external: [
                                            'lit',
                                            'lit/directives/unsafe-html.js',
                                            'lit/directives/class-map.js'
                                        ],
                                        output: {
                                            globals: {
                                                lit: 'Lit',
                                                'lit/directives/unsafe-html.js': 'Lit',
                                                'lit/directives/class-map.js': 'Lit'
                                            }
                                        }
                                    },

                                    outDir: 'dist',
                                    emptyOutDir: true
                                }
                            });