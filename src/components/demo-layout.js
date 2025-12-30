import { MultiMediaComponent } from "../utils/components.js";
import { css, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export class DemoLayout extends MultiMediaComponent {
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
        weightHead: { attribute: 'weight-head', type: Number },
        weightBody: { attribute: 'weight-body', type: Number },
    };
    constructor() {
        super('demo-layout');
        this.weightHead = this.weightBody = 1;
        console.log('william constructor()', this.weightHead, this.weightBody);
    }
    connectedCallback() {
        super.connectedCallback();
        console.log('william connectedCallback()', this.weightHead, this.weightBody)
    }
    render() {
        console.log('william render()', this.weightHead, this.weightBody)
        const directionClass = this._landscapeSupport ? 'row' : 'col';
        const headStyle = { flex: this.weightHead, };
        const bodyStyle = { flex: this.weightBody, };
        return html`
            <div id="container" class="box ${directionClass}">
                <div id="head" class="box" style=${styleMap(headStyle)}><slot name="head"></slot></div>
                <div id="body" class="box" style=${styleMap(bodyStyle)}><slot name="body"></slot></div>
            </div>
        `;
    }
}
customElements.define('demo-layout', DemoLayout);