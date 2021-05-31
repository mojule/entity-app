"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucket = void 0;
const getPredicateIds = (item, predicateMap) => {
    const ids = Object.keys(predicateMap);
    const matches = [];
    ids.forEach(id => {
        if (predicateMap[id](item))
            matches.push(id);
    });
    return matches;
};
const bucket = (items, predicateMap) => {
    const result = {};
    const ids = Object.keys(predicateMap);
    ids.forEach(id => result[id] = []);
    items.forEach(item => {
        const matches = getPredicateIds(item, predicateMap);
        matches.forEach(id => {
            result[id].push(item);
        });
    });
    return result;
};
exports.bucket = bucket;
//# sourceMappingURL=bucket.js.map