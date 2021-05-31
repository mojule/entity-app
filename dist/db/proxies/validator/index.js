"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatedDbFactory = void 0;
const each_entity_key_1 = require("../../../entity/each-entity-key");
const create_collection_1 = require("./create-collection");
const initCollections = async (collections, keys, validator, options) => {
    const validatedCollections = {};
    await each_entity_key_1.eachEntityKey(keys, async (key) => {
        validatedCollections[key] = await create_collection_1.createValidatedCollection(collections[key], key, validator, options);
    });
    return validatedCollections;
};
const validatedDbFactory = (createDb, validator, validateOptions = {
    onCreate: true,
    onLoad: false,
    onSave: true
}) => {
    const createValidatedDb = async (name, keys, options) => {
        const db = await createDb(name, keys, options);
        const { drop, close } = db;
        const collections = await initCollections(db.collections, keys, validator, validateOptions);
        const validatedDb = { collections, drop, close };
        return validatedDb;
    };
    return createValidatedDb;
};
exports.validatedDbFactory = validatedDbFactory;
//# sourceMappingURL=index.js.map