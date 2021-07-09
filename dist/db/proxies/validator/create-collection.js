"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidatedCollection = void 0;
const util_1 = require("@mojule/util");
const db_item_to_entity_1 = require("../../db-item-to-entity");
const default_load_paged_1 = require("../../default-load-paged");
const save_partial_1 = require("../../save-partial");
const createValidatedCollection = (collection, key, validator, { onCreate, onLoad, onSave }) => {
    const { ids, remove, removeMany } = collection;
    let { create, createMany, load, loadMany, save, saveMany, find, findOne } = collection;
    const validate = async (entity) => {
        const err = await validator(key, entity);
        if (err)
            throw err;
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
            const entity = db_item_to_entity_1.dbItemToEntity(dbEntity);
            await validate(entity);
            return dbEntity;
        };
        loadMany = async (ids) => {
            const dbEntities = await collection.loadMany(ids);
            const entities = dbEntities.map(db_item_to_entity_1.dbItemToEntity);
            await util_1.eachAsync(entities, validate);
            return dbEntities;
        };
        find = async (criteria) => {
            const dbEntities = await collection.find(criteria);
            const entities = dbEntities.map(db_item_to_entity_1.dbItemToEntity);
            await util_1.eachAsync(entities, validate);
            return dbEntities;
        };
        findOne = async (criteria) => {
            const dbEntity = await collection.findOne(criteria);
            if (dbEntity === undefined)
                return dbEntity;
            await validate(dbEntity);
            return dbEntity;
        };
    }
    if (onSave) {
        save = async (document) => {
            const entity = await applyPartial(document);
            await validate(db_item_to_entity_1.dbItemToEntity(entity));
            return collection.save(document);
        };
        saveMany = async (documents) => {
            for (const doc of documents) {
                const entity = await applyPartial(doc);
                await validate(db_item_to_entity_1.dbItemToEntity(entity));
            }
            return collection.saveMany(documents);
        };
    }
    const loadPaged = default_load_paged_1.defaultLoadPaged(ids, loadMany);
    const validatedCollection = {
        ids, create, createMany, load, loadMany, save, saveMany, remove,
        removeMany, find, findOne, loadPaged
    };
    const applyPartial = save_partial_1.createApplyPartial(validatedCollection);
    return validatedCollection;
};
exports.createValidatedCollection = createValidatedCollection;
//# sourceMappingURL=create-collection.js.map