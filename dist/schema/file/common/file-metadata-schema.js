"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileMetadataSchema = void 0;
const media_type_schema_1 = require("../../common/media-type-schema");
const path_schema_1 = require("../../common/path-schema");
exports.fileMetadataSchema = {
    $id: '#/file-metadata',
    title: 'File Metadata',
    type: 'object',
    properties: {
        path: path_schema_1.pathSchema,
        mimetype: media_type_schema_1.mediaTypeSchema,
        size: {
            type: 'integer',
            minimum: 0
        }
    },
    additionalProperties: false,
    required: ['path', 'mimetype', 'size']
};
//# sourceMappingURL=file-metadata-schema.js.map