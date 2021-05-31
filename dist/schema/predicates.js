"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPatternSchema = void 0;
const isPatternSchema = (schema) => schema.type === 'string' && typeof schema.pattern === 'string';
exports.isPatternSchema = isPatternSchema;
//# sourceMappingURL=predicates.js.map