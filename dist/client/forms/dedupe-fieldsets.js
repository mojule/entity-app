"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dedupeFieldsets = void 0;
const util_1 = require("../../dom/util");
const dedupeFieldsets = (form) => {
    const fieldsets = Array.from(form.querySelectorAll('fieldset'));
    fieldsets.forEach(fieldset => {
        const { parentElement } = fieldset;
        if (parentElement === null)
            return;
        const legend = Array.from(fieldset.children).find(el => el.matches('legend'));
        if (legend === undefined)
            return;
        if (parentElement.matches('fieldset')) {
            const parentLegend = Array.from(parentElement.children).find(el => el.matches('legend'));
            if (parentLegend === undefined)
                return;
            if (parentLegend.innerHTML === legend.innerHTML) {
                util_1.unwrap(fieldset);
                legend.remove();
            }
        }
    });
};
exports.dedupeFieldsets = dedupeFieldsets;
//# sourceMappingURL=dedupe-fieldsets.js.map