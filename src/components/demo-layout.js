import { EzComponent } from "../utils/components.js";
import { css, html } from 'lit';

export class DemoLayout extends EzComponent {
    static styles = [
        ...EzComponent.styles,
        css`
            :host { display: block; }
            #container { display: flex; flex-direction: row }
            @media (max-width: 768px) { #container { flex-direction: column; } }
        `,
    ];
    static properties = {
        ...EzComponent.properties,
    };
    constructor() {
        super('demo-layout');
    }
    render() {
        return html`
            <div id="container" class="centered-flex">
                <slot name="lt"></slot>
                <slot name="rb"></slot>
            </div>
        `;
    }
}
customElements.define('demo-layout', DemoLayout);