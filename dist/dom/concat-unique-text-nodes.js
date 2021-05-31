"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatAndMoveCss = exports.concatAndMove = exports.concatUniqueTextNodes = void 0;
const CleanCSS = require("clean-css");
const log_iisnode_1 = require("@mojule/log-iisnode");
const cleanCss = new CleanCSS();
const concatUniqueTextNodes = (...elements) => {
    const textSet = new Set();
    elements.forEach(el => textSet.add(el.textContent));
    return [...textSet].join('\n');
};
exports.concatUniqueTextNodes = concatUniqueTextNodes;
const concatAndMove = (wrapper, target, ...elements) => {
    const text = exports.concatUniqueTextNodes(...elements);
    elements.forEach(el => el.remove());
    if (text) {
        target.appendChild(wrapper(text));
    }
};
exports.concatAndMove = concatAndMove;
const concatAndMoveCss = (wrapper, target, ...elements) => {
    let css = exports.concatUniqueTextNodes(...elements);
    elements.forEach(el => el.remove());
    if (css) {
        const start = process.hrtime();
        const minified = cleanCss.minify(css);
        const end = process.hrtime(start);
        log_iisnode_1.log.debug(`css minify time: ${end[0] * 1e3 + end[1] / 1e6}ms`);
        target.appendChild(wrapper(minified.styles));
    }
};
exports.concatAndMoveCss = concatAndMoveCss;
//# sourceMappingURL=concat-unique-text-nodes.js.map