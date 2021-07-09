"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatedDbFactory = void 0;
const create_collection_1 = require("./create-collection");
const initCollections = (collections, validator, options) => {
    const validatedCollections = {};
    for (const key in collections) {
        validatedCollections[key] = create_collection_1.createValidatedCollection(collections[key], key, validator, options);
    }
    return validatedCollections;
};
const validatedDbFactory = (db, validator, validateOptions = {
    onCreate: true,
    onLoad: false,
    onSave: true
}) => {
    const { drop, close } = db;
    const collections = initCollections(db.collections, validator, validateOptions);
    const validatedDb = { collections, drop, close };
    return validatedDb;
};
exports.validatedDbFactory = validatedDbFactory;
//# sourceMappingURL=index.js.map