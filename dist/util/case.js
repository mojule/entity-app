"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dotCase = void 0;
const lodash_1 = require("./lodash");
const dotCase = (s) => lodash_1.kebabCase(s).replace(/\-/g, '.');
exports.dotCase = dotCase;
//# sourceMappingURL=case.js.map