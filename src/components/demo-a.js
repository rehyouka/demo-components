import { EzComponent } from "../utils/components.js";
import { css, html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export class DemoA extends EzComponent {
    static styles = [
        ...EzComponent.styles,
        css`
            :host {
                display: inline-block;
            }
            a {
                --a-color-deselect: var(--a-color-deselect-x, inherit);
                --a-color-select: var(--a-color-select-x, inherit);

                position: relative;
                color: var(--a-color-deselect);
                text-decoration: none;
            }
            a:hover,
            a:active,
            a:visited,
            a:focus {
                color: inherit;
                text-decoration: none;
                outline: none;
            }
            a:hover {
                color: var(--a-color-select-x);
            }
            a.smooth:hover {
                transition: color 0.3s ease;
            }
            a.underline:not(.smooth):hover {
                text-decoration-line: underline;
            }
            a.underline::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 0;
                height: 0.1em;
                background-color: var(--a-color-deselect);
            }
            a.underline:hover::after {
                width: 100%;
                background-color: var(--a-color-select);
            }
            a.underline.smooth::after {
                transition: width 0.3s ease, background-color 0.3s ease;
            }
        `,
    ];
    static properties = {
        href: {},
        underline: { type: Boolean, },
        smooth: { type: Boolean, },
        newTab: { attribute: 'new-tab', type: Boolean, },
    };
    constructor() {
        super('demo-a');
        this.href = 'javascript:void(0)';
        this.underline = false;
        this.smooth = false;
        this.newTab = false;
    }
    render() {
        const aClassMap = {
            underline: this.underline,
            smooth: this.smooth,
        };
        return this.newTab
               ?
               html`
                   <a class=${classMap(aClassMap)} href="${this.href}" target="_blank" rel="noopener noreferrer">
                       <slot></slot>
                   </a>
               `
               :
               html`
                   <a class=${classMap(aClassMap)} href="${this.href}">
                       <slot></slot>
                   </a>
               `
            ;
    }
}
customElements.define('demo-a', DemoA);