import { ConfigurableComponent } from "../utils/components.js";
import { css, html } from 'lit';
import { repeat } from "lit/directives/repeat.js";
import { DemoA } from "./demo-a.js";
import { DemoIcon } from "./demo-icon.js";

export class DemoChannels extends ConfigurableComponent {
    static styles = [
        ... ConfigurableComponent.styles,
        css`
            :host {
                display: block;
            }
            #container {
                display: flex;
                gap: 0.5em;
            }
            demo-icon {
                height: 1em;
                width: 1em;
            }
        `,
    ];
    static properties = {
        ... ConfigurableComponent.properties,
    };
    constructor() {
        super('demo-channels');
    }
    render() {
        return html`
            <div id="container">
                ${repeat(
                    this._config ?? [],
                    (item, idx) => idx,
                    (item, idx) => html`
                        <demo-a href="${item.link}" new-tab smooth>
                            <demo-icon name="${item.name}" category="brands" filled></demo-icon>
                        </demo-a>
                    `
                )}
            </div>
        `;
    }
}
customElements.define('demo-channels', DemoChannels);