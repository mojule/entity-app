"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securitySchema = void 0;
const api_key_schema_1 = require("./api-key-schema");
const reset_password_schema_1 = require("./reset-password-schema");
const createPendingUserSchema = () => {
    console.error('TODO: Not implemented');
    return { $id: '' };
};
exports.securitySchema = {
    apiKey: api_key_schema_1.apiKeySchema,
    pendingUser: createPendingUserSchema(),
    resetPassword: reset_password_schema_1.resetPasswordSchema
};
//# sourceMappingURL=index.js.map