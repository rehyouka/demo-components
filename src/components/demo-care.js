import { ConfigurableComponent } from "../utils/components.js";
import { css, html } from 'lit';
import { DemoButton } from "./demo-button.js";
import { styleMap } from "lit/directives/style-map.js";

export class DemoCare extends ConfigurableComponent {
    static styles = [
        ... ConfigurableComponent.styles,
        css`
            #container {
                background-size: cover;
                background-position: center;
                color: inherit;
                padding: 1em;
            }
            #wrap-text > h4 {
                margin-top: 1em;
            }
            #wrap-button {
                display: flex;
                justify-content: flex-end;
                margin-top: 2em;
            }
            demo-button {
                --btn-color-light-x: inherit;
                --btn-color-dark-x: inherit;
            }
        `,
    ];
    static properties = {
        ... ConfigurableComponent.properties,
        filteringColorWeak: { attribute: 'filtering-color-weak', },
        filteringColorStrong: { attribute: 'filtering-color-strong', },
    };
    constructor() {
        super('demo-care');
        this.filteringColorWeak = '';
        this.filteringColorStrong = '';
    }
    render() {
        const bgImgName = this._config?.length ? this._config[0]?.bgImgName : '';
        const stylesContainer = {
            backgroundImage: `
                linear-gradient(to bottom, ${this.filteringColorWeak}, ${this.filteringColorStrong})
                , url(/imgs/office.png)
            `,
        };
        return html`
            <div id="container" style=${styleMap(stylesContainer)}>
                <div id="wrap-text">
                    <h2>${this._config[0]?.title}</h2>
                    <h4>${this._config[0]?.content}</h4>
                </div>
                <div id="wrap-button">
                    <demo-button clickable bordered>
                        ${this._config[0]?.greeting}
                    </demo-button>
                </div>
            </div>
        `;
    }
}
customElements.define('demo-care', DemoCare);