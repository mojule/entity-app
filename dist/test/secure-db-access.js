"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mode_1 = require("@mojule/mode");
const assert = require("assert");
const secure_db_1 = require("./fixtures/secure-db");
describe('secure db', () => {
    describe('db', () => {
        describe('access', () => {
            describe('chmod', () => {
                it('succeeds entity', async () => {
                    const { login, memDb } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const thingId = await db.collections.publicThing.create({ name: 'foo', value: 42 });
                    const newMode = mode_1.parseSymbolicNotation('rwxrwxrwx');
                    await db.chmod(newMode, 'publicThing', thingId);
                    const thing = await db.collections.publicThing.load(thingId);
                    assert.strictEqual(thing._mode, newMode);
                });
                it('succeeds collection', async () => {
                    const { login, memDb } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const newMode = mode_1.parseSymbolicNotation('rwxrwxrwx');
                    await db.chmod(newMode, 'publicThing');
                    const thingData = await memDb.collections.collectionData.findOne({ name: 'publicThing' });
                    assert(thingData);
                    assert.strictEqual(thingData._mode, newMode);
                });
                it('succeeds owner', async () => {
                    const { login, memDb } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const newMode = mode_1.parseSymbolicNotation('rwxrwxrwx');
                    await db.chmod(newMode, 'publicThing');
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const bobDb = await login(loginBob);
                    const dbBob = await memDb.collections.user.findOne({ name: 'Bob' });
                    assert(dbBob);
                    const bobThingId = await bobDb.collections.publicThing.create({ name: 'Bob Thing', value: 69 });
                    let bobThing = await bobDb.collections.publicThing.load(bobThingId);
                    assert.strictEqual(bobThing._mode, 0o770);
                    await bobDb.chmod(newMode, 'publicThing', bobThingId);
                    bobThing = await bobDb.collections.publicThing.load(bobThingId);
                    assert.strictEqual(bobThing._mode, newMode);
                });
                it('fails', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const thingId = await db.collections.publicThing.create({ name: 'foo', value: 42 });
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.chmod(0o0666, 'publicThing');
                    });
                    await assert.rejects(async () => {
                        await bobDb.chmod(0o0666, 'publicThing', thingId);
                    });
                });
                it('fails on nonexistent collection', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const newMode = mode_1.parseSymbolicNotation('rwxrwxrwx');
                    await assert.rejects(db.chmod(newMode, 'nothing'), {
                        message: 'Expected collectionData for nothing'
                    });
                });
            });
            describe('chown', () => {
                it('succeeds entity', async () => {
                    const { login, memDb } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const thingId = await db.collections.publicThing.create({ name: 'foo', value: 42 });
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chown('Bob', 'publicThing', thingId);
                    const thing = await memDb.collections.publicThing.load(thingId);
                    const dbBob = await memDb.collections.user.findOne({ name: 'Bob' });
                    assert(dbBob);
                    assert.strictEqual(thing._owner._id, dbBob._id, 'bob owns thing');
                    const bobDb = await login(loginBob);
                    await bobDb.chmod(0o0777, 'publicThing', thingId);
                    assert.strictEqual(thing._mode, 0o0777, 'bob chmod thing');
                });
                it('succeeds collection', async () => {
                    const { login, memDb } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chown('Bob', 'publicThing');
                    const dbBob = await memDb.collections.user.findOne({ name: 'Bob' });
                    assert(dbBob);
                    const bobDb = await login(loginBob);
                    const thingId = await bobDb.collections.publicThing.create({ name: 'foo', value: 42 });
                    const thing = await bobDb.collections.publicThing.load(thingId);
                    assert.strictEqual(thing._owner._id, dbBob._id, 'bob owns thing');
                });
                it('succeeds collection, chown after user login', async () => {
                    const { login, memDb } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const dbBob = await memDb.collections.user.findOne({ name: 'Bob' });
                    assert(dbBob);
                    const bobDb = await login(loginBob);
                    await db.chown('Bob', 'publicThing');
                    const thingId = await bobDb.collections.publicThing.create({ name: 'foo', value: 42 });
                    const thing = await bobDb.collections.publicThing.load(thingId);
                    assert.strictEqual(thing._owner._id, dbBob._id, 'bob owns thing');
                });
                it('fails', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.chown('Bob', 'publicThing');
                    });
                });
                it('fails user', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    await assert.rejects(async () => {
                        await db.chown('Bob', 'publicThing');
                    });
                });
            });
            describe('chgrp', () => {
                it('succeeds collection', async () => {
                    const { login, memDb } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chgrp('users', 'publicThing');
                    const dbBob = await memDb.collections.user.findOne({ name: 'Bob' });
                    assert(dbBob);
                    const bobDb = await login(loginBob);
                    const thingId = await bobDb.collections.publicThing.create({ name: 'foo', value: 42 });
                    const thing = await bobDb.collections.publicThing.load(thingId);
                    assert.strictEqual(thing._owner._id, dbBob._id, 'bob owns thing');
                });
                it('succeeds entity', async () => {
                    const { login, memDb } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const thingId = await db.collections.publicThing.create({ name: 'foo', value: 42 });
                    await db.chgrp('users', 'publicThing');
                    await db.chmod(mode_1.parseSymbolicNotation('rwxr-----'), 'publicThing');
                    await db.chgrp('users', 'publicThing', thingId);
                    const dbBob = await memDb.collections.user.findOne({ name: 'Bob' });
                    assert(dbBob);
                    const bobDb = await login(loginBob);
                    let thing;
                    await assert.doesNotReject(async () => {
                        thing = await bobDb.collections.publicThing.load(thingId);
                    });
                    await assert.rejects(async () => {
                        await bobDb.collections.publicThing.save(thing);
                    });
                    await db.chmod(mode_1.parseSymbolicNotation('rwxrw----'), 'publicThing');
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.save(thing);
                    });
                });
                it('succeeds group owner', async () => {
                    const { login, memDb } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const thingId = await db.collections.publicThing.create({ name: 'foo', value: 42 });
                    await db.createGroup('bobs');
                    await db.chgrp('users', 'publicThing');
                    await db.chgrp('users', 'publicThing', thingId);
                    await db.chown('Bob', 'publicThing', thingId);
                    await db.addUserToGroups('Bob', 'bobs');
                    const dbBob = await memDb.collections.user.findOne({ name: 'Bob' });
                    assert(dbBob);
                    const bobDb = await login(loginBob);
                    await bobDb.chgrp('bobs', 'publicThing', thingId);
                    const thing = await memDb.collections.publicThing.load(thingId);
                    const dbBobs = await memDb.collections.group.findOne({ name: 'bobs' });
                    assert(dbBobs);
                    assert.strictEqual(thing._group._id, dbBobs._id);
                });
                it('fails perm', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const thingId = await db.collections.publicThing.create({ name: 'foo', value: 42 });
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.chgrp('users', 'publicThing', thingId);
                    });
                });
                it('fails group', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    await assert.rejects(async () => {
                        await db.chgrp('bobs', 'publicThing');
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=secure-db-access.js.map