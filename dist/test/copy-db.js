"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const copy_db_1 = require("../db/copy-db");
const db_memory_1 = require("../db/db-memory");
const copy_db_2 = require("./fixtures/copy-db");
const memory_db_1 = require("./fixtures/memory-db");
describe('copy db', () => {
    it('it copies an existing db', async () => {
        const sourceDb = await copy_db_2.createSourceDb();
        const destDb = await db_memory_1.createMemoryDb('', copy_db_2.copyEntityKeys, db_memory_1.createDefaultDbItem);
        await copy_db_1.copyDb(sourceDb, destDb);
        for (const userData of memory_db_1.multipleUsers) {
            const { name, group: groupName } = userData;
            const dbUser = await destDb.collections.user.findOne({ name });
            assert(dbUser !== undefined);
            const dbGroup = await destDb.collections.group.findOne({ name: groupName });
            assert(dbGroup !== undefined);
            assert.strictEqual(dbUser.group._id, dbGroup._id);
            const userRef = dbGroup.users.find(r => r._id === dbUser._id);
            assert(userRef !== undefined);
        }
    });
});
//# sourceMappingURL=copy-db.js.map