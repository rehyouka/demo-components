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
            <div id="container">
                <div id="content" class="centered-flex">
                    <slot>
                        <b><demo-a href="${this._config[0]?.link}" new-tab>${this._config[0]?.desc}</demo-a></b>
                    </slot>
                </div>
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