"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCacheCollection = void 0;
const default_many_1 = require("../../default-many");
const default_query_1 = require("../../default-query");
const default_load_paged_1 = require("../../default-load-paged");
const createCacheCollection = async (collection) => {
    let idSet;
    let entityMap;
    const ids = async () => [...idSet];
    const create = async (entity) => {
        const _id = await collection.create(entity);
        idSet.add(_id);
        entityMap.set(_id, Object.assign({}, entity, { _id }));
        return _id;
    };
    // not safe to cache, order may change
    const createMany = default_many_1.defaultCreateMany(create);
    const load = async (id) => {
        if (entityMap.has(id))
            return entityMap.get(id);
        const dbEntity = await collection.load(id);
        entityMap.set(id, dbEntity);
        return dbEntity;
    };
    // not safe to cache, order may change
    const loadMany = default_many_1.defaultLoadMany(load);
    const save = async (document) => {
        const { _id } = document;
        idSet.add(_id);
        entityMap.set(_id, document);
        await collection.save(document);
    };
    const saveMany = async (documents) => {
        documents.forEach(d => {
            idSet.add(d._id);
            entityMap.set(d._id, d);
        });
        await collection.saveMany(documents);
    };
    const remove = async (id) => {
        idSet.delete(id);
        if (entityMap.has(id))
            entityMap.delete(id);
        await collection.remove(id);
    };
    const removeMany = async (ids) => {
        ids.forEach(id => {
            idSet.delete(id);
            if (entityMap.has(id))
                entityMap.delete(id);
        });
        await collection.removeMany(ids);
    };
    const flushCache = async () => {
        idSet = new Set(await collection.ids());
        entityMap = new Map();
    };
    const find = default_query_1.defaultFind(ids, loadMany);
    const findOne = default_query_1.defaultFindOne(ids, loadMany);
    const loadPaged = default_load_paged_1.defaultLoadPaged(ids, loadMany);
    const cachedCollection = {
        ids, create, createMany, load, loadMany, save, saveMany, remove, removeMany,
        flushCache, find, findOne, loadPaged
    };
    await flushCache();
    return cachedCollection;
};
exports.createCacheCollection = createCacheCollection;
//# sourceMappingURL=create-collection.js.map