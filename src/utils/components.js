import { LitElement, css } from 'lit';

export class EzComponent extends LitElement {
    static styles = [
        css`
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                border: 0;
            }
            .centered-flex {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .clickable:hover {
                cursor: pointer;
            }
        `,
    ];
    _id;
    constructor(id) {
        super();
        if (id?.trim()?.length) {
            this._id = id;
        } else {
            throw new Error('EzComponent instance require a id!');
        }
    }
}

export class ConfigurableComponent extends EzComponent {
    static styles = [
        ... EzComponent.styles,
    ];
    static properties = {
        configName: { attribute: 'config-name' },
        _config: { type: Array, state: true },
    };
    constructor(id) {
        super(id);
        this.configName = '';
        this._config = [];
    }
/*
    async updated(changedProperties) {
        if (changedProperties.has('configName')) {
            const config = await fromJson(this.configName);
            if (config?.length) this._config = config;
        }
    }
*/
}

export class MultiMediaComponent extends ConfigurableComponent {
    static styles = [
        ... ConfigurableComponent.styles,
    ];
    static properties = {
        ... ConfigurableComponent.properties,
        _landscapeSupport: { type: Boolean, state: true },
        _hoverSupport: { type: Boolean, state: true },
    };
    _enableFirstHook;
    _landscapeSupportQuery;
    _onLandscapeSupportChange;
    _hoverSupportQuery;
    _onHoverSupportChange;
    constructor(id, enableFirstHook=true) {
        super(id);
        this._enableFirstHook = enableFirstHook;
    }
    connectedCallback() {
        super.connectedCallback();
        console.trace(`${this._id} connectedCallback() invoked.`);
        this._landscapeSupportQuery = window.matchMedia('(orientation: landscape)');
        this._onLandscapeSupportChange = MultiMediaComponent.mediaSupportHook(this._landscapeSupportQuery, this.onLandscapeSupportChange.bind(this));
        this._landscapeSupportQuery.addEventListener('change', this._onLandscapeSupportChange);
        this._hoverSupportQuery = window.matchMedia('(hover: hover)');
        this._onHoverSupportChange = MultiMediaComponent.mediaSupportHook(this._hoverSupportQuery, this.onHoverSupportChange.bind(this));
        this._hoverSupportQuery.addEventListener('change', this._onHoverSupportChange);

        if (this._enableFirstHook) {
            this._onLandscapeSupportChange();
            this._onHoverSupportChange();
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        console.trace(`${this._id} disconnectedCallback() invoked.`);
        this._hoverSupportQuery?.removeEventListener('change', this._onHoverSupportChange);
        this._landscapeSupportQuery?.removeEventListener('change', this._onLandscapeSupportChange);
    }
    static mediaSupportHook(query, fn) {
        if (!query) {
            throw new Error('mediaSupportHook.query is required!');
        }
        if (!fn) {
            throw new Error('mediaSupportHook.fn is required!');
        }
        return () => fn(query.matches);
    }
    onLandscapeSupportChange(supported) {
        console.trace(`${this._id} onLandscapeSupportChange(${supported}) invoked.`);
        this._landscapeSupport = supported;
    }
    onHoverSupportChange(supported) {
        console.trace(`${this._id} _onHoverSupportChange(${supported}) invoked.`);
        this._hoverSupport = supported;
    }
}