export default function injectCSS(css: string): HTMLStyleElement {
    const style = document.createElement("style");
    style.id = `bpp-${Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 16)}`;
    style.innerHTML = css;
    document.head.appendChild(style);

    return style;
}

injectCSS(`.styles__select___4kC90-camelCase {
    font-size: 1.302vw;
    background-color: #3f3f3f;
    color: white;
    border: 0.156vw solid rgba(0, 0, 0, 0.17);
    border-radius: 0.313vw;
    padding: 0.156vw 1.042vw;
    outline: none;

}`)