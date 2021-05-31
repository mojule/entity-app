"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrap = void 0;
const unwrap = (el) => {
    const { parentElement } = el;
    if (parentElement === null)
        throw Error('Expected parentElement');
    while (el.firstChild) {
        parentElement.insertBefore(el.firstChild, el);
    }
    el.remove();
};
exports.unwrap = unwrap;
//# sourceMappingURL=unwrap.js.map