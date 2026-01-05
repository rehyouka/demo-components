import { css } from 'lit';

export const backdropStyles = css`
    .backdrop {
        position: fixed;
        z-index: 25;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        visibility: hidden;
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.05);
        backdrop-filter: blur(0.375em);
        -webkit-backdrop-filter: blur(0.375em);
        transition: opacity 0.3s ease, visibility 0.3s;
        cursor: default;
    }
    .backdrop.active {
        visibility: visible;
        opacity: 1;
    }
    .z-idx-backdrop-above {
        position: relative;
        z-index: 26;
    }
`;