import { css, html } from 'lit';
import { EzComponent } from '../utils/components.js';
import { DemoIcon } from './demo-icon.js';
import { _category } from "../utils/icons.js";

export class DemoQ extends EzComponent {
    static styles = [
        ...EzComponent.styles,
        css`
            :host {
                display: block;

                --q-color-content: var(--q-color-content-x, inherit);
                --q-color-author: var(--q-color-author-x, inherit);
            }
            #container {
                display: flex;
                align-items: center;
                flex-direction: column;
            }
            demo-icon {
                height: 2em;
                width: 2em;
                color: var(--q-color-content);
            }
            p {
                font-weight: 800;
                font-size: 1.4em;
                line-height: 1.4em;
                text-align: center;
                text-rendering: optimizeLegibility;
                text-size-adjust: 100%;
                unicode-bidi: isolate;
                color: var(--q-color-content);
            }
            i {
                display: flex;
                justify-content: flex-end;
                width: 100%;
                font-size: 1em;
                color: var(--q-color-author);
            }
            @media (max-width: 768px) {
                p { font-size: 1.1em; }
                i { font-size: 0.7em; }
            }
        `,
    ];
    constructor() {
        super('demo-q');
    }
    render() {
        return html`
            <div id="container">
                <demo-icon category="${_category}" name="queto-op" filled></demo-icon>
                <p><slot name="content"></slot></p>
                <i>--<slot name="author"></slot></i>
            </div>
        `;
    }
}
customElements.define('demo-q', DemoQ);