import { ConfigurableComponent } from "../utils/components.js";
import { css, html } from 'lit';
import { repeat } from "lit/directives/repeat.js";
import { DemoA } from "./demo-a.js";

export class DemoFooter extends ConfigurableComponent {
    static styles = [
        ... ConfigurableComponent.styles,
        css`
            :host {
                display: block;
            }
            #container {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            ul {
                list-style: none;
                display: flex;
                gap: 1em;
                align-items: center;
            }
            @media (max-width: 768px) {
                #container {
                    flex-direction: column;
                    justify-content: center;
                    font-size: 0.6em;
                }
                ul {
                    gap: 0.8em;
                }
            }
        `,
    ];
    static properties = {
        ... ConfigurableComponent.properties,

    };
    constructor() {
        super('demo-footer');
    }
    render() {
        const menuSize = this._config[0]?.menu?.length ?? 0;
        return html`
            <div id="container">
                <p>${this._config[0]?.copyright}</p>
                <ul>
                    ${repeat(
                        this._config[0]?.menu ?? [],
                        (item, idx) => idx,
                        (item, idx) => html`
                            <li><demo-a href="${item?.link}" underline>${item?.desc}</demo-a></li>
                            ${ idx !== menuSize - 1 ? html`<li>|</li>` : '' }
                        `
                    )}
                </ul>
            </div>
        `;
    }
}
customElements.define('demo-footer', DemoFooter);