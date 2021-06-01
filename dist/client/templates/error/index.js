"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const h_1 = require("../../../dom/h");
const error = (model) => h_1.fragment(h_1.h1(model.name || 'Error'), h_1.p(model.message || 'Unknown error'), h_1.pre(model.stack || ''));
exports.error = error;
//# sourceMappingURL=index.js.map