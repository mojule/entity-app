"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefSchemaMap = exports.isDbRefSchema = exports.refFactory = void 0;
const util_1 = require("@mojule/util");
const refCache = {};
const getCacheForUri = (uri) => {
    let refCacheForUri = refCache[uri];
    if (refCacheForUri === undefined) {
        refCacheForUri = {};
        refCache[uri] = refCacheForUri;
    }
    return refCacheForUri;
};
const getCachedSchema = (cache, name) => {
    const schema = cache[name];
    if (schema !== undefined) {
        return schema;
    }
};
const refFactory = (uri) => {
    uri = uri.endsWith('/') ? uri : uri + '/';
    const cache = getCacheForUri(uri);
    const ref = (name) => {
        let schema = getCachedSchema(cache, name);
        if (schema) {
            return schema;
        }
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
        schema = {
            $id, title, type, properties, required
        };
        cache[name] = schema;
        return schema;
    };
    return ref;
};
exports.refFactory = refFactory;
const isIdSchema = (schema) => {
    if (typeof schema !== 'object')
        return false;
    if (typeof schema['title'] !== 'string')
        return false;
    if (schema['type'] !== 'string')
        return false;
    return true;
};
const isCollectionSchema = (schema) => {
    if (typeof schema !== 'object')
        return false;
    if (typeof schema['title'] !== 'string')
        return false;
    if (schema['type'] !== 'string')
        return false;
    if (!Array.isArray(schema['enum']))
        return false;
    if (typeof schema['enum'][0] !== 'string')
        return false;
    return true;
};
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
    if (!isIdSchema(schema['properties']._id))
        return false;
    if (!isCollectionSchema(schema['properties']._collection))
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