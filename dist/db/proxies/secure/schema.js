"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureCollectionSchema = exports.secureGroupSchema = exports.secureUserSchema = exports.secureDbItemSchema = void 0;
const refs_1 = require("./refs");
exports.secureDbItemSchema = {
    id: '#/secure-db-item',
    title: 'Secure DB Item',
    type: 'object',
    properties: {
        _id: { type: 'string' },
        _mode: { type: 'integer', minimum: 0, maximum: 0o7777, default: 0o0700 },
        _owner: refs_1.secureUserRefSchema,
        _group: refs_1.secureGroupRefSchema,
        _atime: { type: 'integer' },
        _ctime: { type: 'integer' },
        _mtime: { type: 'integer' }
    },
    required: [
        '_id', '_mode', '_owner', '_group', '_atime', '_ctime', '_mtime'
    ]
};
exports.secureUserSchema = {
    id: '#/secure-user',
    title: 'Secure User',
    type: 'object',
    properties: {
        name: { type: 'string' },
        password: { type: 'string', format: 'password' },
        isRoot: { type: 'boolean', default: false }
    },
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