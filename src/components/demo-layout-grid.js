import { EzComponent } from "../utils/components.js";
import { css, html } from 'lit';

export class DemoLayoutGrid extends EzComponent {
    static styles = [
        ... EzComponent.styles,
        css`
            :host {
                display: block;
                --layout-grid-column-landscape: var(--layout-grid-column-landscape-x, 4);
                --layout-grid-column-portrait: var(--layout-grid-column-portrait-x, 1);
                --layout-grid-gap-landscape: var(--layout-grid-gap-landscape-x, 1.5em);
                --layout-grid-gap-portrait: var(--layout-grid-gap-portrait-x, 1em);
            }
            #container {
                display: grid;
                grid-template-columns: repeat(var(--layout-grid-column-landscape), 1fr);
                gap: var(--layout-grid-gap-landscape);
            }
            @media (max-width: 768px) {
                #container {
                    grid-template-columns: repeat(var(--layout-grid-column-portrait), 1fr);
                    gap: var(--layout-grid-gap-portrait);
                }
            }
        `,
    ];
    static properties = {
        ... EzComponent.properties
    };
    constructor() {
        super('demo-layout-grid');
    }
    render() {
        return html`<div id="container"><slot></slot></div>`;
    }
}
customElements.define('demo-layout-grid', DemoLayoutGrid);