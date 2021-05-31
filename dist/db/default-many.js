"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRemoveMany = exports.defaultSaveMany = exports.defaultLoadMany = exports.defaultCreateMany = void 0;
const defaultCreateMany = (create) => {
    const createMany = async (entities) => Promise.all(entities.map(create));
    return createMany;
};
exports.defaultCreateMany = defaultCreateMany;
const defaultLoadMany = (load) => {
    const loadMany = async (ids) => Promise.all(ids.map(load));
    return loadMany;
};
exports.defaultLoadMany = defaultLoadMany;
const defaultSaveMany = (save) => {
    const saveMany = async (entities) => Promise.all(entities.map(save)).then(() => { });
    return saveMany;
};
exports.defaultSaveMany = defaultSaveMany;
const defaultRemoveMany = (remove) => {
    const removeMany = async (ids) => Promise.all(ids.map(remove)).then(() => { });
    return removeMany;
};
exports.defaultRemoveMany = defaultRemoveMany;
//# sourceMappingURL=default-many.js.map