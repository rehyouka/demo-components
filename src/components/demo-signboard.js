import { css, html } from 'lit';
import { ConfigurableComponent } from "../utils/components.js";
import { DemoButton } from "./demo-button.js";

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
            }
            #slogans > h1 {
                font-family: sans-serif;
                font-size: 4.5em;
            }
            #buttons {
                gap: 2em;
                margin-top: 3em;
            }
            #buttons > demo-button {
                font-size: 1.5em;
            }
            #slogan-intro > span {
                color: var(--signboard-color-underline);
                animation: blink 1s infinite;
            }
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
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
                    <h1 id="slogan-intro"><b>${this._config[0]?.sloganIntro}</b> <span>_</span></h1>
                </div>
                <div id="buttons" class="centered-flex">
                    <demo-button id="button-start" bordered rounded>${this._config[0]?.buttonStart}</demo-button>
                    <demo-button id="button-more" bordered rounded filled>${this._config[0]?.buttonMore}</demo-button>
                </div>
            </div>
        `;
    }
}

customElements.define('demo-signboard', DemoSignboard);