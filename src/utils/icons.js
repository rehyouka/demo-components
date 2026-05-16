import { svgs } from './xss.js';

const _svg_default = svgs('<svg viewBox="0 0 24 24"></svg>');

const _caches = new Map();
export const _category = '_';
function _buildKey(category, name, filled) {
    return `${category}/${filled ? 'filled' : 'outline'}/${name}`;
}
export async function fetchSvg(category, name, filled=false) {
    if (category?.length && name?.length) {
        const key = _buildKey(category, name, filled);
        if (_caches.has(key)) return _caches.get(key);
        const res = await fetch(`/icons/${key}.svg`);
        const svg = await res?.text();
        if (res?.ok && svg?.length) {
            const trustedSvg = svgs(svg);
            _caches.set(key, trustedSvg);
            return trustedSvg;
        }
    }
    return _svg_default;
}

/* -- preset icons --- */
const _data = [
    {
        _key: _buildKey(_category, 'arrow-left', false),
        _svg: 
        `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
            </svg>
        `
    },
    {
        _key: _buildKey(_category, 'queto-op', true),
        _svg: 
        `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-quote" transform="scale(-1, 1)">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M9 5a2 2 0 0 1 2 2v6c0 3.13 -1.65 5.193 -4.757 5.97a1 1 0 1 1 -.486 -1.94c2.227 -.557 3.243 -1.827 3.243 -4.03v-1h-3a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-3a2 2 0 0 1 2 -2z" />
                <path d="M18 5a2 2 0 0 1 2 2v6c0 3.13 -1.65 5.193 -4.757 5.97a1 1 0 1 1 -.486 -1.94c2.227 -.557 3.243 -1.827 3.243 -4.03v-1h-3a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-3a2 2 0 0 1 2 -2z" />
            </svg>
        `
    },
    {
        _key: _buildKey(_category, 'x-mark', false),
        _svg:
        `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
            </svg>
        `,
    },
    {
        _key: _buildKey(_category, 'bars-3', false),
        _svg:
        `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
            </svg> 
        `
    },
];
_data.forEach(data=>_caches.set(data?._key, data?._svg));

