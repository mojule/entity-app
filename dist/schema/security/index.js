"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securitySchema = void 0;
const api_key_schema_1 = require("./api-key-schema");
const user_schema_1 = require("./user-schema");
const resetPasswordSchema = require("./reset-password-schema");
const util_1 = require("@mojule/util");
const roles_1 = require("../../security/roles");
// TODO - readOnly is nonstandard find where used and figure out better way
// and default doesn't work either - why??? it should be able to be string[]?
Object.assign(user_schema_1.userSchema.properties.roles, {
    readOnly: true,
    default: ["user"]
});
const pendingUserSchema = util_1.clone(user_schema_1.userSchema);
Object.assign(pendingUserSchema, {
    $id: '#/pending-user',
    title: 'Pending User',
    required: [...pendingUserSchema.required, 'secret']
});
Object.assign(pendingUserSchema.properties, {
    secret: {
        title: 'Secret',
        description: 'The Pending User Secret',
        type: 'string',
        default: '',
        readOnly: true
    }
});
exports.securitySchema = {
    apiKey: roles_1.addRolesToSchema(api_key_schema_1.apiKeySchema, api_key_schema_1.apiKeyRoles),
    user: roles_1.addRolesToSchema(user_schema_1.userSchema, user_schema_1.userRoles, user_schema_1.userPropertyRoles),
    pendingUser: roles_1.addRolesToSchema(pendingUserSchema, user_schema_1.userRoles, user_schema_1.userPropertyRoles),
    resetPassword: resetPasswordSchema
};
//# sourceMappingURL=index.js.map