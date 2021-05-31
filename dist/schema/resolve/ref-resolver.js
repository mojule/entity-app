"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refResolver = void 0;
const each_1 = require("../../util/each");
const traverse = require("@entity-schema/json-schema-traverse");
const clone_1 = require("../../util/clone");
const refResolver = (schemas, key) => {
    const idToKeyMap = new Map();
    each_1.eachObjectMap(schemas, (schema, key) => {
        const { $id } = schema;
        idToKeyMap.set($id, key);
    });
    const schema = clone_1.clone(schemas[key]);
    const cb = (schema) => {
        if (schema.$ref) {
            const refId = schema.$ref;
            const key = idToKeyMap.get(refId);
            if (key === undefined)
                throw Error(`Expected a schema for ${refId}`);
            const refSchema = schemas[key];
            delete schema.$ref;
            Object.assign(schema, refSchema);
        }
    };
    traverse(schema, { cb });
    return schema;
};
exports.refResolver = refResolver;
//# sourceMappingURL=ref-resolver.js.map