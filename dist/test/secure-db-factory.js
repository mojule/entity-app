"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const __1 = require("..");
const secure_1 = require("../db/proxies/secure");
const secure_db_item_1 = require("../db/proxies/secure/secure-db-item");
const secure_db_1 = require("./fixtures/secure-db");
describe('secure db', () => {
    describe('secureDbFactory', () => {
        it('creates a secure db login', async () => {
            const { login } = await secure_db_1.createSecureMemDbLogin();
            assert.strictEqual(typeof login, 'function');
        });
        it('initializes new root user', async () => {
            const { login, memDb } = await secure_db_1.createSecureMemDbLogin();
            const root = secure_db_1.getRootUser();
            const db = await login(root);
            const { name } = root;
            const dbRootUser = await memDb.collections.user.findOne({ name });
            assert(db);
            assert(db.collections);
            assert(dbRootUser);
            const rootOwnerId = dbRootUser._owner._id;
            const rootGroupId = dbRootUser._group._id;
            assert.strictEqual(rootOwnerId, dbRootUser._id);
            assert.strictEqual(dbRootUser._mode, 0o0770);
            const rootGroup = await memDb.collections.group.load(rootGroupId);
            assert(rootGroup);
            assert.strictEqual(rootGroup.name, 'root');
            assert.strictEqual(rootGroup._owner._id, dbRootUser._id);
            assert.strictEqual(rootGroup._group._id, rootGroupId);
            assert.strictEqual(rootGroup._mode, 0o0770);
            assert.deepStrictEqual(rootGroup.users, [{ _id: dbRootUser._id, _collection: 'user' }]);
            const usersGroup = await memDb.collections.group.findOne({ name: 'users' });
            assert(usersGroup);
            const nobodyGroup = await memDb.collections.group.findOne({ name: 'nobody' });
            assert(nobodyGroup);
        });
        it('rejects non root user', async () => {
            const memDb = await __1.createMemoryDb('', secure_db_1.entityKeys, secure_db_item_1.createSecureDbItem);
            const login0 = await secure_1.secureDbFactory(memDb, secure_db_1.getRootUser());
            const db = await login0(secure_db_1.getRootUser());
            const bob = { name: 'Bob', password: 'Boogers' };
            await db.createUser(bob);
            await assert.rejects(async () => await secure_1.secureDbFactory(memDb, bob));
        });
        it('rejects bad root user', async () => {
            const memDb = await __1.createMemoryDb('', secure_db_1.entityKeys, secure_db_item_1.createSecureDbItem);
            const root = secure_db_1.getRootUser();
            const { name } = root;
            await secure_1.secureDbFactory(memDb, root);
            await assert.rejects(async () => await secure_1.secureDbFactory(memDb, { name, password: '' }));
        });
    });
});
//# sourceMappingURL=secure-db-factory.js.map