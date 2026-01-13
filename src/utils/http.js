import { fromJson } from './configs.js';

/**
 * @typedef {Object} RequestOptions
 * @property {Record<string, string>} [headers]
 * @property {number} [timeout] - milliseconds
 */

/**
 * Core request function based on Fetch API
 *
 * @param {string} url
 * @param {'GET'|'POST'|'PUT'|'DELETE'} method
 * @param {any} [payload]
 * @param {RequestOptions} [options]
 * @returns {Promise<any>}
 */
async function request(url, method, payload, options = {}) {
    const config = await fromJson('http');
    const configOption = config && Array.isArray(config) ? config[0] : {};
    const finalOption = {
        timeout: 10000,
        ...configOption,
        ...options,
        headers: { 
            'Content-Type': 'application/json',
             ...configOption.headers,
             ...options.headers,
        },
    };

    const timeout = finalOption.timeout;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    const fetchOptions = {
        method,
        headers: finalOption.headers,
        signal: controller.signal,
    };

    // Attach request body for non-GET / non-DELETE methods
    if (payload != null && method !== 'GET' && method !== 'DELETE') {
        fetchOptions.body = JSON.stringify(payload);
    }

    // ---- Request log ----
    console.debug('[request]', {
        method,
        url,
        payload,
        options: fetchOptions,
    });

    try {
        const response = await fetch(url, fetchOptions);
        clearTimeout(timer);

        const contentType = response.headers.get('content-type');
        const isJson = contentType && contentType.includes('application/json');
        const data = isJson ? await response.json() : await response.text();

        // ---- HTTP status error handling ----
        if (!response.ok) {
            console.error('[response error]', {
                url,
                method,
                status: response.status,
                data,
            });

            const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
            error.status = response.status;
            error.data = data;
            throw error;
        }

        // ---- Success log ----
        console.debug('[response success]', {
            url,
            method,
            data,
        });

        return data;
    } catch (err) {
        clearTimeout(timer);

        // ---- Timeout / aborted request ----
        if (err.name === 'AbortError') {
            console.error('[request timeout]', { url, method, timeout });
            throw new Error(`Request timeout after ${timeout}ms`);
        }

        // ---- Network or unknown error ----
        console.error('[request failed]', {
            url,
            method,
            error: err,

        });
        throw err;
    }
}

/**
 * Build URL with query parameters
 *
 * { key1: value1, key2: value2 }
 *   -> url?key1=value1&key2=value2
 *
 * - Automatically URL-encodes keys and values
 * - Ignores null / undefined values
 */
function buildUrl(url, params) {
    if (!params || typeof params !== 'object') return url;
    const query = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) =>`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    if (!query) return url;
    return url.includes('?') ? `${url}&${query}` : `${url}?${query}`;
}

// ---- Public API helpers ----

export function get(url, params, options) {
    const finalUrl = buildUrl(url, params);
    return request(finalUrl, 'GET', undefined, options);
}
export function del(url, params, options) {
    const finalUrl = buildUrl(url, params);
    return request(finalUrl, 'DELETE', undefined, options);
}
export function post(url, payload, options) {
    return request(url, 'POST', payload, options);
}
export function put(url, payload, options) {
    return request(url, 'PUT', payload, options);
}