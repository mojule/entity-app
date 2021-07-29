"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pendingUserSchema = exports.userSecretSchema = exports.secretSchema = void 0;
const ref_1 = require("../../../../schema/ref");
const schema_1 = require("../schema");
const createRef = ref_1.refFactory('#');
const secret = {
    title: 'Secret',
    type: 'string',
    format: 'password'
};
exports.secretSchema = {
    id: '#/secret',
    title: 'Secret',
    type: 'object',
    properties: { secret },
    required: ['secret']
};
exports.userSecretSchema = {
    id: '#/user-secret',
    title: 'User Secret',
    type: 'object',
    properties: {
        type: { type: 'string' },
        user: createRef('user'),
        secret
    },
    required: ['type', 'user', 'secret']
};
exports.pendingUserSchema = {
    id: '#/pending-user',
    title: 'Pending User',
    type: 'object',
    properties: Object.assign(Object.assign({}, schema_1.loginUserSchema.properties), { secret }),
    required: ['name', 'password', 'secret']
};
//# sourceMappingURL=schema.js.map