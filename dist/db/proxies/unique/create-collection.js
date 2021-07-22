"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUniqueFieldsCollection = void 0;
const createUniqueFieldsCollection = (collection, key, uniqueNames) => {
    const { create: originalCreate, createMany: originalCreateMany, save: originalSave, saveMany: originalSaveMany, find } = collection;
    const create = async (entity) => {
        await assertUniqueForNames(uniqueNames, key, entity, find, []);
        return originalCreate(entity);
    };
    const createMany = async (entities) => {
        await Promise.all(entities.map(e => assertUniqueForNames(uniqueNames, key, e, find, entities.filter(e2 => e2 !== e))));
        return originalCreateMany(entities);
    };
    const save = async (document) => {
        await assertUniqueForNames(uniqueNames, key, document, find, [], document._id);
        return originalSave(document);
    };
    const saveMany = async (documents) => {
        await Promise.all(documents.map(e => assertUniqueForNames(uniqueNames, key, e, find, documents.filter(e2 => e2 !== e), e._id)));
        return originalSaveMany(documents);
    };
    const uniqueCollection = Object.assign({}, collection, { create, createMany, save, saveMany });
    return uniqueCollection;
};
exports.createUniqueFieldsCollection = createUniqueFieldsCollection;
const assertUniqueForNames = async (uniqueNames, entityKey, entity, find, additional, currentId = '') => {
    for (let i = 0; i < uniqueNames.length; i++) {
        const name = uniqueNames[i];
        const value = entity[name];
        if (value === undefined)
            continue;
        await assertUnique(entityKey, name, value, find, additional, currentId);
    }
};
const assertUnique = async (entityKey, propertyKey, value, find, additional, currentId) => {
    let duplicates = await find({ [propertyKey]: value });
    let siblings = additional.filter(d => d[propertyKey] === value);
    // remove siblings from duplicates?
    if (additional.length) {
        duplicates = duplicates.filter(d => !additional.some(s => '_id' in s && s._id === d._id));
    }
    if (currentId !== '') {
        duplicates = duplicates.filter(e => e._id !== currentId);
    }
    if (siblings.length > 0) {
        throw Error(`Expected "${entityKey}:${propertyKey}" to be unique, but another entity also has the value ${value}`);
    }
    if (duplicates.length === 0)
        return;
    throw Error(`Expected "${entityKey}:${propertyKey}" to be unique, but entity with id ${duplicates[0]._id} also has the value ${value}`);
};
//# sourceMappingURL=create-collection.js.map