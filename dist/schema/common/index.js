"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonSchema = void 0;
const byte_size_schema_1 = require("./byte-size-schema");
const directory_schema_1 = require("./directory-schema");
const filename_schema_1 = require("./filename-schema");
const media_type_schema_1 = require("./media-type-schema");
const name_schema_1 = require("./name-schema");
const path_schema_1 = require("./path-schema");
const tags_schema_1 = require("./tags-schema");
exports.commonSchema = {
    byteSize: byte_size_schema_1.byteSizeSchema,
    directory: directory_schema_1.directorySchema,
    filename: filename_schema_1.filenameSchema,
    mediaType: media_type_schema_1.mediaTypeSchema,
    name: name_schema_1.nameSchema,
    path: path_schema_1.pathSchema,
    tags: tags_schema_1.tagsSchema
};
//# sourceMappingURL=index.js.map