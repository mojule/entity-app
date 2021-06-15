"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securitySchema = void 0;
const api_key_schema_1 = require("./api-key-schema");
const user_schema_1 = require("./user-schema");
const resetPasswordSchema = require("./reset-password-schema");
const roles_1 = require("../../security/roles");
// no straightforward way to extend schema at the moment - figure this out
// later
// TODO - readOnly is nonstandard find where used and figure out better way
// and default doesn't work either - why??? it should be able to be string[]?
Object.assign(user_schema_1.userSchema.properties.roles, {
    readOnly: true,
    default: ["user"]
});
Object.assign(user_schema_1.pendingUserSchema.properties.roles, {
    readOnly: true,
    default: ["user"]
});
Object.assign(user_schema_1.pendingUserSchema.properties.secret, {
    readOnly: true,
    default: ''
});
// const pendingUserSchema = clone(userSchema)
// Object.assign(
//   pendingUserSchema,
//   {
//     $id: '#/pending-user',
//     title: 'Pending User',
//     required: [ ...pendingUserSchema.required, 'secret' ]
//   }
// )
// Object.assign(
//   pendingUserSchema.properties,
//   {
//     secret: {
//       title: 'Secret',
//       description: 'The Pending User Secret',
//       type: 'string',
//       default: '',
//       readOnly: true    
//     }    
//   }
// )
exports.securitySchema = {
    apiKey: roles_1.addRolesToSchema(api_key_schema_1.apiKeySchema, api_key_schema_1.apiKeyRoles),
    user: roles_1.addRolesToSchema(user_schema_1.userSchema, user_schema_1.userRoles, user_schema_1.userPropertyRoles),
    pendingUser: roles_1.addRolesToSchema(user_schema_1.pendingUserSchema, user_schema_1.userRoles, user_schema_1.userPropertyRoles),
    resetPassword: resetPasswordSchema
};
//# sourceMappingURL=index.js.map