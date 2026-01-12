import { EzComponent } from "../utils/components.js";
import { css, html } from "lit";

export class DemoCard extends EzComponent {
    static styles = [
        css`
            :host {
                display: block;
                transition:
                        visibility 0.3s ease,
                        opacity 0.3s ease,
                        border-color 0.3s ease,
                        box-shadow 0.3s ease,
                        transform 0.3s ease;

                --card-color-shadow: var(--card-color-shadow-x, rgba(0, 0, 0, 0.04));
            }

            :host(.marginal) { margin: 1em; }
            :host(.bordered) { border-style: solid; border-width: 2px; }
            :host(.padded) { padding: 1em; }
            :host(.rounded) { border-radius: 5px; }
            :host(.shadowed.inset), :host(.shadowing.inset:hover) { box-shadow: inset 0 0 10px var(--card-color-shadow); }
            :host(.shadowed:not(.inset)), :host(.shadowing:not(.inset):hover) { box-shadow: 0 5px 10px var(--card-color-shadow); }
            :host(.bouncing:hover) { transform: translateY(-7px); }
            :host(.rendering) { animation: riseUp 0.5s ease forwards, fadeIn 0.7s ease forwards; }
            :host(.clickable) { cursor: pointer; }

            @keyframes riseUp {
                from { transform: translateY(15px); }
                to { transform: translateY(0); }
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `,
    ];
    static properties = {
        marginal: { type: Boolean, },
        bordered: { type: Boolean, },
        padded: { type: Boolean, },
        rounded: { type: Boolean, },
        shadowed: { type: Boolean, },
        shadowing: { type: Boolean, },
        inset: { type: Boolean, },
        bouncing: { type: Boolean, },
        rendering: { type: Boolean, },
        clickable: { type: Boolean, },
    };
    constructor() {
        super('demo-card');
        this.marginal = false;
        this.bordered = false;
        this.padded = false;
        this.rounded = false;
        this.shadowed = false;
        this.shadowing = false;
        this.inset = false;
        this.bouncing = false;
        this.rendering = false;
        this.clickable = false;
    }
    render() {
        this.classList.toggle('marginal', this.marginal);
        this.classList.toggle('bordered', this.bordered);
        this.classList.toggle('padded', this.padded);
        this.classList.toggle('rounded', this.rounded);
        this.classList.toggle('shadowed', this.shadowed);
        this.classList.toggle('shadowing', this.shadowing);
        this.classList.toggle('inset', this.inset);
        this.classList.toggle('bouncing', this.bouncing);
        this.classList.toggle('rendering', this.rendering);
        this.classList.toggle('clickable', this.clickable);
        return html`<slot></slot>`;
    }
}
customElements.define('demo-card', DemoCard);