"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMetadataDbItem = exports.metadataDbFactory = void 0;
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
    const collections = initCollections(db.collections);
    const metadataDb = Object.assign({}, db, { collections });
    return metadataDb;
};
exports.metadataDbFactory = metadataDbFactory;
const createMetadataDbItem = () => {
    const now = Date.now();
    const _id = util_1.randId();
    const _ver = 0;
    const _atime = now;
    const _ctime = now;
    const _mtime = now;
    const dbItem = { _id, _ver, _atime, _ctime, _mtime };
    return dbItem;
};
exports.createMetadataDbItem = createMetadataDbItem;
//# sourceMappingURL=index.js.map