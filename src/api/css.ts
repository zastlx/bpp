export default function injectCSS(css: string): HTMLStyleElement {
    const style = document.createElement("style");
    style.id = `bpp-${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 16)}`;
    style.innerHTML = css;
    document.head.appendChild(style);

    return style;
}