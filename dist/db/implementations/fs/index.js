"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFsDb = void 0;
const create_collection_1 = require("./create-collection");
const fs_1 = require("fs");
const lodash_1 = require("../../../util/lodash");
const default_drop_1 = require("../../default-drop");
const path_1 = require("path");
const each_entity_key_1 = require("../../../entity/each-entity-key");
const { mkdir } = fs_1.promises;
const mkdirSafe = async (path, options) => {
    try {
        await mkdir(path, options);
    }
    catch (err) {
        if (err.code !== 'EEXIST')
            throw err;
    }
};
const initCollections = async (path, keys) => {
    const collections = {};
    await each_entity_key_1.eachEntityKey(keys, async (key) => {
        const collectionPath = path_1.posix.join(path, key);
        await mkdirSafe(collectionPath);
        collections[key] = create_collection_1.createCollection(collectionPath);
    });
    return collections;
};
const createFsDb = async (name, keys, { dataPath } = { dataPath: './data/fs' }) => {
    name = lodash_1.kebabCase(name);
    const path = path_1.posix.join(dataPath, name);
    await mkdirSafe(path);
    const drop = async () => default_drop_1.defaultDrop(db)();
    const close = async () => { };
    const collections = await initCollections(path, keys);
    const db = { drop, close, collections };
    return db;
};
exports.createFsDb = createFsDb;
//# sourceMappingURL=index.js.map