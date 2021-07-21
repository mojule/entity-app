"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroupFns = void 0;
const errors_1 = require("./errors");
const createGroupFns = (collections, dbUser) => {
    const groupNames = async () => {
        if (!dbUser.isRoot)
            throw errors_1.createEperm('groupNames');
        const groups = await collections.group.find({});
        return groups.map(u => u.name);
    };
    const createGroup = async (name) => {
        if (!dbUser.isRoot)
            throw errors_1.createEperm('createGroup');
        await collections.group.create({ name, users: [] });
    };
    const removeGroup = async (name) => {
        if (!dbUser.isRoot)
            throw errors_1.createEperm('removeGroup');
        const existing = await collections.group.findOne({ name });
        if (!existing)
            throw Error(`Expected a group named ${name}`);
        await collections.group.remove(existing._id);
    };
    const isUserInGroup = async (userName, groupName) => {
        if (!dbUser.isRoot)
            throw errors_1.createEperm('isUserInGroup');
        const user = await collections.user.findOne({ name: userName });
        if (!user)
            throw Error(`Expected a user named ${userName}`);
        const primaryGroup = await collections.group.load(user._group._id);
        if (primaryGroup.name === groupName)
            return true;
        const usersInGroup = await getUsersForGroup(groupName);
        return usersInGroup.includes(userName);
    };
    const getUsersForGroup = async (name) => {
        if (!dbUser.isRoot)
            throw errors_1.createEperm('getUsersForGroup');
        const existing = await collections.group.findOne({ name });
        if (!existing)
            throw Error(`Expected a group named ${name}`);
        const existingUsers = await collections.user.loadMany(existing.users.map(u => u._id));
        const primaryUsers = await collections.user.find({ '_group._id': existing._id });
        existingUsers.push(...primaryUsers);
        const userNames = existingUsers.map(u => u.name);
        const users = new Set(userNames);
        return [...users];
    };
    const setUserPrimaryGroup = async (userName, groupName) => {
        if (!dbUser.isRoot)
            throw errors_1.createEperm('setUserPrimaryGroup');
        const user = await collections.user.findOne({ name: userName });
        if (!user)
            throw Error(`Expected a user named ${userName}`);
        const group = await collections.group.findOne({ name: groupName });
        if (!group)
            throw Error(`Expected a group named ${groupName}`);
        const { _group } = user;
        _group._id = group._id;
        const saveUser = {
            _id: user._id, _group
        };
        await collections.user.save(saveUser);
    };
    const addUserToGroups = async (userName, ...groupNames) => {
        if (!dbUser.isRoot)
            throw errors_1.createEperm('addUserToGroups');
        const user = await collections.user.findOne({ name: userName });
        if (!user)
            throw Error(`Expected a user named ${userName}`);
        const userRef = {
            _id: user._id, _collection: 'user'
        };
        for (const groupName of groupNames) {
            const group = await collections.group.findOne({ name: groupName });
            if (!group)
                throw Error(`Expected a group named ${groupName}`);
            if (group.users.some(u => u._id === user._id))
                continue;
            group.users.push(userRef);
            await collections.group.save(group);
        }
    };
    const removeUserFromGroups = async (userName, ...groupNames) => {
        if (!dbUser.isRoot)
            throw errors_1.createEperm('removeUserFromGroups');
        const user = await collections.user.findOne({ name: userName });
        if (!user)
            throw Error(`Expected a user named ${userName}`);
        const groups = await collections.group.find({ name: { $in: groupNames } });
        for (const group of groups) {
            group.users = group.users.filter(u => u._id !== user._id);
            await collections.group.save(group);
        }
    };
    const fns = {
        groupNames, createGroup, removeGroup, isUserInGroup, getUsersForGroup,
        setUserPrimaryGroup, addUserToGroups, removeUserFromGroups
    };
    return fns;
};
exports.createGroupFns = createGroupFns;
//# sourceMappingURL=group.js.map