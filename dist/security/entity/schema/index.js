"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securitySchema = void 0;
const apiKeySchema = require("./api-key.json");
const userSchema = require("./user.json");
const resetPasswordSchema = require("./reset-password.json");
const clone_1 = require("../../../util/clone");
const pendingUserSchema = clone_1.clone(userSchema);
pendingUserSchema.$id = '#/pending-user';
pendingUserSchema.title = 'Pending User';
pendingUserSchema.required.push('secret');
pendingUserSchema.properties['secret'] = {
    title: 'Secret',
    description: 'The Pending User Secret',
    type: 'string',
    default: '',
    readOnly: true
};
exports.securitySchema = {
    apiKey: apiKeySchema,
    user: userSchema,
    pendingUser: pendingUserSchema,
    resetPassword: resetPasswordSchema
};
//# sourceMappingURL=index.js.map