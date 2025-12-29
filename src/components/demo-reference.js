import { ConfigurableComponent } from "../utils/components.js";
import { css, html } from 'lit';
import { repeat } from "lit/directives/repeat.js";
import { DemoA } from "./demo-a.js";

export class DemoReference extends ConfigurableComponent {
    static styles = [
        ... ConfigurableComponent.styles,
        css`
            :host {
                display: block;
            }
            #container {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 1.5em;
                max-width: inherit;
            }
            ul {
                list-style: none;
            }
            li {
                margin-bottom: 1em;
            }
            @media (max-width: 768px) {
                #container {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1em;
                }
            }
        `,
    ];
    static properties = {
        ... ConfigurableComponent.properties,

    };
    constructor() {
        super('demo-reference');
    }
    render() {
        return html`
            <div id="container">
                ${repeat(
                    this._config ?? [],
                    (colItem, colIdx) => colIdx,
                    (colItem, colIdx) => html`
                        <ul>
                            ${repeat(
                                    this._config[colIdx] ?? [],
                                    (listItem, listIdx) => `${colIdx}_${listIdx}`,
                                    (listItem, listIdx) => html`
                                        <li><demo-a href="${listItem.link}" underline>${listItem.desc}</demo-a></li>
                                    `
                            )}
                        </ul>
                    `
                )}
            </div>
        `;
    }
}
customElements.define('demo-reference', DemoReference);