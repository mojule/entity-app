"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const secure_db_1 = require("./fixtures/secure-db");
describe('secure db', () => {
    describe('db', () => {
        describe('group', () => {
            describe('groupNames', () => {
                it('succeeds', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const groupNames = await db.groupNames();
                    assert.deepStrictEqual(groupNames, ['root', 'users', 'nobody']);
                });
                it('fails', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.groupNames();
                    });
                });
            });
            describe('createGroup', async () => {
                it('succeeds', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    await db.createGroup('bobs');
                    const groupNames = await db.groupNames();
                    assert.deepStrictEqual(groupNames, ['root', 'users', 'nobody', 'bobs']);
                });
                it('fails', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.createGroup('bobs');
                    });
                });
            });
            describe('removeGroup', async () => {
                it('succeeds', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    await db.createGroup('bobs');
                    let groupNames = await db.groupNames();
                    assert.deepStrictEqual(groupNames, ['root', 'users', 'nobody', 'bobs']);
                    await db.removeGroup('bobs');
                    groupNames = await db.groupNames();
                    assert.deepStrictEqual(groupNames, ['root', 'users', 'nobody']);
                });
                it('fails', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    await db.createGroup('bobs');
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.removeGroup('bobs');
                    });
                });
                it('fails no group', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    await assert.rejects(async () => {
                        await db.removeGroup('bobs');
                    });
                });
            });
            describe('setUserPrimaryGroup', () => {
                it('succeeds', async () => {
                    const { login, memDb } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.createGroup('bobs');
                    await db.setUserPrimaryGroup('Bob', 'bobs');
                    const dbBob = await memDb.collections.user.findOne({ name: 'Bob' });
                    const bobsGroup = await memDb.collections.group.findOne({ name: 'bobs' });
                    assert(dbBob);
                    assert(bobsGroup);
                    assert.strictEqual(dbBob._group._id, bobsGroup._id);
                });
                it('fails', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    await db.createGroup('bobs');
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.setUserPrimaryGroup('Bob', 'bobs');
                    });
                });
                it('fails user', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    await db.createGroup('bobs');
                    await assert.rejects(async () => {
                        await db.setUserPrimaryGroup('Bob', 'bobs');
                    });
                });
                it('fails group', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await assert.rejects(async () => {
                        await db.setUserPrimaryGroup('Bob', 'bobs');
                    });
                });
            });
            describe('addUserToGroups', () => {
                it('succeeds', async () => {
                    const { login, memDb } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.createGroup('bobs');
                    await db.addUserToGroups('Bob', 'bobs');
                    const bobsGroup = await memDb.collections.group.findOne({ name: 'bobs' });
                    assert(bobsGroup);
                    const dbBob = await memDb.collections.user.findOne({ name: 'Bob' });
                    assert(dbBob);
                    assert(bobsGroup.users.some(u => u._id === dbBob._id));
                });
                it('fails', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    await db.createGroup('bobs');
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.addUserToGroups('Bob', 'bobs');
                    });
                });
                it('fails user', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    await assert.rejects(async () => {
                        await db.addUserToGroups('Bob', 'users');
                    });
                });
                it('fails group', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    await assert.rejects(async () => {
                        await db.addUserToGroups(secure_db_1.getRootUser().name, 'bobs');
                    });
                });
                it('succeeds existing', async () => {
                    const { login, memDb } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const db = await login(root);
                    await db.createGroup('coolKids');
                    await db.addUserToGroups(root.name, 'coolKids');
                    const groupBefore = await memDb.collections.group.findOne({ name: 'coolKids' });
                    assert(groupBefore);
                    assert.strictEqual(groupBefore.users.length, 1);
                    await db.addUserToGroups(root.name, 'coolKids');
                    const groupAfter = await memDb.collections.group.findOne({ name: 'coolKids' });
                    assert(groupAfter);
                    assert.strictEqual(groupAfter.users.length, 1);
                });
            });
            describe('getUsersForGroup', () => {
                it('succeeds', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const root = secure_db_1.getRootUser();
                    const { name: rootName } = root;
                    const db = await login(root);
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.createGroup('bobs');
                    await db.addUserToGroups('Bob', 'bobs');
                    const usersForRoot = await db.getUsersForGroup('root');
                    assert.deepStrictEqual(usersForRoot, [rootName]);
                    const usersForUsers = await db.getUsersForGroup('users');
                    assert.deepStrictEqual(usersForUsers, [rootName, 'Bob']);
                    const usersForBobs = await db.getUsersForGroup('bobs');
                    assert.deepStrictEqual(usersForBobs, ['Bob']);
                });
                it('fails', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.getUsersForGroup('root');
                    });
                });
            });
            describe('isUserInGroup', () => {
                it('succeeds', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.createGroup('bobs');
                    let isUsers = await db.isUserInGroup('Bob', 'users');
                    let isBobs = await db.isUserInGroup('Bob', 'bobs');
                    let isRoots = await db.isUserInGroup('Bob', 'root');
                    assert(isUsers, 'is in users');
                    assert(!isBobs, 'not in bobs');
                    assert(!isRoots, 'not in roots');
                    await db.addUserToGroups('Bob', 'bobs');
                    isBobs = await db.isUserInGroup('Bob', 'bobs');
                    assert(isBobs, 'is in bobs');
                });
                it('fails', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.isUserInGroup('Bob', 'users');
                    });
                });
                it('fails username', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    await assert.rejects(async () => {
                        await db.isUserInGroup('Bob', 'users');
                    });
                });
                it('fails groupname', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    await assert.rejects(async () => {
                        await db.isUserInGroup(secure_db_1.getRootUser().name, 'bobs');
                    });
                });
            });
            describe('removeUserFromGroups', () => {
                it('succeeds', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    await db.createGroup('bobs');
                    let isUsers = await db.isUserInGroup('Bob', 'users');
                    let isBobs = await db.isUserInGroup('Bob', 'bobs');
                    let isRoots = await db.isUserInGroup('Bob', 'root');
                    assert(isUsers, 'is in users');
                    assert(!isBobs, 'not in bobs');
                    assert(!isRoots, 'not in roots');
                    await db.addUserToGroups('Bob', 'bobs');
                    isBobs = await db.isUserInGroup('Bob', 'bobs');
                    assert(isBobs, 'is in bobs');
                    await db.removeUserFromGroups('Bob', 'bobs');
                    isBobs = await db.isUserInGroup('Bob', 'bobs');
                    assert(!isBobs, 'not in bobs');
                });
                it('fails', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    const loginBob = secure_db_1.getLoginBob();
                    await db.createUser(loginBob);
                    const bobDb = await login(loginBob);
                    await assert.rejects(async () => {
                        await bobDb.removeUserFromGroups('Bob', 'users');
                    });
                });
                it('fails user', async () => {
                    const { login } = await secure_db_1.createSecureMemDbLogin();
                    const db = await login(secure_db_1.getRootUser());
                    await assert.rejects(async () => {
                        await db.removeUserFromGroups('Bob', 'users');
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=secure-db-group.js.map