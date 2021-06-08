"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMemoryDb = void 0;
const default_drop_1 = require("../default-drop");
const create_collection_1 = require("./create-collection");
const initCollections = (keys) => {
    const collections = {};
    Object.keys(keys).forEach(key => {
        collections[key] = create_collection_1.createCollection({});
    });
    return collections;
};
const createMemoryDb = async (_name, keys) => {
    const drop = async () => default_drop_1.defaultDrop(db)();
    const close = async () => { };
    const collections = initCollections(keys);
    const db = { drop, close, collections };
    return db;
};
exports.createMemoryDb = createMemoryDb;
//# sourceMappingURL=index.js.map