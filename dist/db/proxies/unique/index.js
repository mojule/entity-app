"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueFieldDbFactory = void 0;
const create_collection_1 = require("./create-collection");
const initCollections = (collections, getUniqueFieldNames) => {
    const unique = {};
    const keys = Object.keys(collections);
    keys.forEach(key => {
        const uniqueNames = getUniqueFieldNames(key);
        unique[key] = create_collection_1.createUniqueFieldsCollection(collections[key], key, uniqueNames);
    });
    return unique;
};
const uniqueFieldDbFactory = (db, getUniqueFieldNames) => {
    const { drop, close } = db;
    const collections = initCollections(db.collections, getUniqueFieldNames);
    const metadataDb = { collections, drop, close };
    return metadataDb;
};
exports.uniqueFieldDbFactory = uniqueFieldDbFactory;
//# sourceMappingURL=index.js.map