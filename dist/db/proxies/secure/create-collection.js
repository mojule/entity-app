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
    const getUser = () => db.collections.user.load(user._id);
    const collection = db.collections[key];
    // we can bang assert because they are created in init
    const collectionData = (await db.collections.collectionData.findOne({ name: key }));
    const collectionAccessOptions = async () => util_1.createAccessOptions(db, await getUser(), collectionData, true);
    const canReadCollection = async () => {
        const canRead = mode_1.canAccess(mode_1.r, await collectionAccessOptions());
        return canRead;
    };
    const canWriteCollection = async () => {
        const canWrite = mode_1.canAccess(mode_1.w, await collectionAccessOptions());
        return canWrite;
    };
    const userRef = {
        _id: user._id, _collection: 'user'
    };
    const getGroupRef = async () => ({
        _id: (await getUser())._group._id, _collection: 'group'
    });
    const assertReadEntity = async (entity, operation) => {
        const accessOptions = await util_1.createAccessOptions(db, await getUser(), entity, false);
        if (!(await canReadCollection()) || !mode_1.canAccess(mode_1.r, accessOptions))
            throw errors_1.createEperm(operation);
    };
    const assertWriteEntity = async (document, operation) => {
        const entity = await collection.load(document._id);
        const accessOptions = await util_1.createAccessOptions(db, await getUser(), entity, false);
        if (!(await canWriteCollection()) || !mode_1.canAccess(mode_1.w, accessOptions))
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
    const decorateItem = async (entity) => {
        entity['_owner'] = userRef;
        entity['_group'] = await getGroupRef();
    };
    const ids = async () => {
        if (!(await canReadCollection()))
            throw errors_1.createEperm('ids');
        const ids = await collection.ids();
        const filteredIds = [];
        for (const id of ids) {
            const entity = await collection.load(id);
            const accessOptions = await util_1.createAccessOptions(db, await getUser(), entity, false);
            if (mode_1.canAccess(mode_1.r, accessOptions))
                filteredIds.push(id);
        }
        return filteredIds;
    };
    const decorateUser = async (user) => {
        user = await user_1.hashPassword(user);
        const userEntity = user;
        if (!userEntity.isRoot) {
            const group = await db.collections.group.findOne({ name: 'users' });
            // hasn't been created yet
            if (group === undefined)
                throw Error('Expected users group');
            user['_group']['_id'] = group._id;
        }
        return user;
    };
    const create = async (entity) => {
        if (!(await canWriteCollection()))
            throw errors_1.createEperm('create');
        await decorateItem(entity);
        if (key === 'user') {
            entity = await decorateUser(entity);
        }
        return collection.create(entity);
    };
    const createMany = async (entities) => {
        if (!(await canWriteCollection()))
            throw errors_1.createEperm('createMany');
        for (const entity of entities) {
            await decorateItem(entity);
        }
        if (key === 'user') {
            entities = await Promise.all(entities.map(decorateUser));
        }
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
    const filterDocument = async (document) => {
        if (!(await getUser()).isRoot) {
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
        return collection.save(await filterDocument(document));
    };
    const saveMany = async (documents) => {
        await Promise.all(documents.map(assertSave));
        documents = await Promise.all(documents.map(filterDocument));
        if (key === 'user') {
            documents = await Promise.all(documents.map(user_1.hashPassword));
        }
        return collection.saveMany(documents);
    };
    const find = async (query) => {
        if (!(await canReadCollection()))
            throw errors_1.createEperm('find');
        const result = await collection.find(query);
        const filteredResult = [];
        for (const entity of result) {
            const accessOptions = await util_1.createAccessOptions(db, await getUser(), entity, false);
            if (mode_1.canAccess(mode_1.r, accessOptions)) {
                filteredResult.push(cleanPassword(entity));
            }
        }
        return filteredResult;
    };
    const findOne = async (query) => {
        if (!(await canReadCollection()))
            throw errors_1.createEperm('find');
        const entity = await collection.findOne(query);
        if (entity === undefined)
            return;
        const accessOptions = await util_1.createAccessOptions(db, await getUser(), entity, false);
        if (!mode_1.canAccess(mode_1.r, accessOptions))
            return;
        return cleanPassword(entity);
    };
    const loadPaged = default_load_paged_1.defaultLoadPaged(ids, loadMany);
    const onRemoveUser = async (userId) => {
        const allGroups = await db.collections.group.find({});
        for (const group of allGroups) {
            const withoutUser = group.users.filter(r => r._id !== userId);
            if (withoutUser.length !== group.users.length) {
                group.users = withoutUser;
                await db.collections.group.save(group);
            }
        }
    };
    const remove = async (id) => {
        const entity = await collection.load(id);
        await assertWriteEntity(entity, 'remove');
        if (key === 'user') {
            await onRemoveUser(entity._id);
        }
        return collection.remove(id);
    };
    const removeMany = async (ids) => {
        const entities = await collection.loadMany(ids);
        const mapper = (entity) => async () => {
            await assertWriteEntity(entity, 'removeMany');
            if (key === 'user') {
                await onRemoveUser(entity._id);
            }
        };
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