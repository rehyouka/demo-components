import { css, html } from 'lit';
import { ConfigurableComponent } from "../utils/components.js";
import { DemoButton } from "./demo-button.js";
import { DemoLayoutFlexFit } from "./demo-layout-flex-fit.js";

export class DemoSignboard extends ConfigurableComponent {
    static styles = [
        ... ConfigurableComponent.styles,
        css`
            :host {
                display: block;

                --signboard-bg-img: var(--signboard-bg-img-x, inherit);
                --signboard-color-underline: var(--signboard-color-underline-x, inherit);
            }
            #container {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                background-image: var(--signboard-bg-img);
                background-clip: text;
                -webkit-background-clip: text;
                color: transparent;
            }
            #container > div {
                width: 100%;
            }
            #slogans {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                gap: 1em;
            }
            #slogans > h1 {
                font-size: 4.5em;
                overflow-wrap: break-word;
                word-break: break-word;
                white-space: normal;
            }
            demo-layout-flex-fit {
                margin-top: 3em;
                width: 100%;
            }
            demo-button {
                font-size: 1.5em;
                padding: 0.5em 1em;
            }
            #slogan-intro > span {
                color: var(--signboard-color-underline);
                animation: blink 1s infinite;
            }
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
            @media (max-width: 768px) {
                #slogans > h1 { font-size: 2.8em; }
                demo-button { font-size: 1.2em; width: 100%; padding: 0.5em 0; }
            }
        `
    ];
    static properties = {
        ... ConfigurableComponent.properties,
    };

    constructor() {
        super('demo-signboard');
    }

    render() {
        return html`
            <div id="container">
                <div id="slogans">
                    <h1 id="slogan-keyword"><b>${this._config[0]?.sloganKeyword},</b></h1>
                    <h2 id="slogan-intro"><b>${this._config[0]?.sloganIntro}</b> <span>_</span></h2>
                </div>
                <demo-layout-flex-fit>
                    <demo-button 
                            slot="lt" 
                            bordered 
                            rounded 
                            color-flippable
                            responsive
                            @click="${()=>this.onClickButton(this._config[0]?.buttonStart?.link)}"
                    >
                        ${this._config[0]?.buttonStart?.desc}
                    </demo-button>
                    <demo-button 
                            slot="rb" 
                            bordered 
                            rounded 
                            filled 
                            color-flippable
                            responsive
                            @click="${()=>this.onClickButton(this._config[0]?.buttonMore?.link)}"
                    >
                        ${this._config[0]?.buttonMore?.desc}
                    </demo-button>
                </demo-layout-flex-fit>
            </div>
        `;
    }
    onClickButton(url) {
        if (url?.length) {
            window.location.href = url;
        }
    }
}

customElements.define('demo-signboard', DemoSignboard);