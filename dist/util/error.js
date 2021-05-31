"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objToError = exports.errorToObj = void 0;
const errorToObj = (err, includeStack = false) => {
    const { name = 'Error', message = 'An unknown error occurred', stack = '' } = err;
    if (includeStack)
        return { name, message, stack };
    return { name, message };
};
exports.errorToObj = errorToObj;
const objToError = (obj) => {
    const { name = 'Error', message = 'An unknown error occurred', stack = '' } = obj;
    const err = Error(message);
    err.name = name;
    err.stack = stack;
    return err;
};
exports.objToError = objToError;
//# sourceMappingURL=error.js.map