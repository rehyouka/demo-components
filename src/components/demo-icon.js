import {css} from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {EzComponent} from '../utils/components.js';
import {fetchSvg} from '../utils/icons.js';

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
        this.category = '';
        this.filled = false;
        this._svg = '';
    }

    render() {
        return unsafeHTML(this._svg);
    }

    willUpdate(changedProperties) {
        if (changedProperties.has('category') ||
            changedProperties.has('name') ||
            changedProperties.has('filled')
        ) {
            fetchSvg(this.category, this.name, this.filled).then(svg=>this._svg=svg);
        }
    }
}

customElements.define('demo-icon', DemoIcon);