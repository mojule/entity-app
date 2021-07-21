"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUniqueFieldDb = exports.uniqueEntityKeys = void 0;
const __1 = require("../..");
exports.uniqueEntityKeys = {
    a: 'a', b: 'b'
};
const createUniqueFieldDb = async () => {
    const memDb = await __1.createMemoryDb('', exports.uniqueEntityKeys, __1.createDefaultDbItem);
    const db = __1.uniqueFieldDbFactory(memDb, key => {
        if (key === 'a')
            return ['name', 'abbrev'];
        if (key === 'b')
            return ['name'];
        return [];
    });
    return db;
};
exports.createUniqueFieldDb = createUniqueFieldDb;
//# sourceMappingURL=unique-field-db.js.map