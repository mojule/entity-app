"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadataDbFactory = void 0;
const each_entity_key_1 = require("../../../entity/each-entity-key");
const create_collection_1 = require("./create-collection");
const initCollections = async (collections, keys) => {
    const metadataCollections = {};
    await each_entity_key_1.eachEntityKey(keys, async (key) => {
        metadataCollections[key] = await create_collection_1.createMetadataCollection(collections[key], key);
    });
    return metadataCollections;
};
const metadataDbFactory = (createDb) => {
    const createMetadataDb = async (name, keys, options) => {
        const db = await createDb(name, keys, options);
        const { drop, close } = db;
        const collections = await initCollections(db.collections, keys);
        const metadataDb = { collections, drop, close };
        return metadataDb;
    };
    return createMetadataDb;
};
exports.metadataDbFactory = metadataDbFactory;
//# sourceMappingURL=index.js.map