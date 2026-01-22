const _exp = '(prefers-color-scheme: dark)';
const _dark = 'dark';
const _key_ls = 'demo-enabled-theme-dark';

function isDarkOS() {
    const prefersDarkScheme = window.matchMedia(_exp);
    return prefersDarkScheme.matches;
}
function isDarkSetted() {
    return localStorage.getItem(_key_ls) === 'true';
}
export function isDarkPreferred() {
    return isDarkSetted() || isDarkOS();
}
function isDark() {
    return document.body.classList.contains(_dark);
}
export function toggleTheme(force) {
    let dark = isDark();
    if (force === undefined) {
        dark = !dark;
    } else {
        dark = !!force;
    }
    document.body.dispatchEvent(new ThemeToggleEvent(dark));
    document.body.classList.toggle(_dark, dark);
    localStorage.setItem(_key_ls, `${dark}`);
    return dark;
}

export function addThemeListener(callback) {
    document.body.addEventListener(ThemeToggleEvent.TYPE, callback);
}

export function removeThemeListener(callback) {
    document.body.removeEventListener(ThemeToggleEvent.TYPE, callback);
}

export class ThemeToggleEvent extends CustomEvent {
    static TYPE = 'demo-theme-toggle';
    constructor(dark) {
        super(ThemeToggleEvent.TYPE, {
            detail: { dark: !!dark, },
            bubbles: false,
            cancelable: true
        });
    }
}

/* --- self-invocation --- */
let preferred = isDarkPreferred();
preferred = toggleTheme(preferred);
console.trace(`current theme is [${ preferred ? 'dark' : 'light' }].`);