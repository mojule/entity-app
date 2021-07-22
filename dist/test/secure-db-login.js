"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const __1 = require("..");
const secure_1 = require("../db/proxies/secure");
const secure_db_item_1 = require("../db/proxies/secure/secure-db-item");
const secure_db_1 = require("./fixtures/secure-db");
describe('secure db', () => {
    describe('login', () => {
        it('logs in', async () => {
            const memDb = await __1.createMemoryDb('', secure_db_1.entityKeys, secure_db_item_1.createSecureDbItem);
            const root = secure_db_1.getRootUser();
            const login = await secure_1.secureDbFactory(memDb, root);
            await assert.doesNotReject(async () => await login(root));
        });
        it('logs in to initialized db', async () => {
            const memDb = await __1.createMemoryDb('', secure_db_1.entityKeys, secure_db_item_1.createSecureDbItem);
            const root = secure_db_1.getRootUser();
            // this call will init rootUser
            await secure_1.secureDbFactory(memDb, root);
            // this instance of db already contains rootUser
            const login1 = await secure_1.secureDbFactory(memDb, secure_db_1.getRootUser());
            const bobDb = await login1(root);
            assert(bobDb);
            assert(bobDb.collections);
        });
        it('rejects unknown user', async () => {
            const { login } = await secure_db_1.createSecureMemDbLogin();
            await assert.rejects(async () => {
                await login({ name: '', password: '' });
            });
        });
        it('rejects bad user', async () => {
            const { login } = await secure_db_1.createSecureMemDbLogin();
            const { name } = secure_db_1.getRootUser();
            await assert.rejects(async () => await login({ name, password: '' }));
        });
        it('drops and closes when root', async () => {
            const memDb = await __1.createMemoryDb('', secure_db_1.entityKeys, secure_db_item_1.createSecureDbItem);
            const root = secure_db_1.getRootUser();
            const login = await secure_1.secureDbFactory(memDb, root);
            const db = await login(root);
            await assert.doesNotReject(async () => db.drop());
            await assert.doesNotReject(async () => db.close());
        });
        it('fails drop or close when not root', async () => {
            const memDb = await __1.createMemoryDb('', secure_db_1.entityKeys, secure_db_item_1.createSecureDbItem);
            const root = secure_db_1.getRootUser();
            const login = await secure_1.secureDbFactory(memDb, root);
            const rootDb = await login(root);
            await rootDb.createUser({ name: 'Bob', password: 'Boogers' });
            const bobDb = await login({ name: 'Bob', password: 'Boogers' });
            await assert.rejects(async () => bobDb.drop());
            await assert.rejects(async () => bobDb.close());
        });
    });
});
//# sourceMappingURL=secure-db-login.js.map