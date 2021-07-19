"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessFns = void 0;
const errors_1 = require("./errors");
const createAccessFns = (collections, isUserInGroup, user) => {
    const accessChange = async (action, collection, _id) => {
        const collectionData = await collections.collectionData.findOne({ name: collection });
        if (collectionData === undefined)
            throw Error(`Expected collectionData for ${collection}`);
        if (_id === undefined) {
            await action(collectionData);
            return collections.collectionData.save(collectionData);
        }
        const dbCollection = collections[collection];
        const entity = await dbCollection.load(_id);
        await action(entity);
        return dbCollection.save(entity);
    };
    const assertRootOrOwner = (dbItem, operation) => {
        if (user.isRoot || user._id === dbItem._owner._id)
            return;
        throw errors_1.createEperm(operation);
    };
    const assertGrp = (dbItem, groupName) => {
        if (user.isRoot)
            return;
        if (user._id === dbItem._owner._id && isUserInGroup(user.name, groupName))
            return;
        throw errors_1.createEperm('chgrp');
    };
    const chmod = async (mode, collection, _id) => accessChange(async (entity) => {
        assertRootOrOwner(entity, 'chmod');
        entity._mode = mode;
    }, collection, _id);
    const chown = async (userName, collection, _id) => accessChange(async (entity) => {
        assertRootOrOwner(entity, 'chmod');
        const newOwner = await collections.user.findOne({ name: userName });
        if (newOwner === undefined)
            throw Error(`Expected user named ${userName}`);
        entity._owner = { _id: newOwner._id, _collection: 'user' };
    }, collection, _id);
    const chgrp = async (groupName, collection, _id) => accessChange(async (entity) => {
        assertGrp(entity, groupName);
        const newGroup = await collections.group.findOne({ name: groupName });
        if (newGroup === undefined)
            throw Error(`Expected group named ${groupName}`);
        entity._group = { _id: newGroup._id, _collection: 'group' };
    }, collection, _id);
    const fns = { chmod, chown, chgrp };
    return fns;
};
exports.createAccessFns = createAccessFns;
//# sourceMappingURL=access.js.map