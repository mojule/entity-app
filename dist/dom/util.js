"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyElement = void 0;
const emptyElement = (el) => {
    while (el.firstChild)
        el.removeChild(el.firstChild);
};
exports.emptyElement = emptyElement;
//# sourceMappingURL=util.js.map