"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCollection = void 0;
const default_many_1 = require("../default-many");
const default_query_1 = require("../default-query");
const default_load_paged_1 = require("../default-load-paged");
const save_partial_1 = require("../save-partial");
const createCollection = (collection, createDbItem) => {
    const ids = async () => Object.keys(collection);
    const create = async (entity) => {
        const dbEntity = Object.assign(createDbItem(), entity);
        collection[dbEntity._id] = dbEntity;
        return dbEntity._id;
    };
    const createMany = default_many_1.defaultCreateMany(create);
    const load = async (id) => {
        const dbEntity = collection[id];
        if (dbEntity === undefined)
            throw Error(`Expected entity for ${id}`);
        return dbEntity;
    };
    const loadMany = default_many_1.defaultLoadMany(load);
    const save = async (document) => {
        const { _id } = document;
        if (typeof _id !== 'string')
            throw Error('Expected document to have _id:string');
        collection[_id] = await applyPartial(document);
    };
    const saveMany = default_many_1.defaultSaveMany(save);
    const remove = async (id) => {
        if (!(id in collection))
            throw Error(`Expected entity for ${id}`);
        delete collection[id];
    };
    const removeMany = default_many_1.defaultRemoveMany(remove);
    const find = default_query_1.defaultFind(ids, loadMany);
    const findOne = default_query_1.defaultFindOne(ids, loadMany);
    const loadPaged = default_load_paged_1.defaultLoadPaged(ids, loadMany);
    const entityCollection = {
        ids, create, createMany, load, loadMany, save, saveMany, remove, removeMany,
        find, findOne, loadPaged
    };
    const applyPartial = save_partial_1.createApplyPartial(entityCollection);
    return entityCollection;
};
exports.createCollection = createCollection;
//# sourceMappingURL=create-collection.js.map