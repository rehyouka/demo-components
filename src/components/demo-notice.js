import { ConfigurableComponent } from "../utils/components.js";
import { css, html } from 'lit';
import { DemoA } from "./demo-a.js";

export class DemoNotice extends ConfigurableComponent {
    static styles = [
        ... ConfigurableComponent.styles,
        css`
            :host {
                display: block;
            }
            #container {
                padding: 0.5em 1em;
            }
            demo-a {
                font-size: 0.8em;
            }
        `,
    ];
    static properties = {
        ... ConfigurableComponent.properties,
    };
    constructor() {
        super('demo-notice');
    }
    render() {
        return html`
            <div id="container" class="centered-flex">
                <b><demo-a href="${this._config[0]?.link}" new-tab underline>${this._config[0]?.desc}</demo-a></b>
            </div>
        `;
    }
    onClick(config) {
        if (config?.length) {
            window.open(config[0]?.link, '_blank');
        }
    }
}
customElements.define('demo-notice', DemoNotice);