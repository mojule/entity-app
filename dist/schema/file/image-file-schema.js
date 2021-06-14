"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFileSchema = void 0;
const name_schema_1 = require("../common/name-schema");
const tags_schema_1 = require("../common/tags-schema");
const image_file_metadata_schema_1 = require("./common/image-file-metadata-schema");
exports.imageFileSchema = {
    "$id": "#/image-file",
    "title": "Image File",
    "type": "object",
    "properties": {
        "name": name_schema_1.nameSchema,
        "tags": tags_schema_1.tagsSchema,
        "meta": image_file_metadata_schema_1.imageFileMetadataSchema
    },
    "required": ["name", "meta"]
};
//# sourceMappingURL=image-file-schema.js.map