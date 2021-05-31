"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectFilter = exports.objectExcept = exports.emptyObject = void 0;
const emptyObject = obj => {
    Object.keys(obj).forEach(key => {
        delete obj[key];
    });
};
exports.emptyObject = emptyObject;
const objectExcept = (obj, ...keys) => {
    const result = {};
    Object.keys(obj).forEach(key => {
        if (keys.includes(key))
            return;
        result[key] = obj[key];
    });
    return result;
};
exports.objectExcept = objectExcept;
const objectFilter = (obj, predicate) => {
    const result = {};
    Object.keys(obj).forEach(key => {
        if (!predicate(key, obj[key]))
            return;
        result[key] = obj[key];
    });
    return result;
};
exports.objectFilter = objectFilter;
//# sourceMappingURL=object.js.map