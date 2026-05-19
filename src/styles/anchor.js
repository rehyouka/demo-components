import { css } from 'lit';

export const anchorStyles = css`
    a.anchor {
        color: inherit;
        text-decoration: none;
        opacity: 0;
        transition: opacity 0.2s ease, color 0.2s ease;
        cursor: pointer;
        user-select: none;
    }
    h2:hover > a.anchor {
        opacity: 1;
    }
`;