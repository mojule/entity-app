"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const secure_1 = require("../db/proxies/secure");
const secure_db_1 = require("./fixtures/secure-db");
describe('secure db', () => {
    describe('db', () => {
        describe('collections', () => {
            describe('ids', () => {
                it('succeeds', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 },
                        { name: 'c', value: 2 }
                    ]);
                    const ids = await db.collections.publicThing.ids();
                    assert.strictEqual(ids.length, 3);
                });
                it('succeeds user', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const thingIds = await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 },
                        { name: 'c', value: 2 }
                    ]);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chgrp('users', 'publicThing');
                    for (const thingId of thingIds) {
                        // skip one to test that we only get ids for ones we have read for
                        if (thingId === thingIds[0])
                            continue;
                        db.chgrp('users', 'publicThing', thingId);
                    }
                    const bobDb = await login(loginBob);
                    const bobThingIds = await bobDb.collections.publicThing.ids();
                    assert.strictEqual(bobThingIds.length, 2);
                });
                it('succeeds other', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const thingIds = await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 },
                        { name: 'c', value: 2 }
                    ]);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chmod(0o0777, 'publicThing');
                    for (const thingId of thingIds) {
                        // skip one to test that we only get ids for ones we have read for
                        if (thingId === thingIds[0])
                            continue;
                        db.chmod(0o0777, 'publicThing', thingId);
                    }
                    const bobDb = await login(loginBob);
                    const bobThingIds = await bobDb.collections.publicThing.ids();
                    assert.strictEqual(bobThingIds.length, 2);
                });
                it('fails', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 },
                        { name: 'c', value: 2 }
                    ]);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.collections.publicThing.ids();
                    });
                });
            });
            describe('create', () => {
                it('succeeds', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    assert(typeof id === 'string');
                });
                it('fails perm', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.collections.publicThing.create({ name: 'a', value: 0 });
                    });
                });
                it('succeeds user', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chgrp('users', 'publicThing');
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.create({ name: 'a', value: 0 });
                    });
                });
                it('succeeds other', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chmod(0o0777, 'publicThing');
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.create({ name: 'a', value: 0 });
                    });
                });
            });
            describe('createMany', () => {
                it('succeeds', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const ids = await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 }
                    ]);
                    assert(Array.isArray(ids));
                    assert.strictEqual(ids.length, 2);
                });
                // we need to do some trickery to access createMany users
                it('succeeds createMany users', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const internalCollections = db[secure_1.InternalCollections];
                    const userIds = await internalCollections.user.createMany([
                        secure_db_1.getLoginBob(), { name: 'Kate', password: 'Kittens' }
                    ]);
                    assert.strictEqual(userIds.length, 2);
                });
                it('fails perm', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.collections.publicThing.createMany([
                            { name: 'a', value: 0 }, { name: 'b', value: 1 }
                        ]);
                    });
                });
                it('succeeds user', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chgrp('users', 'publicThing');
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.createMany([
                            { name: 'a', value: 0 }, { name: 'b', value: 1 }
                        ]);
                    });
                });
                it('succeeds other', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chmod(0o0777, 'publicThing');
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.createMany([
                            { name: 'a', value: 0 }, { name: 'b', value: 1 }
                        ]);
                    });
                });
            });
            describe('load', () => {
                it('succeeds', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    const thing = await db.collections.publicThing.load(id);
                    assert.strictEqual(thing.name, 'a');
                    assert.strictEqual(thing.value, 0);
                });
                it('fails perm', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.collections.publicThing.load(id);
                    });
                });
                it('succeeds user', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chgrp('users', 'publicThing');
                    const id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    await db.chgrp('users', 'publicThing', id);
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.load(id);
                    });
                });
                it('succeeds other', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chmod(0o0777, 'publicThing');
                    const id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    await db.chmod(0o0777, 'publicThing', id);
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.load(id);
                    });
                });
            });
            describe('loadMany', () => {
                it('succeeds', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const ids = await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 }
                    ]);
                    const things = await db.collections.publicThing.loadMany(ids);
                    assert(Array.isArray(things));
                    assert.strictEqual(things.length, 2);
                });
                it('fails perm', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const ids = await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 }
                    ]);
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.collections.publicThing.loadMany(ids);
                    });
                });
                it('succeeds user', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chgrp('users', 'publicThing');
                    const ids = await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 }
                    ]);
                    for (const id of ids) {
                        await db.chgrp('users', 'publicThing', id);
                    }
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.loadMany(ids);
                    });
                });
                it('succeeds other', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chmod(0o0777, 'publicThing');
                    const ids = await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 }
                    ]);
                    for (const id of ids) {
                        await db.chmod(0o0777, 'publicThing', id);
                    }
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.loadMany(ids);
                    });
                });
            });
            describe('save', () => {
                it('succeeds', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const _id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    const save = { _id, name: 'b' };
                    await db.collections.publicThing.save(save);
                    const savedThing = await db.collections.publicThing.load(_id);
                    assert.strictEqual(savedThing.name, 'b');
                });
                it('fails perm', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const _id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.collections.publicThing.save({ _id, name: 'b' });
                    });
                });
                it('succeeds user', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chgrp('users', 'publicThing');
                    const _id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    await db.chgrp('users', 'publicThing', _id);
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.save({ _id, name: 'b' });
                    });
                });
                it('succeeds other', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chmod(0o0777, 'publicThing');
                    const _id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    await db.chgrp('users', 'publicThing', _id);
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.save({ _id, name: 'b' });
                    });
                });
            });
            describe('saveMany', () => {
                it('succeeds', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const ids = await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 }
                    ]);
                    const save = ids.map((_id, i) => ({ _id, value: i }));
                    await db.collections.publicThing.saveMany(save);
                    const saved = await db.collections.publicThing.loadMany(ids);
                    saved.forEach((entity, i) => {
                        assert.strictEqual(entity.value, i);
                    });
                });
                // we need to do some trickery to access createMany users
                it('succeeds saveMany users', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const internalCollections = db[secure_1.InternalCollections];
                    const userIds = await internalCollections.user.createMany([
                        secure_db_1.getLoginBob(), { name: 'Kate', password: 'Kittens' }
                    ]);
                    const save = userIds.map((_id, i) => ({ _id, name: `Anon ${i + 1}` }));
                    await internalCollections.user.saveMany(save);
                    const saved = await internalCollections.user.loadMany(userIds);
                    saved.forEach((entity, i) => {
                        assert.strictEqual(entity.name, `Anon ${i + 1}`);
                    });
                });
                it('fails perm', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const ids = await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 }
                    ]);
                    const save = ids.map((_id, i) => ({ _id, value: i }));
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.collections.publicThing.saveMany(save);
                    });
                });
                it('succeeds user', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const ids = await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 }
                    ]);
                    const save = ids.map((_id, i) => ({ _id, value: i }));
                    await db.chgrp('users', 'publicThing');
                    for (const id of ids) {
                        await db.chgrp('users', 'publicThing', id);
                    }
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.saveMany(save);
                    });
                });
                it('succeeds other', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chmod(0o0777, 'publicThing');
                    const ids = await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 }
                    ]);
                    const save = ids.map((_id, i) => ({ _id, value: i }));
                    for (const id of ids) {
                        await db.chmod(0o0777, 'publicThing', id);
                    }
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.saveMany(save);
                    });
                });
            });
            describe('find', () => {
                it('succeeds', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 }
                    ]);
                    const things = await db.collections.publicThing.find({});
                    assert(Array.isArray(things));
                    assert.strictEqual(things.length, 2);
                });
                it('fails perm', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 }
                    ]);
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.collections.publicThing.find({});
                    });
                });
                it('succeeds user', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chgrp('users', 'publicThing');
                    const ids = await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 },
                        { name: 'c', value: 2 }
                    ]);
                    // only set second two to ensure find only returns things with read
                    for (const id of ids.slice(1)) {
                        await db.chgrp('users', 'publicThing', id);
                    }
                    const bobDb = await login(loginBob);
                    const filtered = await bobDb.collections.publicThing.find({});
                    assert.strictEqual(filtered.length, 2);
                });
                it('succeeds other', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chmod(0o0777, 'publicThing');
                    const ids = await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 }
                    ]);
                    for (const id of ids) {
                        await db.chmod(0o0777, 'publicThing', id);
                    }
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.find({});
                    });
                });
            });
            describe('findOne', () => {
                it('succeeds', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const _id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    const thing = await db.collections.publicThing.findOne({ _id });
                    assert(thing);
                    assert.strictEqual(thing.name, 'a');
                    assert.strictEqual(thing.value, 0);
                });
                it('fails perm', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const _id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.collections.publicThing.findOne({ _id });
                    });
                });
                it('fails undefined when has collection access', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const _id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chgrp('users', 'publicThing');
                    const bobDb = await login(loginBob);
                    const bobThing = await bobDb.collections.publicThing.findOne({ _id });
                    assert.strictEqual(bobThing, undefined);
                });
                it('succeeds user', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chgrp('users', 'publicThing');
                    const _id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    await db.chgrp('users', 'publicThing', _id);
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.findOne({ _id });
                    });
                });
                it('succeeds other', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chmod(0o0777, 'publicThing');
                    const _id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    await db.chmod(0o0777, 'publicThing', _id);
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.findOne({ _id });
                    });
                });
            });
            describe('remove', () => {
                it('succeeds', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const _id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    await db.collections.publicThing.remove(_id);
                    await assert.rejects(async () => {
                        await db.collections.publicThing.load(_id);
                    });
                });
                it('fails perm', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const _id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.collections.publicThing.remove(_id);
                    });
                });
                it('succeeds user', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chgrp('users', 'publicThing');
                    const _id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    await db.chgrp('users', 'publicThing', _id);
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.remove(_id);
                    });
                });
                it('succeeds other', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chmod(0o0777, 'publicThing');
                    const _id = await db.collections.publicThing.create({ name: 'a', value: 0 });
                    await db.chgrp('users', 'publicThing', _id);
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.remove(_id);
                    });
                });
                it('removes user from groups', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.createGroup('bobs');
                    await db.createGroup('losers');
                    await db.addUserToGroups('Bob', 'bobs', 'losers');
                    await db.createUser({ name: 'Kate', password: 'Kittens' });
                    await db.addUserToGroups('Kate', 'losers');
                    const internalCollections = db[secure_1.InternalCollections];
                    const dbBob = await internalCollections.user.findOne({ name: 'Bob' });
                    assert(dbBob);
                    await internalCollections.user.remove(dbBob._id);
                    const bobsUsers = await db.getUsersForGroup('bobs');
                    const losersUsers = await db.getUsersForGroup('losers');
                    assert.deepStrictEqual(bobsUsers, []);
                    assert.deepStrictEqual(losersUsers, ['Kate']);
                });
                it('removes many users from groups', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.createGroup('bobs');
                    await db.createGroup('losers');
                    await db.addUserToGroups('Bob', 'bobs', 'losers');
                    await db.createUser({ name: 'Kate', password: 'Kittens' });
                    await db.addUserToGroups('Kate', 'losers');
                    const internalCollections = db[secure_1.InternalCollections];
                    const dbBob = await internalCollections.user.findOne({ name: 'Bob' });
                    const dbKate = await internalCollections.user.findOne({ name: 'Kate' });
                    assert(dbBob);
                    assert(dbKate);
                    await internalCollections.user.removeMany([dbBob._id, dbKate._id]);
                    const bobsUsers = await db.getUsersForGroup('bobs');
                    const losersUsers = await db.getUsersForGroup('losers');
                    assert.deepStrictEqual(bobsUsers, []);
                    assert.deepStrictEqual(losersUsers, []);
                });
            });
            describe('removeMany', () => {
                it('succeeds', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const ids = await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 }
                    ]);
                    await db.collections.publicThing.removeMany(ids);
                    assert.deepStrictEqual(await db.collections.publicThing.ids(), []);
                });
                it('fails perm', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const ids = await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 }
                    ]);
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.collections.publicThing.removeMany(ids);
                    });
                });
                it('succeeds user', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chgrp('users', 'publicThing');
                    const ids = await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 }
                    ]);
                    for (const id of ids) {
                        await db.chgrp('users', 'publicThing', id);
                    }
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.removeMany(ids);
                    });
                });
                it('succeeds other', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.chmod(0o0777, 'publicThing');
                    const ids = await db.collections.publicThing.createMany([
                        { name: 'a', value: 0 }, { name: 'b', value: 1 }
                    ]);
                    for (const id of ids) {
                        await db.chmod(0o0777, 'publicThing', id);
                    }
                    const bobDb = await login(loginBob);
                    await assert.doesNotReject(async () => {
                        await bobDb.collections.publicThing.removeMany(ids);
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=secure-db-collections.js.map