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
function isDarkPreferred() {
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
    document.body.classList.toggle(_dark, dark);
    localStorage.setItem(_key_ls, `${dark}`);
    return dark;
}

/* --- self-invocation --- */
let preferred = isDarkPreferred();
preferred = toggleTheme(preferred);
console.trace(`current theme is [${ preferred ? 'dark' : 'light' }].`);