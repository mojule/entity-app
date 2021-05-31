"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eachEntityKeySync = exports.eachEntityKey = void 0;
const eachEntityKey = async (keys, cb) => {
    const entityKeys = Object.keys(keys);
    await Promise.all(entityKeys.map(cb));
};
exports.eachEntityKey = eachEntityKey;
const eachEntityKeySync = (keys, cb) => {
    const entityKeys = Object.keys(keys);
    entityKeys.forEach(key => cb(key));
};
exports.eachEntityKeySync = eachEntityKeySync;
//# sourceMappingURL=each-entity-key.js.map