"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.footerEls = exports.headerEls = void 0;
const decorate_1 = require("../../utils/decorate");
const headerEls = (...els) => decorate_1.decorateData({ target: 'header' }, ...els);
exports.headerEls = headerEls;
const footerEls = (...els) => decorate_1.decorateData({ target: 'footer' }, ...els);
exports.footerEls = footerEls;
//# sourceMappingURL=targeted-els.js.map