import DOMPurify from 'dompurify';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {html} from 'lit';

export function xss(dirty, config) {
    return dirty?.length ? DOMPurify.sanitize(dirty, config) : null;
}

export function htmls(dirty) {
    return xss(dirty, {
        USE_PROFILES: {html: true},
        ALLOWED_TAGS: [
            'p', 'br', 'strong', 'em', 'code', 'pre', 'blockquote',
            'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'a', 'img', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
            'span'
        ],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
    });
}

export function svgs(dirty) {
    return xss(dirty, {USE_PROFILES: {svg: true}});
}

export function safeHTML(clean) {
    if (clean instanceof TrustedHTML) {
        return unsafeHTML(clean);
    }
    if (typeof clean === 'string' && clean.length) {
        return unsafeHTML(clean);
    }
    return html``;
}