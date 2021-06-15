"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRefSchema = void 0;
const ref_schema_generic_1 = require("../common/ref-schema-generic");
exports.userRefSchema = Object.assign(Object.assign({ $id: '#/user-ref', title: 'User' }, ref_schema_generic_1.refSharedSchema), { properties: Object.assign(Object.assign({}, ref_schema_generic_1.refSharedProperties), { _collection: {
            title: 'User',
            type: 'string',
            enum: ['user']
        } }) });
//# sourceMappingURL=refs.js.map