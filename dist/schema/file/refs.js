"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zipFileRefSchema = exports.imageFileRefSchema = exports.fileRefSchema = void 0;
exports.fileRefSchema = {
    type: 'object',
    properties: {
        '_id': {
            title: 'ID',
            type: 'string'
        },
        '_collection': {
            title: 'Collection',
            type: 'string',
            enum: ['file']
        }
    },
    additionalProperties: false,
    required: ['_id', '_collection']
};
exports.imageFileRefSchema = {
    type: 'object',
    properties: {
        '_id': {
            title: 'ID',
            type: 'string'
        },
        '_collection': {
            title: 'Collection',
            type: 'string',
            enum: ['imageFile']
        }
    },
    additionalProperties: false,
    required: ['_id', '_collection']
};
exports.zipFileRefSchema = {
    type: 'object',
    properties: {
        '_id': {
            title: 'ID',
            type: 'string'
        },
        '_collection': {
            title: 'Collection',
            type: 'string',
            enum: ['zipFile']
        }
    },
    additionalProperties: false,
    required: ['_id', '_collection']
};
//# sourceMappingURL=refs.js.map