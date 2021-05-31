"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbRefResolver = void 0;
const traverse = require("@entity-schema/json-schema-traverse");
const each_1 = require("../../util/each");
const ref_1 = require("../ref");
const lodash_1 = require("../../util/lodash");
const clone_1 = require("../../util/clone");
const dbRefResolver = async (key, schema, db) => {
    schema = clone_1.clone(schema);
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
    await each_1.eachAsync(dbRefSchemas, async (dbRefSchema) => {
        const { _collection } = dbRefSchema.properties;
        const [slug] = _collection.enum;
        const entityKey = lodash_1.camelCase(slug);
        const collection = db.collections[entityKey];
        if (!collection)
            throw Error(`Expected ${entityKey} in db.collections`);
        const ids = await collection.ids();
        const entities = await collection.loadMany(ids);
        const titles = entities.map(e => {
            if ('name' in e)
                return e['name'];
            const keys = Object.keys(e);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (typeof e[key] === 'string')
                    return e[key];
            }
            return e._id;
        });
        dbRefSchema.properties._id['enum'] = ids;
        dbRefSchema.properties._id['_enumTitles'] = titles;
    });
    return schema;
};
exports.dbRefResolver = dbRefResolver;
//# sourceMappingURL=db-ref-resolver.js.map