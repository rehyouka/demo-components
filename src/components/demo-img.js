import { EzComponent } from "../utils/components.js";
import { css, html } from 'lit';
import {classMap} from "lit/directives/class-map.js";

export class DemoImg extends EzComponent{
    static styles = [
        ...EzComponent.styles,
        css`
            :host, img {
                display: block;
                width: 100%;
                height: 100%;
            }
            img {
                transition: filter 0.3s ease;
            }
            .object-fit-auto {
                object-fit: contain;
            }
            .object-fit-stretched {
                object-fit: fill;
            }
            .object-fit-cropped {
                object-fit: cover;
            }
            .filtered {
                filter: grayscale(100%);
            }
            .filtered:hover {
                filter: grayscale(0%);
            }
        `,
    ];
    static properties = {
        src: {},
        alt: {},
        mode: { type: String },
        filtered: { type: Boolean, },
        clickable: { type: Boolean },
    };
    constructor() {
        super('demo-img');
        this.src = '';
        this.alt = 'Invalid img src!';
        this.mode = '';
        this.filtered = false;
        this.clickable = false;
    }
    render() {
        const aClassMap = {
            filtered: this.filtered,
            clickable: this.clickable,
        };
        aClassMap[`object-fit-${this.mode?.length ? this.mode : 'auto'}`] = true;
        return html`
            <img 
                src="${this.src}" 
                alt="${this.alt}"
                class=${classMap(aClassMap)}
            />
        `;
    }
}
customElements.define('demo-img', DemoImg);