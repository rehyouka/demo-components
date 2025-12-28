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