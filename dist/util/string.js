"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTrimmedNonEmptyLines = void 0;
const toTrimmedNonEmptyLines = (s) => s.split('\n').map(s => s.trim()).filter(s => s !== '');
exports.toTrimmedNonEmptyLines = toTrimmedNonEmptyLines;
//# sourceMappingURL=string.js.map