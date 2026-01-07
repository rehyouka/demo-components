import { css, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { MultiMediaComponent } from '../utils/components.js';
import { DemoA } from './demo-a.js';
import { DemoIcon } from './demo-icon.js';
import { backdropStyles } from '../styles/backdrop.js';

export class DemoNavi extends MultiMediaComponent {
    static styles = [
        ...MultiMediaComponent.styles,
        backdropStyles,
        css`
            :host {
                display: block;
                top: 0;
                position: fixed;
                width: 100vw;

                --navi-color-txt: var(--navi-color-txt-x, inherit);
                --navi-color-txt-select: var(--navi-color-txt-select-x, inherit);
                --navi-color-txt-title: var(--navi-color-txt-title-x, inherit);
                --navi-color-bg: var(--navi-color-bg-x, inherit);
                --navi-width-max: var(--navi-width-max, inherit);
            }
            #container {
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                max-height: 100vh;
                overflow: hidden;

                color: var(--navi-color-txt);
                background-color: var(--navi-color-bg);
            }
            #head, #body {

                padding-left: 1em;
                padding-right: 1em;
                width: 100%;

                max-width: var(--navi-width-max);
            }
            #body {
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                transition: height 0.3s ease;
            }
            .full-height {
                height: 100vh;
            }
            .rest {
                flex: 1;
            }
            .visible {
                visibility: visible;
                opacity: 1;
            }
            .hidden {
                visibility: hidden;
                opacity: 0;
            }
        `,
        css`
            #bar {
                display: flex;
                justify-content: space-between;
            }
            #categories, #auxiliaries { 
                display: flex; 
                align-items: center; 
                gap: 2em; 
            }
            #categories > * , #auxiliaries > * { 
                padding-top: 1em; 
                padding-bottom: 1em; 
            }
            #categories {
                justify-content: flex-start;
            }
            #auxiliaries {
                justify-content: flex-end;
            }
            div.category {
                position: relative;
                text-decoration: none;
                font-weight: bold;
                font-size: 0.75em;
                box-sizing: content-box;
            }
            div.category::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 0;
                height: 0.15em;
                background-color: currentColor;
                transition: width 0.3s ease;
                box-sizing: content-box;
            }
            div.category:hover {
                color: var(--navi-color-txt-select);
            }
            div.category:hover::after, div.category.selected::after {
                width: 100%;
            }
            demo-icon.icon-bar {
                width: 1em;
            }
        `,
        css`
            #table {
                display: flex;
                padding-top: 2.5em;
                padding-bottom: 1.5em;
                gap: 4em;
            }
            .column {
                display: flex;
                flex-direction: column;
            }
            h5.cell {
                color: var(--navi-color-txt-title);
            }
            h5.cell:not(:first-of-type) {
                margin-top: 2em;
            }
            demo-a.cell {
                font-size: 1.6em;
                font-weight: bolder;
            }
        `,
        css`
            .list {
                display: flex;
                flex-direction: column;
                gap: 1em;
                padding: 1em 0;
            }
            .list-item {
                color: var(--navi-color-txt);
            }
            .sub-list {
                display: flex;
                flex-direction: column;
                gap: 0.1em;
                padding: 0.5em 0;
            }
            .sub-list > p {
                font-size: 1em;
                color: var(--navi-color-txt-title);
            }
            .sub-list > demo-a {
                font-size: 1.4em;
                font-weight: bolder;
            }
        `,
        css`
            #bg-expended {
                position: fixed;
                z-index: 25;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: var(--navi-color-bg);
                transition: visibility 0.3s ease, opacity 0.3s ease;
            }
        `,
    ];
    static properties = {
        _idx: { type: Number, state: true },
        _menuExpanded: { type: Boolean, state: true }
    };
    constructor() {
        super('demo-navi');
        this._idx = -1;
        this._menuExpanded = false;
    }
    render() {
        const htmlBar = html`
            <div id="bar">
                <div id="categories">
                    ${
                        !this._landscapeSupport && this._menuExpanded && this._idx >= 0
                        ? html`
                            <demo-icon
                                class="icon-bar"
                                name="arrow-left"
                                @click="${()=>this._onClickIconBack()}"
                            ></demo-icon>
                        `
                        : html`<slot name="logo"></slot>`
                    }
                    ${ !this._landscapeSupport ? html`` : repeat(
                        this._config,
                        (item, idx)=>idx,
                        (item, idx) => html`
                            <div 
                                class="category clickable ${this._idx === idx?'selected':''}"
                                @mouseenter="${()=>this._onMouseEnterBarCategoryItem(idx)}"
                                @click="${()=>this._onClickBarCategoryItem(idx)}"
                            >
                                ${item.desc}
                            </div>
                        `
                    )}
                </div>
                <div id="auxiliaries">
                    <slot name="auxiliaries"></slot>
                    ${
                        this._landscapeSupport
                        ? html``
                        : html`
                            <demo-icon
                                class="icon-bar"
                                name="${this._menuExpanded?'x-mark':'bars-3'}"
                                @click="${()=>this._onClickIconMenu()}"
                            ></demo-icon>`
                    }
                </div>
            </div>
        `;
        const htmlTable = html`
            <div id="table">
            ${repeat(
                this._config[this._idx]?.menu ?? [],
                (col, idx) => idx,
                (col, idx) => html`
                    <div class="column">
                    ${repeat(
                        col ?? [],
                        (cell, idx) => idx,
                        (cell, idx) =>
                            cell?.link?.length
                            ? html`<demo-a href="${cell?.link}" class="cell">${cell?.desc}</demo-a>`
                            : html`<h5 class="cell">${cell?.desc}</h5>`
                    )}
                    </div>
                `
            )}
            </div>
        `;
        const htmlList = html`
            <div class="list">
                ${repeat(
                        this._config ?? [],
                        (listItem, idx) => idx,
                        (listItem, idx) => html`
                            <h2 class="list-item" @click="${()=>this._onClickListItem(idx)}">${listItem?.desc}</h2>
                        `
                )}
            </div>
        `;
        const htmlSubList = html`
            <div class="list">
                ${repeat(
                    this._config[this._idx]?.menu ?? [],
                    (subList, listItemIdx) => listItemIdx,
                    (subList, listItemIdx) => html`
                        <div class="sub-list">
                            ${repeat(
                                subList ?? [],
                                (subListItem, subListIdx) => subListIdx,
                                (subListItem, subListIdx) => 
                                    subListIdx === 0 
                                    ? html`<p>${subListItem.desc}</p>`
                                    : html`<demo-a href="${subListItem.link}">${subListItem.desc}</demo-a>`
                            )}
                        </div>
                    `
                )}
            </div>
        `;
        const htmlBg = html`
            ${
                this._landscapeSupport
                ? html`
                    <div
                        class="backdrop ${this._idx < 0 ? '' : 'active'}"
                        @mouseenter="${() => this._onMouseEnterBackdrop()}"
                    ></div>`
                : html``
            }
        `;

        const expendedOnLandscape = this._landscapeSupport && this._idx >= 0;
        const expendedOnPortrait = !this._landscapeSupport && this._menuExpanded;
        return html`
            <div id="container" class="z-idx-backdrop-above ${expendedOnPortrait?'full-height':''}">

                <div id="head">
                    ${ htmlBar }
                </div>

                <div id="body" class="${expendedOnPortrait?'rest':''}">
                    ${ expendedOnLandscape ? htmlTable : html`` }
                    ${ expendedOnPortrait ? ( this._idx < 0 ? htmlList : htmlSubList ) : html``}
                </div>
                
            </div>
            ${ htmlBg }
        `;
    }
    _onClickIconBack = () => {
        this._idx = -1;
    }
    _onMouseEnterBarCategoryItem = idx => {
        if (this._landscapeSupport) {
            this._idx = idx;
        }
    };
    _onClickBarCategoryItem = idx => {
        if (!this._landscapeSupport) {
            this._idx = idx;
        }
    }
    _onClickIconMenu = () => {
        this._menuExpanded = !this._menuExpanded;
        if (!this._menuExpanded) {
            this._idx = -1;
        }
    }
    _onMouseEnterBackdrop = () => {
        if (this._landscapeSupport) {
            this._idx = -1;
        }
    };
    _onClickListItem = idx => {
        this._idx = idx;
    }
}
customElements.define('demo-navi', DemoNavi);