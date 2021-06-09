"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRefSchema = void 0;
exports.userRefSchema = {
    type: 'object',
    properties: {
        '_id': {
            title: 'ID',
            type: 'string'
        },
        '_collection': {
            title: 'Collection',
            type: 'string',
            enum: ['user']
        }
    },
    additionalProperties: false,
    required: ['_id', '_collection']
};
//# sourceMappingURL=refs.js.map