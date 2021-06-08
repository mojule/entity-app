"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCollection = void 0;
const util_1 = require("@mojule/util");
const default_many_1 = require("../default-many");
const default_query_1 = require("../default-query");
const default_load_paged_1 = require("../default-load-paged");
const createCollection = (collection) => {
    const ids = async () => Object.keys(collection);
    const create = async (entity) => {
        const _id = util_1.randId();
        const dbEntity = Object.assign({}, entity, { _id });
        collection[_id] = dbEntity;
        return _id;
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
        if (!(_id in collection))
            throw Error(`Expected entity for ${_id}`);
        collection[_id] = document;
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
    return entityCollection;
};
exports.createCollection = createCollection;
//# sourceMappingURL=create-collection.js.map