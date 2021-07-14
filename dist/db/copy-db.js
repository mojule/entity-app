"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyDb = void 0;
const get_db_edges_1 = require("./get-db-edges");
const json_pointer_1 = require("@mojule/json-pointer");
const __1 = require("..");
const util_1 = require("@mojule/util");
const copyDb = async (source, dest, log = () => { }) => {
    const edges = await get_db_edges_1.getDbEdges(source);
    const collectionNames = Object.keys(source.collections);
    const oldToNewIdMap = new Map();
    await dest.drop();
    for (const name of collectionNames) {
        log('Copying collection', name);
        const sourceCollection = source.collections[name];
        const destCollection = dest.collections[name];
        const ids = await sourceCollection.ids();
        const entities = await sourceCollection.loadMany(ids);
        for (const entity of entities) {
            const destEntity = __1.dbItemToEntity(entity);
            const oldId = entity._id;
            const newId = await destCollection.create(destEntity);
            oldToNewIdMap.set(oldId, newId);
        }
        log(`Copied ${entities.length} item(s)`);
    }
    log(`Updating ${edges.length} db ref edges`);
    const cache = {};
    const loadEntity = async (collection, id) => {
        const key = `${collection}_${id}`;
        if (key in cache) {
            return cache[key];
        }
        const destCollection = dest.collections[collection];
        const entity = await destCollection.load(id);
        cache[key] = entity;
        return entity;
    };
    const saveSet = new Set();
    const saveActions = [];
    for (const { from, to, pointer } of edges) {
        const destCollection = dest.collections[from._collection];
        const destId = util_1.strictMapGet(oldToNewIdMap, from._id);
        const destEntity = await loadEntity(from._collection, destId);
        const key = `${from._collection}_${destId}`;
        if (!saveSet.has(key)) {
            saveSet.add(key);
            const action = () => destCollection.save(destEntity);
            saveActions.push(action);
        }
        const _id = util_1.strictMapGet(oldToNewIdMap, to._id);
        const { _collection } = to;
        json_pointer_1.set(destEntity, pointer, { _id, _collection });
    }
    log(`Saving ${saveActions.length} updated entities`);
    for (const action of saveActions) {
        await action();
    }
    log('Done');
};
exports.copyDb = copyDb;
//# sourceMappingURL=copy-db.js.map