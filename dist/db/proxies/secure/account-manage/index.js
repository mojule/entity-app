"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountManageFactory = void 0;
const uuid_1 = require("uuid");
const user_1 = require("../user");
const accountManageFactory = (db) => {
    const createPendingUser = async (user) => {
        user = await user_1.hashPassword(user);
        const secret = uuid_1.v4();
        const pending = Object.assign(Object.assign({}, user), { secret });
        await db.collections.pendingUser.create(pending);
        return secret;
    };
    const verifyPendingUser = async (secret) => {
        const dbPending = await db.collections.pendingUser.findOne({ secret });
        if (dbPending === undefined)
            throw Error('Expected pending user for secret');
        const { name, password } = dbPending;
        const user = { name, password };
        await db.collections.user.create(user);
        await db.collections.pendingUser.remove(dbPending._id);
        return name;
    };
    const createApiKey = async (userName) => {
        const dbUser = await db.collections.user.findOne({ name: userName });
        if (dbUser === undefined)
            throw Error(`Expected user named ${userName}`);
        const secret = uuid_1.v4();
        const userSecret = {
            type: 'api-key',
            secret,
            user: { _id: dbUser._id, _collection: 'user' }
        };
        await db.collections.userSecret.create(userSecret);
        return secret;
    };
    const userForSecret = async (secret, type = 'api-key') => {
        const userSecret = await db.collections.userSecret.findOne({ secret, type });
        if (userSecret === undefined)
            throw Error(`Expected ${type} for secret`);
        const dbUser = await db.collections.user.load(userSecret.user._id);
        return dbUser.name;
    };
    const forgotPassword = async (userName) => {
        const dbUser = await db.collections.user.findOne({ name: userName });
        if (dbUser === undefined)
            throw Error(`Expected user named ${userName}`);
        const secret = uuid_1.v4();
        const userSecret = {
            type: 'forgot-password',
            secret,
            user: { _id: dbUser._id, _collection: 'user' }
        };
        await db.collections.userSecret.create(userSecret);
        return secret;
    };
    const resetPassword = async (secret, password) => {
        const userSecret = await db.collections.userSecret.findOne({ secret, type: 'forgot-password' });
        if (userSecret === undefined)
            throw Error('Expected user secret for secret');
        const saveUser = {
            _id: userSecret.user._id, password
        };
        const hashedUser = await user_1.hashPassword(saveUser);
        await db.collections.user.save(hashedUser);
        await db.collections.userSecret.remove(userSecret._id);
    };
    const cleanSecrets = async (maxAgeMs) => {
        const now = Date.now();
        const oldest = now - maxAgeMs;
        const old = await db.collections.userSecret.find({ _ctime: { $lt: oldest } });
        const ids = old.map(s => s._id);
        await db.collections.userSecret.removeMany(ids);
    };
    const cleanPendingUsers = async (maxAgeMs) => {
        const now = Date.now();
        const oldest = now - maxAgeMs;
        const oldSecrets = await db.collections.pendingUser.find({ _ctime: { $lt: oldest } });
        const ids = oldSecrets.map(s => s._id);
        await db.collections.pendingUser.removeMany(ids);
    };
    const accountFns = {
        createPendingUser, verifyPendingUser, createApiKey, userForSecret,
        forgotPassword, resetPassword, cleanSecrets, cleanPendingUsers
    };
    return accountFns;
};
exports.accountManageFactory = accountManageFactory;
//# sourceMappingURL=index.js.map