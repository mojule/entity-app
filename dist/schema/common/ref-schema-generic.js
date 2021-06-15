"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refSharedProperties = exports.refSharedSchema = void 0;
exports.refSharedSchema = {
    type: 'object',
    additionalProperties: false,
    required: ['_id', '_collection']
};
exports.refSharedProperties = {
    '_id': {
        title: 'ID',
        type: 'string'
    }
};
//# sourceMappingURL=ref-schema-generic.js.map