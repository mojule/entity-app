"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFileMetadataSchema = void 0;
const media_type_schema_1 = require("../../common/media-type-schema");
const path_schema_1 = require("../../common/path-schema");
exports.imageFileMetadataSchema = {
    "$id": "#/image-file-metadata",
    "title": "Image File Metadata",
    "type": "object",
    "properties": {
        "path": path_schema_1.pathSchema,
        "mimetype": media_type_schema_1.mediaTypeSchema,
        "size": {
            "type": "integer",
            "minimum": 0
        },
        "width": {
            "type": "integer"
        },
        "height": {
            "type": "integer"
        }
    },
    "additionalProperties": false,
    "required": ["path", "mimetype", "size", "width", "height"]
};
//# sourceMappingURL=image-file-metadata-schema.js.map