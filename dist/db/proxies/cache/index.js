"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cachedDbFactory = void 0;
const create_collection_1 = require("./create-collection");
/*
  Things to know about this cache!

  It is slower to drop or populate a db using this cache

  It will however speed up repeated accesses to the same objects

  It is not safe for multi-client use!
*/
const cachedDbFactory = (createDb) => {
    const createCachedDb = async (name, keys, options) => {
        const db = await createDb('cached-' + name, keys, options);
        const { collections, close } = db;
        const cachedCollections = await createCachedCollections(collections);
        const drop = async () => {
            await db.drop();
            const collections = Object.values(cacheDb.collections);
            for (let i = 0; i < collections.length; i++) {
                await collections[i].flushCache();
            }
        };
        const cacheDb = {
            collections: cachedCollections,
            close, drop
        };
        return cacheDb;
    };
    return createCachedDb;
};
exports.cachedDbFactory = cachedDbFactory;
const createCachedCollections = async (collections) => {
    const keys = Object.keys(collections);
    const cachedCollections = {};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        cachedCollections[key] = await create_collection_1.createCacheCollection(collections[key]);
    }
    return cachedCollections;
};
//# sourceMappingURL=index.js.map