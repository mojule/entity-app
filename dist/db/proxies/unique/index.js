"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueFieldDbFactory = void 0;
const each_entity_key_1 = require("../../../entity/each-entity-key");
const create_collection_1 = require("./create-collection");
const initCollections = async (collections, keys, getUniqueFieldNames) => {
    const unique = {};
    await each_entity_key_1.eachEntityKey(keys, async (key) => {
        const uniqueNames = getUniqueFieldNames(key);
        unique[key] = await create_collection_1.createUniqueFieldsCollection(collections[key], key, uniqueNames);
    });
    return unique;
};
const uniqueFieldDbFactory = (createDb, getUniqueFieldNames) => {
    const createMetadataDb = async (name, keys, options) => {
        const db = await createDb(name, keys, options);
        const { drop, close } = db;
        const collections = await initCollections(db.collections, keys, getUniqueFieldNames);
        const metadataDb = { collections, drop, close };
        return metadataDb;
    };
    return createMetadataDb;
};
exports.uniqueFieldDbFactory = uniqueFieldDbFactory;
//# sourceMappingURL=index.js.map