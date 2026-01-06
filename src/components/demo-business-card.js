import { css, html } from 'lit';
import { EzComponent } from "../utils/components.js";
import  { DemoImg } from "./demo-img.js";
import { DemoA } from "./demo-a.js";

export class DemoBusinessCard extends EzComponent {
    static styles = [
        ...EzComponent.styles,
        css`
            :host {
                display: block;

                --business-card-color-sub-title: var(--business-card-color-sub-title-x, inherit);
            }
            :host, #container {
                height: 100%;
                width: 100%;
            }
            #container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1em;
            }
            #container > div {
                height: 100%;
            }
            #avatar {
                width: 4em;
                height: 4em;
                border-radius: 50%;
                overflow: hidden;
            }
            #detail {
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 0.2em;
            }
            #title {
                font-size: 1em;
                font-weight: bolder;
            }
            #sub-title, demo-a {
                font-size: 0.8em;
                font-weight: bold;
            }
            #sub-title {
                color: var(--business-card-color-sub-title);
            }
            @media (max-width: 768px) {
                #avatar { width: 3.3em; height: 3.3em; }
                #title { font-size: 0.8em; }
                #sub-title, demo-a { font-size: 0.6em; }
            }
        `,
    ];
    static properties = {
        avatar: {},
        title: {},
        subTitle: { attribute: 'sub-title', },
        linkHref: { attribute: 'link-href', },
        linkDesc: { attribute: 'link-desc', },
    };
    constructor() {
        super('demo-business-card');
        this.avatar = '';
        this.title = '';
        this.subTitle = '';
        this.linkHref = '';
        this.linkDesc = '';
    }
    render() {
        return html`
            <div id="container">
                <div id="avatar">
                    <demo-img src="${this.avatar}" mode="stretched"></demo-img>
                </div>
                <div id="detail">
                    <p id="title">${this.title}</p>
                    <p id="sub-title">${this.subTitle}</p>
                    <demo-a href="${this.linkHref}" underlined>${this.linkDesc}</demo-a>
                </div>
            </div>
        `;
    }
}
customElements.define('demo-business-card', DemoBusinessCard);