"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multipleUsers = exports.createMemDbWithUser = exports.createMemDb = exports.testMemUser = exports.memEntityKeys = void 0;
const util_1 = require("@mojule/util");
const __1 = require("../..");
exports.memEntityKeys = {
    user: 'user',
    group: 'group'
};
exports.testMemUser = { name: 'Nik', group: 'Goobers' };
const createMemDb = async () => __1.createMemoryDb('', exports.memEntityKeys, __1.createDefaultDbItem);
exports.createMemDb = createMemDb;
const createMemDbWithUser = async () => {
    const db = await exports.createMemDb();
    const _id = await db.collections.user.create(exports.testMemUser);
    return { db, _id };
};
exports.createMemDbWithUser = createMemDbWithUser;
exports.multipleUsers = util_1.createSequence(10, i => ({
    name: `User ${i}`,
    group: i < 3 ? 'Goobers' : i === 3 ? 'Bobs' : 'Boogers'
}));
//# sourceMappingURL=memory-db.js.map