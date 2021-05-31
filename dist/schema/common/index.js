"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonSchema = void 0;
const byteSizeSchema = require("./byte-size.schema.json");
const directorySchema = require("./directory.schema.json");
const filenameSchema = require("./filename.schema.json");
const mediaTypeSchema = require("./media-type.schema.json");
const nameSchema = require("./name.schema.json");
const pathSchema = require("./path.schema.json");
const tagsSchema = require("./tags.schema.json");
exports.commonSchema = {
    byteSize: byteSizeSchema,
    directory: directorySchema,
    filename: filenameSchema,
    mediaType: mediaTypeSchema,
    name: nameSchema,
    path: pathSchema,
    tags: tagsSchema
};
//# sourceMappingURL=index.js.map