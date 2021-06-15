"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileCreateSchema = void 0;
const tags_schema_1 = require("../common/tags-schema");
exports.fileCreateSchema = {
    $id: '#/file-create',
    title: 'Upload File',
    type: 'object',
    properties: {
        file: {
            title: 'Upload File',
            type: 'string',
            format: 'file'
        },
        tags: tags_schema_1.tagsSchema
    }
};
//# sourceMappingURL=file-create-schema.js.map