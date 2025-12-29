import { EzComponent } from "../utils/components.js";
import { css, html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export class DemoA extends EzComponent {
    static styles = [
        ...EzComponent.styles,
        css`
            :host {
                display: inline-block;

                --a-color-deselect: var(--a-color-deselect-x, inherit);
                --a-color-select: var(--a-color-select-x, inherit);
            }
            a {
                position: relative;
            }
            a,
            a:hover,
            a:active,
            a:visited,
            a:focus
            {
                text-decoration: none;
                outline: none;
            }
            a,
            a:active,
            a:visited,
            a:focus
            {
                color: var(--a-color-deselect);
            }
            a:hover {
                color: var(--a-color-select-x);
            }
            a.smooth:hover {
                transition: color 0.3s ease;
            }
            a.underline:not(.smooth):hover, a.underlined {
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
            a.underline.smooth:hover::after {
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
        underlined: { type: Boolean, },
        smooth: { type: Boolean, },
        newTab: { attribute: 'new-tab', type: Boolean, },
    };
    constructor() {
        super('demo-a');
        this.href = 'javascript:void(0)';
        this.underline = false;
        this.underlined = false;
        this.smooth = false;
        this.newTab = false;
    }
    render() {
        const aClassMap = {
            underline: this.underline,
            underlined: this.underlined,
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