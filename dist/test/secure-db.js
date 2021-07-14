"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mode_1 = require("@mojule/mode");
const assert = require("assert");
const secure_db_1 = require("./fixtures/secure-db");
describe('secure db', () => {
    it('creates a secure db login', async () => {
        const { login } = await secure_db_1.createSecureMemDbLogin();
        assert.strictEqual(typeof login, 'function');
    });
    it('logs in to secure db', async () => {
        const { login } = await secure_db_1.createSecureMemDbLogin();
        const db = await login(secure_db_1.getRootUser());
        assert(db);
        assert(db.collections);
    });
    it('chmod entity', async () => {
        const { login, memDb } = await secure_db_1.createSecureMemDbLogin();
        const db = await login(secure_db_1.getRootUser());
        const thingId = await db.collections.publicThing.create({ name: 'foo', value: 42 });
        const newMode = mode_1.parseSymbolicNotation('rwxrwxrwx');
        await db.chmod(newMode, 'publicThing', thingId);
        const thing = await db.collections.publicThing.load(thingId);
        assert.strictEqual(thing._mode, newMode);
    });
    it('chmod collection', async () => {
        const { login, memDb } = await secure_db_1.createSecureMemDbLogin();
        const db = await login(secure_db_1.getRootUser());
        const newMode = mode_1.parseSymbolicNotation('rwxrwxrwx');
        await db.chmod(newMode, 'publicThing');
        const thingData = await memDb.collections.collectionData.findOne({ name: 'publicThing' });
        assert(thingData);
        assert.strictEqual(thingData._mode, newMode);
    });
    it('fails chmod on nonexistant collection', async () => {
        const { login } = await secure_db_1.createSecureMemDbLogin();
        const db = await login(secure_db_1.getRootUser());
        const newMode = mode_1.parseSymbolicNotation('rwxrwxrwx');
        assert.rejects(db.chmod(newMode, 'nothing'), {
            message: 'Expected collectionData for nothing'
        });
    });
});
//# sourceMappingURL=secure-db.js.map