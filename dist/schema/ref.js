"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefSchemaMap = exports.isDbRefSchema = exports.refFactory = void 0;
const util_1 = require("@mojule/util");
const refFactory = (uri) => {
    uri = uri.endsWith('/') ? uri : uri + '/';
    const ref = (name) => {
        const slug = util_1.kebabCase(name);
        const $id = `${uri}${slug}-ref`;
        const title = util_1.startCase(name);
        const type = 'object';
        const properties = {
            '_id': {
                title: 'ID',
                type: 'string'
            },
            '_collection': {
                title: 'Collection',
                type: 'string',
                enum: [name]
            }
        };
        const required = ['_id', '_collection'];
        const schema = {
            $id, title, type, properties, required
        };
        return schema;
    };
    return ref;
};
exports.refFactory = refFactory;
const isDbRefSchema = (schema) => {
    if (typeof schema !== 'object')
        return false;
    if (typeof schema['$id'] !== 'string')
        return false;
    if (typeof schema['title'] !== 'string')
        return false;
    if (schema['type'] !== 'object')
        return false;
    if (!schema['properties'])
        return false;
    if (!schema['properties']._id)
        return false;
    if (!schema['properties']._collection)
        return false;
    return true;
};
exports.isDbRefSchema = isDbRefSchema;
const createRefSchemaMap = (entitySchemas, createRef) => {
    const refSchemas = {};
    util_1.eachKeyValueMap(entitySchemas, (_schema, key) => {
        const refSchema = createRef(key);
        const refKey = `${key}Ref`;
        refSchemas[refKey] = refSchema;
    });
    return refSchemas;
};
exports.createRefSchemaMap = createRefSchemaMap;
//# sourceMappingURL=ref.js.map