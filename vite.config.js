import {defineConfig} from 'vite';
import {fileURLToPath} from 'url';
import {resolve} from 'path';

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

                                    rollupOptions: {
                                        external: [
                                            'lit',
                                            'lit/directives/unsafe-html.js',
                                            'lit/directives/class-map.js',
                                            'lit/directives/style-map.js',
                                            'lit/directives/repeat.js'
                                        ],
                                        output: {
                                            globals: {
                                                lit: 'Lit',
                                                'lit/directives/unsafe-html.js': 'Lit',
                                                'lit/directives/class-map.js': 'Lit',
                                                'lit/directives/style-map.js': 'Lit',
                                                'lit/directives/repeat.js': 'Lit'
                                            }
                                        }
                                    },

                                    outDir: 'dist',
                                    emptyOutDir: true
                                }
                            });