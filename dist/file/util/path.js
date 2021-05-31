"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.join = void 0;
const path_1 = require("path");
// redefine to only be strings
const join = (...args) => path_1.posix.join(...args);
exports.join = join;
//# sourceMappingURL=path.js.map