import {MultiMediaComponent} from "../utils/components.js";
import {css, html} from 'lit';
import {classMap} from "lit/directives/class-map.js";

export class DemoButton extends MultiMediaComponent {
    static styles = [
        ...MultiMediaComponent.styles,
        css`
            :host {
                display: inline-block;

                --btn-color-light: var(--btn-color-light-x, inherit);
                --btn-color-dark: var(--btn-color-dark-x, inherit);
            }

            :host, #container {
                height: unset;
                width: unset;
            }

            button {
                padding: 0.4em 0.8rem;

                transition: background-color 0.3s ease, color 0.3s ease;
                font-size: inherit;
                font-weight: bolder;
                user-select: none;
                -webkit-user-select: none;
                -webkit-tap-highlight-color: transparent;

                --btn-color-bg: var(--btn-color-light);
                --btn-color-txt: var(--btn-color-dark);

                background-color: var(--btn-color-bg);
                color: var(--btn-color-txt);
                border-color: var(--btn-color-txt);
            }

            .bordered, .bordering {
                border-style: solid;
                border-width: 0.25rem;
            }

            .bordering {
                border-color: transparent;
            }

            .bordering:hover {
                border-color: var(--btn-color-txt);
            }

            .rounded {
                border-radius: 1.2rem;
            }

            .filled, button.hoverable:hover, button:not(.hoverable).pressable {
                --btn-color-bg: var(--btn-color-dark);
                --btn-color-txt: var(--btn-color-light);
            }

            button.hoverable.filled:hover, button:not(.hoverable).pressable.filled {
                --btn-color-bg: var(--btn-color-light);
                --btn-color-txt: var(--btn-color-dark);
            }
        `,
    ];
    static properties = {
        ...MultiMediaComponent.properties,
        bordered: {type: Boolean,},
        bordering: {type: Boolean,},
        rounded: {type: Boolean,},
        filled: {type: Boolean,},
    };
    _buttonElement;

    constructor() {
        super('demo-button');
        this.bordered = false;
        this.bordering = false;
        this.rounded = false;
        this.filled = false;
    }

    render() {
        const aClassMap = {
            clickable: true,
            bordered: this.bordered,
            bordering: this.bordering,
            rounded: this.rounded,
            filled: this.filled,
            hoverable: this._hoverSupport,
        };
        return html`
            <button
                    id="container"
                    class=${classMap(aClassMap)}
            >
                <slot></slot>
            </button>
        `;
    }

    _onTouchStart = e => this._buttonElement?.classList?.add('pressable');
    _onTouched = e => this._buttonElement?.classList?.remove('pressable');
    _onTouchCancel = e => this._buttonElement?.classList?.remove('pressable');

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this._buttonElement = this.shadowRoot.querySelector('button');
        this._buttonElement.addEventListener('touchstart', this._onTouchStart);
        this._buttonElement.addEventListener('touchend', this._onTouched);
        this._buttonElement.addEventListener('touchcancel', this._onTouchCancel);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._buttonElement.removeEventListener('touchstart', this._onTouchStart);
        this._buttonElement.removeEventListener('touchend', this._onTouched);
        this._buttonElement.removeEventListener('touchcancel', this._onTouchCancel);
    }

    onHoverSupportChange(supported) {
        super.onHoverSupportChange(supported);
        this._buttonElement?.classList?.toggle('hoverable', supported);
    }
}

customElements.define('demo-button', DemoButton);