"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zipFileSchema = void 0;
const name_schema_1 = require("../common/name-schema");
const path_schema_1 = require("../common/path-schema");
const tags_schema_1 = require("../common/tags-schema");
const file_metadata_schema_1 = require("./common/file-metadata-schema");
const refs_1 = require("./refs");
exports.zipFileSchema = {
    $id: '#/zip-file',
    title: 'ZIP File',
    type: 'object',
    properties: {
        name: name_schema_1.nameSchema,
        tags: tags_schema_1.tagsSchema,
        meta: file_metadata_schema_1.fileMetadataSchema,
        paths: {
            title: 'Paths',
            description: 'Paths in ZIP',
            type: 'array',
            items: path_schema_1.pathSchema
        },
        files: {
            title: 'Files',
            description: 'Files in ZIP',
            type: 'array',
            items: refs_1.fileRefSchema
        },
        images: {
            title: 'Images',
            description: 'Images in ZIP',
            type: 'array',
            items: refs_1.imageFileRefSchema
        }
    },
    required: ['name', 'meta', 'paths', 'files', 'images']
};
//# sourceMappingURL=zip-file-schema.js.map