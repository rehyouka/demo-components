import markdownit from 'markdown-it';
import hljs from 'highlight.js';
import {htmls} from './xss.js';

const _config_default = {
    html: false,
    linkify: true,
    breaks: true,
    highlight(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs"><code>${hljs.highlight(code, {language: lang}).value}</code></pre>`;
            } catch (_) {
            }
        }
        return `<pre class="hljs"><code>${hljs.highlightAuto(code).value}</code></pre>`;
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