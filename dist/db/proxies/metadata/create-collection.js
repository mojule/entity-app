"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultExtendSave = exports.defaultExtendCreate = exports.createMetadataCollection = void 0;
const util_1 = require("@mojule/util");
const createMetadataCollection = async (collection, _key, extendCreate = exports.defaultExtendCreate, extendSave = exports.defaultExtendSave) => {
    const { create: originalCreate, createMany: originalCreateMany, save: originalSave, saveMany: originalSaveMany } = collection;
    const create = async (entity) => originalCreate(extendCreate(entity));
    const createMany = async (entities) => {
        const now = new Date().toJSON();
        entities = entities.map(entity => extendCreate(entity, now));
        return originalCreateMany(entities);
    };
    const save = async (document) => originalSave(extendSave(document));
    const saveMany = async (documents) => {
        const now = new Date().toJSON();
        documents = documents.map(document => extendSave(document, now));
        return originalSaveMany(documents);
    };
    const metadataCollection = Object.assign({}, collection, { create, createMany, save, saveMany });
    return metadataCollection;
};
exports.createMetadataCollection = createMetadataCollection;
const defaultExtendCreate = (entity, now = new Date().toJSON()) => {
    entity = util_1.clone(entity);
    entity['_v'] = 0;
    entity['_created'] = now;
    entity['_updated'] = now;
    return entity;
};
exports.defaultExtendCreate = defaultExtendCreate;
const defaultExtendSave = (entity, now = new Date().toJSON()) => {
    entity = util_1.clone(entity);
    if (typeof entity['_v'] === 'number') {
        entity['_v']++;
    }
    else {
        entity['_v'] = 0;
    }
    entity['_updated'] = now;
    return entity;
};
exports.defaultExtendSave = defaultExtendSave;
//# sourceMappingURL=create-collection.js.map