"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zipFileRefSchema = exports.imageFileRefSchema = exports.fileRefSchema = void 0;
const ref_schema_generic_1 = require("../common/ref-schema-generic");
exports.fileRefSchema = Object.assign(Object.assign({ $id: '#/file-ref', title: 'File Reference' }, ref_schema_generic_1.refSharedSchema), { properties: Object.assign(Object.assign({}, ref_schema_generic_1.refSharedProperties), { _collection: {
            title: 'File',
            type: 'string',
            enum: ['file']
        } }) });
exports.imageFileRefSchema = Object.assign(Object.assign({ $id: '#/image-file-ref', title: 'Image File Reference' }, ref_schema_generic_1.refSharedSchema), { properties: Object.assign(Object.assign({}, ref_schema_generic_1.refSharedProperties), { _collection: {
            title: 'Image File',
            type: 'string',
            enum: ['imageFile']
        } }) });
exports.zipFileRefSchema = Object.assign(Object.assign({ $id: '#/zip-file-ref', title: 'Zip File Reference' }, ref_schema_generic_1.refSharedSchema), { properties: Object.assign(Object.assign({}, ref_schema_generic_1.refSharedProperties), { _collection: {
            title: 'Zip File',
            type: 'string',
            enum: ['zipFile']
        } }) });
//# sourceMappingURL=refs.js.map