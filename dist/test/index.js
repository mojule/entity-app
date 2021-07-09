"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const __1 = require("..");
const testEntityKeys = {
    user: 'user',
    group: 'group'
};
const testUser = { name: 'Nik', group: 'Goobers' };
describe('memoryDb', () => {
    const createDb = async () => __1.createMemoryDb('', testEntityKeys, __1.createDefaultDbItem);
    const createDbWithUser = async () => {
        const db = await createDb();
        const _id = await db.collections.user.create(testUser);
        return { db, _id };
    };
    it('creates a db', async () => {
        const db = await createDb();
        assert(db);
        assert(db.collections);
        assert(db.collections.user);
        assert(db.collections.group);
    });
    it('creates an entity', async () => {
        const { _id } = await createDbWithUser();
        assert(typeof _id === 'string' && _id.length);
    });
    it('loads an entity', async () => {
        const { db, _id } = await createDbWithUser();
        const user = await db.collections.user.load(_id);
        const expect = Object.assign({}, testUser, { _id });
        assert.deepStrictEqual(user, expect);
    });
    it('saves an entity', async () => {
        const { db, _id } = await createDbWithUser();
        const patchUser = { _id, group: 'Bloopers' };
        await db.collections.user.save(patchUser);
        const user = await db.collections.user.load(_id);
        const expect = Object.assign({}, testUser, patchUser);
        assert.deepStrictEqual(user, expect);
    });
});
//# sourceMappingURL=index.js.map