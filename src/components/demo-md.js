import {ConfigurableComponent} from '../utils/components.js';
import {css} from 'lit';
import lightStyleInline from 'highlight.js/styles/github.css?inline';
import darkStyleInline from 'highlight.js/styles/github-dark.css?inline';
import {fetchMarkdown} from '../utils/mds.js';
import {safeHTML} from '../utils/xss.js';
import {addThemeListener, removeThemeListener} from '../utils/theme.js';
import {isDarkPreferred} from '../utils/theme.js';

const lightStyleSheet = new CSSStyleSheet();
lightStyleSheet.replaceSync(lightStyleInline);
const darkStyleSheet = new CSSStyleSheet();
darkStyleSheet.replaceSync(darkStyleInline);

export class DemoMd extends ConfigurableComponent {
    static styles = [
        ...ConfigurableComponent.styles,
        css`
            :host {
                display: block;
                font-family: sans-serif;
            }

            :host([data-theme='light']) {
                --hljs-bg: #fafafb;
                --hljs-fg: #393a34;
            }

            :host([data-theme='dark']) {
                --hljs-bg: #292929;
                --hljs-fg: #D4D4D4;
            }

            pre.hljs {
                padding: 1em;
                border-radius: 6px;
                overflow-x: auto;
                margin: 1em 0;
                background-color: var(--hljs-bg);
                color: var(--hljs-fg);
                position: relative;
            }

            img {
                max-width: 100%;
                height: auto;
            }

            .copy-btn {
                position: absolute;
                top: 8px;
                right: 8px;
                z-index: 1;
                font-size: 12px;
                line-height: 1;
                padding: 6px 8px;
                border-radius: 6px;
                border: 1px solid #0000001A;
                background: #FFFFFFD9;
                color: #333;
                cursor: pointer;
                user-select: none;
                transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;
                opacity: 0.5;
            }

            pre.hljs:hover .copy-btn {
                opacity: 1;
            }

            .copy-btn:hover {
                background: #fff;
                border-color: #00000033;
            }

            .copy-btn:active {
                transform: translateY(1px);
            }

            :host([data-theme="dark"]) .copy-btn {
                background: #202020D9;
                color: #ddd;
                border-color: #FFFFFF1F;
            }

            :host([data-theme="dark"]) .copy-btn:hover {
                background: #303030F2;
                border-color: #FFFFFF2E;
            }

            .copy-btn.copied {
                background: #22c55e;
                color: white;
                border-color: #22c55e;
            }

            :host([data-theme="dark"]) .copy-btn.copied {
                background: #16a34a;
                border-color: #16a34a;
            }
        `,
    ];
    static properties = {
        ...ConfigurableComponent.properties,
        fileName: {attribute: 'file-name',},
        _html: {state: true,},
        _isDark: { state: true, },
    };
    constructor() {
        super('demo-md');
        this.fileName = '';
        this._html = null;
        this._isDark = isDarkPreferred();
        this._onToggleTheme = this.onToggleTheme.bind(this);

        this._copyResetTimers = new WeakMap();
    }

    render() {
        return safeHTML(this._html);
    }
    connectedCallback() {
        super.connectedCallback();
        addThemeListener(this._onToggleTheme);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        removeThemeListener(this._onToggleTheme);

        this._copyResetTimers.forEach((t) => clearTimeout(t));
        this._copyResetTimers = new WeakMap();
    }
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this.onChangeIsDark();

        this._enhanceCodeBlocks();
    }
    async updated(changedProperties) {
        await super.updated(changedProperties);
        if (changedProperties.has('fileName') || changedProperties.has('configName')) {
            this._html = await fetchMarkdown(this.fileName, Array.isArray(this._config)?this._config[0]:undefined);
        }
        if (changedProperties.has('_isDark')) {
            this.onChangeIsDark();
            this.setAttribute('data-theme', this._isDark ? 'dark' : 'light');
        }
        if (changedProperties.has('_html')) {
            this._enhanceCodeBlocks();
        }
    }

    onToggleTheme(e) {
        const isDark = e?.detail?.dark;
        if (isDark !== this._isDark) {
            this._isDark = isDark;
        }
    }
    onChangeIsDark() {
        const currentStyleSheets = this.renderRoot.adoptedStyleSheets ?? [];
        const filteredStyleSheets = currentStyleSheets.filter(sheet => sheet !== lightStyleSheet && sheet !== darkStyleSheet);
        this.renderRoot.adoptedStyleSheets = [
            ...filteredStyleSheets,
            this._isDark ? darkStyleSheet : lightStyleSheet,
        ];
    }

    _enhanceCodeBlocks() {
        const pres = Array.from(this.renderRoot.querySelectorAll('pre'));

        pres.forEach((preEl) => {
            const codeEl = preEl.querySelector('code') || preEl;
            const codeText = codeEl?.textContent?.trim();
            if (!codeText) return;
            if (preEl.dataset.hasCopy === 'true') return;

            const btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.type = 'button';
            btn.textContent = 'copy';
            btn.setAttribute('aria-label', 'copy code');
            btn.setAttribute('title', 'copy code');

            btn.addEventListener('click', async (ev) => {
                ev.preventDefault();
                const textToCopy = codeEl.textContent ?? '';
                const ok = await this._copyText(textToCopy);
                this._flashCopied(btn, ok);
            });

            preEl.appendChild(btn);
            preEl.dataset.hasCopy = 'true';
        });
    }

    async _copyText(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                return true;
            }
        } catch (_) {}
    }

    _flashCopied(btn, ok) {
        const prevTimer = this._copyResetTimers.get(btn);
        if (prevTimer) clearTimeout(prevTimer);

        const originalText = btn.textContent || 'copy';
        if (ok) {
            btn.textContent = 'copied';
            btn.classList.add('copied');
        } else {
            btn.textContent = 'failed';
            btn.classList.remove('copied');
        }

        const timer = setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('copied');
            this._copyResetTimers.delete(btn);
        }, 1200);

        this._copyResetTimers.set(btn, timer);
    }
}

customElements.define('demo-md', DemoMd);