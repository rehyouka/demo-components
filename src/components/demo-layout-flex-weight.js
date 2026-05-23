import { MultiMediaComponent } from "../utils/components.js";
import { css, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export class DemoLayoutFlexWeight extends MultiMediaComponent {
    static styles = [
        ...MultiMediaComponent.styles,
        css`
            :host { display: block; }
            :host, #container { width: 100%; height: 100%; }
            #container { display: flex; }
            #container.row { flex-direction: row; }
            #container.row > div { height: 100%; }
            #container.col { flex-direction: column; }
            #container.col > div { width: 100%; }
            #container > div { overflow: hidden; }
        `,
    ];
    static properties = {
        ...MultiMediaComponent.properties,
        weightLT: { attribute: 'w-lt', type: Number },
        weightRB: { attribute: 'w-rb', type: Number },
    };
    constructor() {
        super('demo-layout-flex-weight');
        this.weightLT = this.weightRB = 1;
    }
    connectedCallback() {
        super.connectedCallback();
    }
    render() {
        const directionClass = this._landscapeSupport ? 'row' : 'col';
        const ltStyle = { flex: this.weightLT, };
        const rbStyle = { flex: this.weightRB, };
        return html`
            <div id="container" class="${directionClass}">
                <div style=${styleMap(ltStyle)}><slot name="lt"></slot></div>
                <div style=${styleMap(rbStyle)}><slot name="rb"></slot></div>
            </div>
        `;
    }
}
customElements.define('demo-layout-flex-weight', DemoLayoutFlexWeight);