"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiStore = void 0;
const create_collection_1 = require("./create-collection");
const each_entity_key_1 = require("../../entity/each-entity-key");
const initCollections = (keys) => {
    const collections = {};
    each_entity_key_1.eachEntityKeySync(keys, key => {
        collections[key] =
            create_collection_1.createCollection(key);
    });
    return collections;
};
const createApiStore = async (_name, keys) => {
    const drop = async () => { };
    const close = async () => { };
    const collections = initCollections(keys);
    const db = { drop, close, collections };
    return db;
};
exports.createApiStore = createApiStore;
//# sourceMappingURL=index.js.map