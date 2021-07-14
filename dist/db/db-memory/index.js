"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultDbItem = exports.createMemoryDb = void 0;
const default_drop_1 = require("../default-drop");
const create_collection_1 = require("./create-collection");
const util_1 = require("@mojule/util");
const initCollections = (keys, createDbItem) => {
    const collections = {};
    Object.keys(keys).forEach(key => {
        collections[key] = create_collection_1.createCollection(createDbItem);
    });
    return collections;
};
const createMemoryDb = async (_name, keys, createDbItem) => {
    const drop = async () => default_drop_1.defaultDrop(db)();
    const close = async () => { };
    const collections = initCollections(keys, createDbItem);
    const db = { drop, close, collections };
    return db;
};
exports.createMemoryDb = createMemoryDb;
const createDefaultDbItem = () => ({ _id: util_1.randId() });
exports.createDefaultDbItem = createDefaultDbItem;
//# sourceMappingURL=index.js.map