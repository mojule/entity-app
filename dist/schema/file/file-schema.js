"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileSchema = void 0;
const name_schema_1 = require("../common/name-schema");
const tags_schema_1 = require("../common/tags-schema");
const file_metadata_schema_1 = require("./common/file-metadata-schema");
exports.fileSchema = {
    $id: '#/file',
    title: 'File',
    type: 'object',
    properties: {
        name: name_schema_1.nameSchema,
        tags: tags_schema_1.tagsSchema,
        meta: file_metadata_schema_1.fileMetadataSchema
    },
    required: ['name', 'meta']
};
//# sourceMappingURL=file-schema.js.map