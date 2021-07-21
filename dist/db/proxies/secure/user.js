"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.validateDbUser = exports.createUserFns = void 0;
const util_1 = require("@mojule/util");
const bcrypt = require("bcryptjs");
const errors_1 = require("./errors");
const createUserFns = (collection, dbUser) => {
    const userNames = async () => {
        if (!dbUser.isRoot)
            throw errors_1.createEperm('userNames');
        const users = await collection.find({});
        return users.map(u => u.name);
    };
    const createUser = async (user, isRoot) => {
        if (!dbUser.isRoot)
            throw errors_1.createEperm('createUser');
        user = util_1.clone(user);
        user['isRoot'] = isRoot;
        await collection.create(user);
    };
    const removeUser = async (name) => {
        if (!dbUser.isRoot)
            throw errors_1.createEperm('removeUser');
        const existing = await collection.findOne({ name });
        if (existing === undefined)
            throw Error(`Expected user named ${name}`);
        await collection.remove(existing._id);
    };
    const setPassword = async (user) => {
        if (!dbUser.isRoot)
            throw errors_1.createEperm('setPassword');
        const existing = await collection.findOne({ name: user.name });
        if (existing === undefined)
            throw Error(`Expected user named ${user.name}`);
        const saveUser = Object.assign({ _id: existing._id }, user);
        await collection.save(saveUser);
    };
    const fns = {
        userNames, createUser, removeUser, setPassword
    };
    return fns;
};
exports.createUserFns = createUserFns;
const validateDbUser = async (collection, user) => {
    const dbUser = await collection.findOne({ name: user.name });
    const expect = dbUser ? dbUser.password : '';
    // test even if no user so takes same amount of time regardless
    const isValid = await bcrypt.compare(user.password, expect);
    if (dbUser === undefined) {
        return false;
    }
    return isValid;
};
exports.validateDbUser = validateDbUser;
const hashPassword = async (entity) => {
    if ('password' in entity) {
        entity = util_1.clone(entity);
        entity['password'] = await bcrypt.hash(entity['password'], 10);
    }
    return entity;
};
exports.hashPassword = hashPassword;
//# sourceMappingURL=user.js.map