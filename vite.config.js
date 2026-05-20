import {defineConfig} from 'vite';
import {fileURLToPath} from 'url';
import {resolve} from 'path';
import {visualizer} from 'rollup-plugin-visualizer';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

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
                                    cssCodeSplit: false,

                                    rollupOptions: {
                                        external: [
                                            'lit',
                                            'lit/directives/unsafe-html.js',
                                            'lit/directives/class-map.js',
                                            'lit/directives/style-map.js',
                                            'lit/directives/repeat.js',
                                            'lit/directives/if-defined.js',
                                        ],
                                        output: {
                                            globals: {
                                                lit: 'Lit',
                                                'lit/directives/unsafe-html.js': 'Lit',
                                                'lit/directives/class-map.js': 'Lit',
                                                'lit/directives/style-map.js': 'Lit',
                                                'lit/directives/repeat.js': 'Lit',
                                                'lit/directives/if-defined.js': 'Lit',
                                            }
                                        }
                                    },

                                    outDir: 'dist',
                                    emptyOutDir: true
                                },
                                plugins: [
                                    visualizer({
                                        open: true,
                                        gzipSize: true,
                                        brotliSize: true,
                                   })
                                ]
                            });