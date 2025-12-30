import { ConfigurableComponent } from "../utils/components.js";
import { css, html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { styleMap } from "lit/directives/style-map.js";
import { DemoImg } from "./demo-img.js";

export class DemoGallery extends ConfigurableComponent {
    static styles = [
        ... ConfigurableComponent.styles,
        css`
            #container {
                display: grid;
            }
            #container.playing {
                display: flex;
                white-space: nowrap;
                width: max-content;
                overflow: hidden;
                animation: marquee 20s linear infinite;
            }
            #container.playing:hover {
                animation-play-state: paused;
            }
            #container > demo-img {
                flex-shrink: 0;
            }
            @keyframes marquee {
                from {
                    transform: translateX(0);
                }
                to {
                    transform: translateX(-50%);
                }
            }
        `,
    ];
    static properties = {
        ... ConfigurableComponent.properties,
        w: { type: String, },
        h: { type: String, },
        gap: { type: String, },
        playing: { type: Boolean, },
    };
    constructor() {
        super('demo-gallery');
        this.w = '';
        this.h = '';
        this.gap = '';
        this.playing = false;
    }
    render() {
        const containerStyleMap = {};
        if (this.w?.length && !this.playing) {
            containerStyleMap.gridTemplateColumns = `repeat(auto-fit, minmax(${this.w}, 1fr))`;
        }
        if (this.gap?.length) {
            containerStyleMap.gap = this.gap;
        }
        const imgStyleMap = {};
        if (this.w?.length) {
            imgStyleMap.width = this.w;
        }
        if (this.h?.length) {
            imgStyleMap.height = this.h;
        }

        return this.playing
               ?
               html`
                    <div
                        id="container"
                        class="playing"
                        style=${styleMap(containerStyleMap)}>
                        ${repeat(
                   this._config??[],
                   (item, idx) => idx,
                   (item, idx) => html`
                            <demo-img 
                                src="${item?.img}"
                                filtered
                                clickable
                                style=${styleMap(imgStyleMap)}
                                @click="${()=>this.onClickImg(item)}"
                            ></demo-img>
                        `)}
                        ${repeat(
                   this._config??[],
                   (item, idx) => `${idx}_COPY`,
                   (item, idx) => html`
                            <demo-img 
                                src="${item?.img}"
                                filtered
                                clickable
                                style=${styleMap(imgStyleMap)}
                                @click="${()=>this.onClickImg(item)}"
                            ></demo-img>
                        `)}
                    </div>
               `
               :
               html`
                    <div
                        id="container"
                        style=${styleMap(containerStyleMap)}>
                        ${repeat(
                            this._config??[],
                            (item, idx) => idx,
                            (item, idx) => html`
                            <demo-img 
                                src="${item?.img}"
                                filtered
                                clickable
                                style=${styleMap(imgStyleMap)}
                                @click="${()=>this.onClickImg(item)}"
                            ></demo-img>
                        `)}
                    </div>
               `;
    }
    onClickImg(item) {
        if (item?.link?.length) {
            window.open(item.link, '_blank');
        }
    }
}
customElements.define('demo-gallery', DemoGallery);