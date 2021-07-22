"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSourceDb = exports.copyEntityKeys = void 0;
const __1 = require("../..");
const memory_db_1 = require("./memory-db");
exports.copyEntityKeys = {
    user: 'user',
    group: 'group'
};
const createSourceDb = async () => {
    const db = await __1.createMemoryDb('', exports.copyEntityKeys, __1.createDefaultDbItem);
    const groupNames = new Set();
    memory_db_1.multipleUsers.forEach(user => {
        groupNames.add(user.group);
    });
    const uniqueGroups = [...groupNames];
    const groups = uniqueGroups.map(name => ({
        name, users: []
    }));
    await db.collections.group.createMany(groups);
    for (const user of memory_db_1.multipleUsers) {
        const { group: groupName } = user;
        const dbGroup = await db.collections.group.findOne({ name: groupName });
        if (dbGroup === undefined)
            throw Error(`Expected group ${groupName}`);
        const groupRef = {
            _id: dbGroup._id,
            _collection: 'group'
        };
        const userId = await db.collections.user.create({ name: user.name, group: groupRef });
        const userRef = {
            _id: userId,
            _collection: 'user'
        };
        dbGroup.users.push(userRef);
        await db.collections.group.save(dbGroup);
    }
    return db;
};
exports.createSourceDb = createSourceDb;
//# sourceMappingURL=copy-db.js.map