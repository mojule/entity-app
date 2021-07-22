"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultExtendAccessMany = exports.defaultExtendAccess = exports.createMetadataCollection = void 0;
const createMetadataCollection = (collection, _key, extendAccess = exports.defaultExtendAccess, extendAccessMany = exports.defaultExtendAccessMany) => {
    const { load: originalLoad, loadMany: originalLoadMany, find: originalFind, findOne: originalFindOne, loadPaged: originalLoadPaged, save: originalSave, saveMany: originalSaveMany } = collection;
    const load = async (id) => extendAccess(originalSave, await originalLoad(id));
    const loadMany = async (ids) => {
        const entities = await originalLoadMany(ids);
        return extendAccessMany(originalSaveMany, entities);
    };
    const find = async (critera) => {
        const entities = await originalFind(critera);
        return extendAccessMany(originalSaveMany, entities);
    };
    const findOne = async (criteria) => {
        const entity = await originalFindOne(criteria);
        if (entity === undefined)
            return;
        return extendAccess(originalSave, entity);
    };
    const loadPaged = async (pageSize, pageIndex) => {
        const entities = await originalLoadPaged(pageSize, pageIndex);
        return extendAccessMany(originalSaveMany, entities);
    };
    const save = async (document) => {
        const original = await originalLoad(document._id);
        const { _ver } = original;
        document['_ver'] = _ver + 1;
        document['_mtime'] = Date.now();
        return originalSave(document);
    };
    const saveMany = async (documents) => {
        const now = Date.now();
        const ids = documents.map(d => d._id);
        const existing = await originalLoadMany(ids);
        for (let i = 0; i < documents.length; i++) {
            const entity = existing[i];
            const document = documents[i];
            if (entity._id !== document._id)
                throw Error('Expected entity._id to be the same as document._id, ' +
                    'check underlying db is returning items in correct order');
            const { _ver } = entity;
            document['_ver'] = _ver + 1;
            document['_mtime'] = now;
        }
        return originalSaveMany(documents);
    };
    const metadataCollection = Object.assign({}, collection, {
        load, loadMany, find, findOne, loadPaged, save, saveMany
    });
    return metadataCollection;
};
exports.createMetadataCollection = createMetadataCollection;
const defaultExtendAccess = async (save, entity, now = Date.now()) => {
    const { _id } = entity;
    const _atime = now;
    const saveEntity = { _id, _atime };
    await save(saveEntity);
    entity['_atime'] = now;
    return entity;
};
exports.defaultExtendAccess = defaultExtendAccess;
const defaultExtendAccessMany = async (saveMany, entities, now = Date.now()) => {
    const _atime = now;
    const saveEntities = [];
    for (const entity of entities) {
        saveEntities.push({ _id: entity._id, _atime });
        entity._atime = _atime;
    }
    await saveMany(saveEntities);
    return entities;
};
exports.defaultExtendAccessMany = defaultExtendAccessMany;
//# sourceMappingURL=create-collection.js.map