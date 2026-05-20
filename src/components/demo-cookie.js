import { ConfigurableComponent } from "../utils/components.js";
import { css, html } from 'lit';
import { DemoA } from "./demo-a.js";
import { DemoButton } from "./demo-button.js";
import { DemoBackdropStyles } from './demo-backdrop.js';

const LOCAL_STORAGE_KEY = 'demo-enabled-cookie-settings';
export function isCookieSettingsEnabled() {
    return localStorage.getItem(LOCAL_STORAGE_KEY) === 'true';
}

export class DemoCookie extends ConfigurableComponent {
    static styles = [
        ... ConfigurableComponent.styles,
        DemoBackdropStyles,
        css`
            :host {
                display: block;
                position: fixed;
                bottom: 0;
            }
            :host(.bookmark) {
                border-top-left-radius: 0.6em;
                border-top-right-radius: 0.6em;
                left: 3em;
                opacity: 1;
                visibility: visible;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }
            :host(.bookmark.scrolling) {
                opacity: 0;
                visibility: hidden;
            }
            #container {
                padding: 1em;
                transition: background-color 0.3s ease, color 0.3s ease;
                position: relative;
            }
            :host(.bookmark) > #container {
                display: flex;
                align-items: center;
                padding: 0.5em;
            }
            #prompt {
                line-height: 1.5em;
                word-spacing: 0.2em;
                letter-spacing: 0.05em;
                margin-top: 1em;
            }
            #buttons {
                margin-top: 0.5em;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: 0.5em;
            }
        `,
    ];
    static properties = {
        ... ConfigurableComponent.properties,
        _expanded: { type: Boolean, state: true, },
    };
    constructor() {
        super('demo-cookie');
        this._expanded = false;
    }
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        window.addEventListener('scroll', this._onScrollWindow);
    }
    render() {
        const enabled = isCookieSettingsEnabled();
        this.classList.toggle('bookmark', !this._expanded);
        return html`
            <div id="container" class="demo-backdrop-z-idx-above">
                ${ this._expanded
                    ? 
                        html`
                            <p id="prompt">
                                ${this._config[0]?.desc} <strong>To read Our Privacy Policy <demo-a underlined new-tab href="${this._config[0]?.link}">click here</demo-a>.</strong>
                            </p>
                            <div id="buttons">
                                ${
                                    enabled
                                    ? html`
                                        <demo-button id="deny" bordering @click="${()=>this.onClickButton(false)}">Deny</demo-button>
                                        <demo-button id="allow" bordered @click="${()=>this.onClickButton(true)}">Allow</demo-button>
                                    `
                                    : html`
                                        <demo-button id="deny" bordered @click="${()=>this.onClickButton(false)}">Deny</demo-button>
                                        <demo-button id="allow" bordering @click="${()=>this.onClickButton(true)}">Allow</demo-button>
                                    `
                                }
                            </div>
                        `
                   :    
                        html`
                            <demo-a underlined @click="${this.onClickBookmark}">Cookie settings</demo-a>
                        `
                }
            </div>
            <div class="demo-backdrop ${this._expanded?'active':''}" @click="${this.onClickBackdrop}"></div>
        `;
    }
    onClickBookmark() {
        this._expanded = !this._expanded;
    }
    onClickButton(accept) {
        localStorage.setItem(LOCAL_STORAGE_KEY, `${!!accept}`);
        this.onClickBookmark();
    }
    _scrollTimer;
    _onScrollWindow = () => {
        this.classList.toggle('scrolling', true);
        clearTimeout(this._scrollTimer);
        this._scrollTimer = setTimeout(() => this.classList.remove('scrolling'), 200);
    }
    onClickBackdrop() {
        this.onClickBookmark();
    }

}
customElements.define('demo-cookie', DemoCookie);