"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileCommonSchema = void 0;
const file_metadata_schema_1 = require("./file-metadata-schema");
const image_file_metadata_schema_1 = require("./image-file-metadata-schema");
exports.fileCommonSchema = {
    fileMetadata: file_metadata_schema_1.fileMetadataSchema,
    imageFileMetadata: image_file_metadata_schema_1.imageFileMetadataSchema,
};
//# sourceMappingURL=index.js.map