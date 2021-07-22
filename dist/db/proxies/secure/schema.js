"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureCollectionSchema = exports.secureGroupSchema = exports.secureUserSchema = exports.loginUserSchema = exports.secureDbItemSchema = void 0;
const schema_1 = require("../metadata/schema");
const refs_1 = require("./refs");
exports.secureDbItemSchema = {
    id: '#/secure-db-item',
    title: 'Secure DB Item',
    type: 'object',
    properties: Object.assign({ _mode: { type: 'integer', minimum: 0, maximum: 0o7777, default: 0o0700 }, _owner: refs_1.secureUserRefSchema, _group: refs_1.secureGroupRefSchema }, schema_1.metadataDbItemSchema.properties),
    required: [
        '_id', '_mode', '_owner', '_group', '_atime', '_ctime', '_mtime', '_ver'
    ]
};
exports.loginUserSchema = {
    id: '#/login-user',
    title: 'Login User',
    type: 'object',
    properties: {
        name: { type: 'string' },
        password: { type: 'string', format: 'password' }
    },
    required: ['name', 'password']
};
exports.secureUserSchema = {
    id: '#/secure-user',
    title: 'Secure User',
    type: 'object',
    properties: Object.assign(Object.assign({}, exports.loginUserSchema.properties), { isRoot: { type: 'boolean', default: false } }),
    required: ['name', 'password']
};
exports.secureGroupSchema = {
    id: '#/secure-group',
    title: 'Secure Group',
    type: 'object',
    properties: {
        name: { type: 'string' },
        users: {
            type: 'array',
            items: refs_1.secureUserRefSchema
        }
    },
    required: ['name', 'users']
};
exports.secureCollectionSchema = {
    id: '#/secure-collection',
    title: 'Secure Collection',
    type: 'object',
    properties: {
        name: { type: 'string' } // should be a collection name - enum?
    },
    required: ['name']
};
//# sourceMappingURL=schema.js.map