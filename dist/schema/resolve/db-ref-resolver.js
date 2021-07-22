"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbRefResolver = void 0;
const traverse = require("@entity-schema/json-schema-traverse");
const util_1 = require("@mojule/util");
const ref_1 = require("../ref");
const dbRefResolver = async (_key, schema, db) => {
    schema = util_1.clone(schema);
    const dbRefSchemas = [];
    const cb = (schema) => {
        if (schema.$id === undefined)
            return;
        const idSchema = schema;
        if (ref_1.isDbRefSchema(idSchema)) {
            dbRefSchemas.push(idSchema);
        }
    };
    traverse(schema, { cb });
    await util_1.eachAsync(dbRefSchemas, async (dbRefSchema) => {
        const { _collection } = dbRefSchema.properties;
        const [slug] = _collection.enum;
        const entityKey = util_1.camelCase(slug);
        const collection = db.collections[entityKey];
        if (!collection)
            throw Error(`Expected ${entityKey} in db.collections`);
        const ids = await collection.ids();
        const entities = await collection.loadMany(ids);
        const titles = entities.map((e, i) => (typeof e['name'] === 'string' ? e['name'] : `${entityKey} ${i + 1}`));
        dbRefSchema.properties._id['enum'] = ids;
        dbRefSchema.properties._id['_enumTitles'] = titles;
    });
    return schema;
};
exports.dbRefResolver = dbRefResolver;
//# sourceMappingURL=db-ref-resolver.js.map