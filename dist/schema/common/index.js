"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsSchema = exports.pathSchema = exports.nameSchema = exports.mediaTypeSchema = exports.filenameSchema = exports.directorySchema = exports.byteSizeSchema = exports.commonSchema = void 0;
const byte_size_schema_1 = require("./byte-size-schema");
Object.defineProperty(exports, "byteSizeSchema", { enumerable: true, get: function () { return byte_size_schema_1.byteSizeSchema; } });
const directory_schema_1 = require("./directory-schema");
Object.defineProperty(exports, "directorySchema", { enumerable: true, get: function () { return directory_schema_1.directorySchema; } });
const filename_schema_1 = require("./filename-schema");
Object.defineProperty(exports, "filenameSchema", { enumerable: true, get: function () { return filename_schema_1.filenameSchema; } });
const media_type_schema_1 = require("./media-type-schema");
Object.defineProperty(exports, "mediaTypeSchema", { enumerable: true, get: function () { return media_type_schema_1.mediaTypeSchema; } });
const name_schema_1 = require("./name-schema");
Object.defineProperty(exports, "nameSchema", { enumerable: true, get: function () { return name_schema_1.nameSchema; } });
const path_schema_1 = require("./path-schema");
Object.defineProperty(exports, "pathSchema", { enumerable: true, get: function () { return path_schema_1.pathSchema; } });
const tags_schema_1 = require("./tags-schema");
Object.defineProperty(exports, "tagsSchema", { enumerable: true, get: function () { return tags_schema_1.tagsSchema; } });
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