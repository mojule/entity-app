"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileEntityCreateSchema = exports.fileEntitySchema = void 0;
const file_schema_1 = require("./file-schema");
const file_create_schema_1 = require("./file-create-schema");
const image_file_schema_1 = require("./image-file-schema");
const zip_file_schema_1 = require("./zip-file-schema");
exports.fileEntitySchema = {
    file: file_schema_1.fileSchema,
    imageFile: image_file_schema_1.imageFileSchema,
    zipFile: zip_file_schema_1.zipFileSchema
};
const fileCreate = Object.assign({}, file_create_schema_1.fileCreateSchema, { title: file_schema_1.fileSchema.title });
const imageFileCreate = Object.assign({}, file_create_schema_1.fileCreateSchema, { title: image_file_schema_1.imageFileSchema.title });
const zipFileCreate = Object.assign({}, file_create_schema_1.fileCreateSchema, { title: zip_file_schema_1.zipFileSchema.title });
exports.fileEntityCreateSchema = {
    file: fileCreate,
    imageFile: imageFileCreate,
    zipFile: zipFileCreate
};
//# sourceMappingURL=index.js.map