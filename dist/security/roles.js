"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRolesToSchema = exports.hasAllRoles = exports.hasRole = exports.Roles = void 0;
exports.Roles = {
    admin: 'admin',
    user: 'user',
    currentUser: 'currentUser',
    public: 'public'
};
const hasRole = (roles, role) => roles.includes(role);
exports.hasRole = hasRole;
const hasAllRoles = (required, user) => required.every(r => exports.hasRole(user, r));
exports.hasAllRoles = hasAllRoles;
const addRolesToSchema = (schema, roles, propertyRoles) => {
    const roleSchema = Object.assign({}, schema, { _esRoles: roles });
    if (propertyRoles) {
        if (schema['properties']) {
            Object.keys(propertyRoles).forEach(key => {
                const property = schema['properties'][key];
                if (!property)
                    return;
                property._esRoles = propertyRoles[key];
            });
        }
    }
    return roleSchema;
};
exports.addRolesToSchema = addRolesToSchema;
//# sourceMappingURL=roles.js.map