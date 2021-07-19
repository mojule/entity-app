"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadataDbItemSchema = void 0;
exports.metadataDbItemSchema = {
    id: '#/metadata-db-item',
    title: 'Metadata DB Item',
    type: 'object',
    properties: {
        _id: { type: 'string' },
        _atime: { type: 'integer' },
        _ctime: { type: 'integer' },
        _mtime: { type: 'integer' },
        _ver: { type: 'integer', minimum: 0 }
    },
    required: [
        '_id', '_atime', '_ctime', '_mtime', '_ver'
    ]
};
//# sourceMappingURL=schema.js.map