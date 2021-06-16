"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPropertiesSchema = exports.isPatternSchema = void 0;
const isPatternSchema = (schema) => typeof schema === 'object' && schema.type === 'string' &&
    typeof schema.pattern === 'string';
exports.isPatternSchema = isPatternSchema;
const isPropertiesSchema = (schema) => {
    if (typeof schema === 'boolean')
        return false;
    if (schema.type !== 'object')
        return false;
    if (typeof schema.properties !== 'object')
        return false;
    return true;
};
exports.isPropertiesSchema = isPropertiesSchema;
//# sourceMappingURL=predicates.js.map