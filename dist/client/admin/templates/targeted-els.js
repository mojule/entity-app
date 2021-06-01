"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.footerEls = exports.headerEls = void 0;
const util_1 = require("../../../dom/util");
const headerEls = (...els) => util_1.decorateData({ target: 'header' }, ...els);
exports.headerEls = headerEls;
const footerEls = (...els) => util_1.decorateData({ target: 'footer' }, ...els);
exports.footerEls = footerEls;
//# sourceMappingURL=targeted-els.js.map