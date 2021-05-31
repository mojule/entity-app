"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Css = void 0;
const Css = (style) => {
    const css = (strings, ...keys) => style(strings.map((s, i) => s + (keys[i] || '')).join(''));
    return css;
};
exports.Css = Css;
//# sourceMappingURL=css.js.map