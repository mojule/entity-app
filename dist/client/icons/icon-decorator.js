"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iconDecorator = void 0;
const h_1 = require("../utils/h");
const iconDecorator = (classMap) => {
    const icons = [
        ...document.querySelectorAll('[data-icon], [data-icon-label]')
    ];
    icons.forEach(el => {
        const existing = el.querySelector('i');
        if (existing)
            return;
        const { icon, iconLabel } = el.dataset;
        if (iconLabel && iconLabel in classMap) {
            const iconElement = h_1.i({ class: classMap[iconLabel] });
            el.prepend(iconElement);
        }
        else if (icon && icon in classMap) {
            const iconElement = h_1.i({ class: classMap[icon] });
            iconElement.title = el.innerText;
            el.innerHTML = '';
            el.append(iconElement);
        }
    });
};
exports.iconDecorator = iconDecorator;
//# sourceMappingURL=icon-decorator.js.map