import {css} from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {EzComponent} from '../utils/components.js';
import {getIcon} from "../icons.js";

export class DemoIcon extends EzComponent {
    static styles = [
        ...EzComponent.styles,
        css`
            :host {
                display: inline-block;
                line-height: 0;
            }
        `
    ];
    static properties = {
        name: {},
        category: {},
        filled: {type: Boolean},
        _svg: {state: true},
    };

    constructor() {
        super('demo-icon');
        this.name = '';
        this.category = 'heroicons';
        this.filled = false;
        this._svg = '';
    }

    render() {
        return unsafeHTML(this._svg);
    }

    async updated(changedProperties) {
        if (changedProperties.has('category') ||
            changedProperties.has('name') ||
            changedProperties.has('filled')
        ) {
            this._svg = getIcon(this.category, this.name, this.filled ? 'filled' : 'outline');
        }
    }
}

customElements.define('demo-icon', DemoIcon);