"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidatedCollection = void 0;
const util_1 = require("@mojule/util");
const __1 = require("../..");
const default_load_paged_1 = require("../../default-load-paged");
const log_iisnode_1 = require("@mojule/log-iisnode");
const createValidatedCollection = async (collection, key, validator, { onCreate, onLoad, onSave }) => {
    const { ids, remove, removeMany } = collection;
    let { create, createMany, load, loadMany, save, saveMany, find, findOne } = collection;
    const validate = async (entity) => {
        const err = await validator(key, entity);
        if (err) {
            log_iisnode_1.log.error(`Store validation failed for ${key}`, err);
            throw err;
        }
    };
    if (onCreate) {
        create = async (entity) => {
            await validate(entity);
            return await collection.create(entity);
        };
        createMany = async (entities) => {
            await util_1.eachAsync(entities, validate);
            return await collection.createMany(entities);
        };
    }
    if (onLoad) {
        load = async (id) => {
            const dbEntity = await collection.load(id);
            const entity = __1.dbItemToEntity(dbEntity);
            await validate(entity);
            return dbEntity;
        };
        loadMany = async (ids) => {
            const dbEntities = await collection.loadMany(ids);
            const entities = dbEntities.map(__1.dbItemToEntity);
            await util_1.eachAsync(entities, validate);
            return dbEntities;
        };
        find = async (criteria) => {
            const dbEntities = await collection.find(criteria);
            const entities = dbEntities.map(__1.dbItemToEntity);
            await util_1.eachAsync(entities, validate);
            return dbEntities;
        };
        findOne = async (criteria) => {
            const dbEntity = await collection.findOne(criteria);
            if (dbEntity === undefined)
                return dbEntity;
            const entity = __1.dbItemToEntity(dbEntity);
            await validate(entity);
            return dbEntity;
        };
    }
    if (onSave) {
        save = async (document) => {
            const entity = __1.dbItemToEntity(document);
            await validate(entity);
            return collection.save(document);
        };
        saveMany = async (documents) => {
            const entities = documents.map(__1.dbItemToEntity);
            await util_1.eachAsync(entities, validate);
            return collection.saveMany(documents);
        };
    }
    const loadPaged = default_load_paged_1.defaultLoadPaged(ids, loadMany);
    const validatedCollection = {
        ids, create, createMany, load, loadMany, save, saveMany, remove,
        removeMany, find, findOne, loadPaged
    };
    return validatedCollection;
};
exports.createValidatedCollection = createValidatedCollection;
//# sourceMappingURL=create-collection.js.map