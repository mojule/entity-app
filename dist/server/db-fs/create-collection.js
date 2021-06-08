"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCollection = void 0;
const fs_1 = require("fs");
const util_1 = require("@mojule/util");
const default_many_1 = require("../../db/default-many");
const default_query_1 = require("../../db/default-query");
const default_load_paged_1 = require("../../db/default-load-paged");
const { readFile, writeFile, readdir, unlink, stat } = fs_1.promises;
const createCollection = (path) => {
    const filePath = (id) => `${path}/${id}.json`;
    const ids = async () => {
        const fileIds = (await readdir(path))
            .filter(s => s.endsWith('.json'))
            .map(s => s.replace(/\.json$/, ''));
        return fileIds;
    };
    const create = async (entity) => {
        const _id = util_1.randId();
        const dbEntity = Object.assign({ _id }, entity);
        const json = JSON.stringify(dbEntity);
        await writeFile(filePath(_id), json, 'utf8');
        return _id;
    };
    const createMany = default_many_1.defaultCreateMany(create);
    const load = async (id) => {
        const json = await readFile(filePath(id), 'utf8');
        const dbEntity = JSON.parse(json);
        return dbEntity;
    };
    const loadMany = default_many_1.defaultLoadMany(load);
    const save = async (document) => {
        const { _id } = document;
        if (typeof _id !== 'string')
            throw Error('Expected document to have _id:string');
        // must exist
        await stat(filePath(_id));
        const json = JSON.stringify(document);
        await writeFile(filePath(_id), json, 'utf8');
    };
    const saveMany = default_many_1.defaultSaveMany(save);
    const remove = async (id) => {
        await unlink(filePath(id));
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