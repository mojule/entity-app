"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileEntityCreateSchema = exports.fileEntitySchema = void 0;
const fileSchema = require("./file.schema.json");
const fileCreateSchema = require("./file-create.schema.json");
const imageFileSchema = require("./image-file.schema.json");
const zipFileSchema = require("./zip-file.schema.json");
exports.fileEntitySchema = {
    file: fileSchema,
    imageFile: imageFileSchema,
    zipFile: zipFileSchema
};
const fileCreate = Object.assign({}, fileCreateSchema, { title: fileSchema.title });
const imageFileCreate = Object.assign({}, fileCreateSchema, { title: imageFileSchema.title });
const zipFileCreate = Object.assign({}, fileCreateSchema, { title: zipFileSchema.title });
exports.fileEntityCreateSchema = {
    file: fileCreate,
    imageFile: imageFileCreate,
    zipFile: zipFileCreate
};
//# sourceMappingURL=index.js.map