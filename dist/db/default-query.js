"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFindOne = exports.defaultFind = void 0;
const mingo_1 = require("mingo");
const defaultFind = (ids, loadMany) => {
    const find = async (criteria) => {
        const entityIds = await ids();
        const entities = await loadMany(entityIds);
        const query = new mingo_1.default.Query(criteria);
        // weird typing in latest mingo :/ 
        // wants query to be a `RawObject`, which is Record<string, unknown>
        // complains that TEntity & DbItem is not RawObject
        return entities.filter(e => query.test(e));
    };
    return find;
};
exports.defaultFind = defaultFind;
const defaultFindOne = (ids, loadMany) => {
    const findOne = async (criteria) => {
        const entityIds = await ids();
        const entities = await loadMany(entityIds);
        const query = new mingo_1.default.Query(criteria);
        return entities.find(e => query.test(e));
    };
    return findOne;
};
exports.defaultFindOne = defaultFindOne;
//# sourceMappingURL=default-query.js.map