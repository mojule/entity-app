"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAllRoles = exports.hasRole = exports.Roles = void 0;
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
//# sourceMappingURL=roles.js.map