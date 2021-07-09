"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMetadataItem = exports.metadataDbFactory = void 0;
const create_collection_1 = require("./create-collection");
const util_1 = require("@mojule/util");
const initCollections = (collections) => {
    const metadataCollections = {};
    const keys = Object.keys(collections);
    keys.forEach(key => {
        metadataCollections[key] = create_collection_1.createMetadataCollection(collections[key], key);
    });
    return metadataCollections;
};
const metadataDbFactory = (db) => {
    const { drop, close } = db;
    const collections = initCollections(db.collections);
    const metadataDb = { collections, drop, close };
    return metadataDb;
};
exports.metadataDbFactory = metadataDbFactory;
const createMetadataItem = () => {
    const now = new Date().toJSON();
    const _id = util_1.randId();
    const _v = 0;
    const _created = now;
    const _updated = now;
    const dbItem = { _id, _v, _created, _updated };
    return dbItem;
};
exports.createMetadataItem = createMetadataItem;
//# sourceMappingURL=index.js.map