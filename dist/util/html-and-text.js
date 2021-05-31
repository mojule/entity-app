"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlAndText = void 0;
const htmlAndText = (...args) => {
    let text = '';
    let html = '';
    args.forEach(arg => {
        if (typeof arg === 'string') {
            text += arg;
            html += arg;
            return;
        }
        const [href, title] = arg;
        html += `<a href="${href}">${title}</a>`;
        text += `${title}: ${href}`;
    });
    return { text, html };
};
exports.htmlAndText = htmlAndText;
//# sourceMappingURL=html-and-text.js.map