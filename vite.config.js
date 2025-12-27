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
                                            'lit/directives/unsafe-html.js'
                                        ],
                                        output: {
                                            globals: {
                                                lit: 'Lit',
                                                'lit/directives/unsafe-html.js': 'Lit'
                                            }
                                        }
                                    },

                                    outDir: 'dist',
                                    emptyOutDir: true
                                }
                            });