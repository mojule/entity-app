"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSecureCollection = void 0;
const mode_1 = require("@mojule/mode");
const default_load_paged_1 = require("../../default-load-paged");
const types_1 = require("./types");
const errors_1 = require("./errors");
const util_1 = require("./util");
const user_1 = require("./user");
const createSecureCollection = async (db, key, user) => {
    const collection = db.collections[key];
    const collectionData = await db.collections.collectionData.findOne({ name: key });
    if (collectionData === undefined)
        throw Error(`Expected collectionData for ${key}`);
    const collectionAccessOptions = await util_1.createAccessOptions(db, user, collectionData, true);
    const canReadCollection = mode_1.canAccess(mode_1.r, collectionAccessOptions);
    const canWriteCollection = mode_1.canAccess(mode_1.w, collectionAccessOptions);
    const userRef = {
        _id: user._id, _collection: 'user'
    };
    const groupRef = {
        _id: user._group._id, _collection: 'group'
    };
    const assertReadEntity = async (entity, operation) => {
        const accessOptions = await util_1.createAccessOptions(db, user, entity, false);
        if (!canReadCollection || !mode_1.canAccess(mode_1.r, accessOptions))
            throw errors_1.createEperm(operation);
    };
    const assertWriteEntity = async (document, operation) => {
        const entity = await collection.load(document._id);
        const accessOptions = await util_1.createAccessOptions(db, user, entity, false);
        if (!canWriteCollection || !mode_1.canAccess(mode_1.w, accessOptions))
            throw errors_1.createEperm(operation);
    };
    const assertLoad = (entity) => assertReadEntity(entity, 'load');
    const assertSave = (document) => assertWriteEntity(document, 'save');
    const cleanPassword = (entity) => {
        if (key === 'user') {
            return Object.assign({}, entity, { password: '' });
        }
        return entity;
    };
    const decorateItem = (entity) => {
        entity['_user'] = userRef;
        entity['_group'] = groupRef;
    };
    const ids = async () => {
        if (!canReadCollection)
            throw errors_1.createEperm('ids');
        const ids = await collection.ids();
        const filteredIds = [];
        for (const id of ids) {
            const entity = await collection.load(id);
            const accessOptions = await util_1.createAccessOptions(db, user, entity, false);
            if (mode_1.canAccess(mode_1.r, accessOptions))
                filteredIds.push(id);
        }
        return filteredIds;
    };
    const create = async (entity) => {
        if (!canWriteCollection)
            throw errors_1.createEperm('create');
        if (key === 'user') {
            entity = await user_1.hashPassword(entity);
        }
        decorateItem(entity);
        return collection.create(entity);
    };
    const createMany = async (entities) => {
        if (!canWriteCollection)
            throw errors_1.createEperm('createMany');
        if (key === 'user') {
            entities = await Promise.all(entities.map(user_1.hashPassword));
        }
        entities.forEach(decorateItem);
        return collection.createMany(entities);
    };
    const load = async (id) => {
        const entity = await collection.load(id);
        await assertLoad(entity);
        return cleanPassword(entity);
    };
    const loadMany = async (ids) => {
        const entities = await collection.loadMany(ids);
        await Promise.all(entities.map(assertLoad));
        return entities.map(cleanPassword);
    };
    const filterDocument = (document) => {
        if (!user.isRoot) {
            const originalDocument = document;
            document = {};
            const keys = Object.keys(originalDocument);
            keys.forEach(key => {
                if (types_1.privilegedDbItemKeys.includes(key))
                    return;
                document[key] = originalDocument[key];
            });
        }
        return document;
    };
    const save = async (document) => {
        await assertSave(document);
        if (key === 'user') {
            document = await user_1.hashPassword(document);
        }
        return collection.save(filterDocument(document));
    };
    const saveMany = async (documents) => {
        await Promise.all(documents.map(assertSave));
        documents = documents.map(filterDocument);
        if (key === 'user') {
            documents = await Promise.all(documents.map(user_1.hashPassword));
        }
        return collection.saveMany(documents);
    };
    const find = async (query) => {
        if (!canReadCollection)
            throw errors_1.createEperm('find');
        const result = await collection.find(query);
        const filteredResult = [];
        for (const entity of result) {
            const accessOptions = await util_1.createAccessOptions(db, user, entity, false);
            if (mode_1.canAccess(mode_1.r, accessOptions)) {
                filteredResult.push(cleanPassword(entity));
            }
        }
        return filteredResult;
    };
    const findOne = async (query) => {
        if (!canReadCollection)
            throw errors_1.createEperm('find');
        const entity = await collection.findOne(query);
        if (entity === undefined)
            return;
        const accessOptions = await util_1.createAccessOptions(db, user, entity, false);
        if (!mode_1.canAccess(mode_1.r, accessOptions))
            return;
        return cleanPassword(entity);
    };
    const loadPaged = default_load_paged_1.defaultLoadPaged(ids, loadMany);
    const remove = async (id) => {
        const entity = await collection.load(id);
        await assertWriteEntity(entity, 'remove');
        return collection.remove(id);
    };
    const removeMany = async (ids) => {
        const entities = await collection.loadMany(ids);
        const mapper = (entity) => assertWriteEntity(entity, 'save');
        await Promise.all(entities.map(mapper));
        return collection.removeMany(ids);
    };
    const secureCollection = {
        ids, create, createMany, load, loadMany, save, saveMany, find, findOne,
        loadPaged, remove, removeMany
    };
    return secureCollection;
};
exports.createSecureCollection = createSecureCollection;
//# sourceMappingURL=create-collection.js.map