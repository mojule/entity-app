"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strictSelect = void 0;
const strictSelect = (selectors, parent) => {
    parent = parent || document;
    const result = parent.querySelector(selectors);
    if (result === null)
        throw Error('Expected selectors');
    return result;
};
exports.strictSelect = strictSelect;
//# sourceMappingURL=strict-select.js.map