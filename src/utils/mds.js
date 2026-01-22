import markdownit from 'markdown-it';
import {htmls} from './xss.js';
import hljs from 'highlight.js/lib/core'
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import plaintext from 'highlight.js/lib/languages/plaintext';
import shell from 'highlight.js/lib/languages/shell';
import css from 'highlight.js/lib/languages/css';
import yaml from 'highlight.js/lib/languages/yaml';
import properties from 'highlight.js/lib/languages/properties';
import python from 'highlight.js/lib/languages/python';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
// import typescript from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('java', java);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('plaintext', plaintext);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('css', css);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('properties', properties);
hljs.registerLanguage('python', python);
hljs.registerLanguage('dockerfile', dockerfile);

const _config_default = {
    html: false,
    linkify: true,
    breaks: true,
    highlight(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs"><code>${hljs.highlight(code, {language: lang, ignoreIllegals: true}).value}</code></pre>`;
            } catch (_) {
            }
        }
        return `<pre class="hljs"><code>${hljs.highlight(code, {language: 'plaintext'}).value}</code></pre>`;
    },
};

export async function fetchMarkdown(name, config = {}) {
    if (name?.length) {
        try {
            const res = await fetch(`/mds/${name}.md`);
            if (!res?.ok) {
                throw new Error(`Failed to fetch markdown [${name}]`);
            }
            const txt = await res?.text();
            if (!txt?.length) {
                throw new Error(`The content of fetched markdown [${name}] is blank`);
            }
            const md = markdownit({
                                      ..._config_default,
                                      ...config,
                                  });
            console.trace(`markdown configuration merged is [${JSON.stringify(md)}]`);
            const dirty = md.render(txt || '');
            return htmls(dirty);
        } catch (err) {
            console.error(`fetchMarkdown(name=${name}, config=${JSON.stringify(config)}) occurs error.`, err);
        }
    }
}