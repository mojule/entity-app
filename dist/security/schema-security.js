"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canAccessSchemaField = exports.canAccessSchema = void 0;
const canAccessSchema = (schema, type, currentRoles) => {
    const { _esRoles } = schema;
    if (_esRoles === undefined) {
        if (type === 'read')
            return true;
        return currentRoles.includes('admin');
    }
    const expectRoles = _esRoles[type];
    return expectRoles.every(role => currentRoles.includes(role));
};
exports.canAccessSchema = canAccessSchema;
const canAccessSchemaField = () => {
};
exports.canAccessSchemaField = canAccessSchemaField;
//# sourceMappingURL=schema-security.js.map