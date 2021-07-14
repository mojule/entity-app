"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserInGroup = exports.createAccessOptions = void 0;
const createAccessOptions = async (db, user, entity, isDirectory) => {
    const accessOptions = {
        isDirectory,
        isRoot: user.isRoot || false,
        isOwner: user._id === entity._owner._id,
        isGroup: await exports.isUserInGroup(db, user._id, entity._group._id),
        permissions: entity._mode
    };
    return accessOptions;
};
exports.createAccessOptions = createAccessOptions;
const isUserInGroup = async (db, userId, groupId) => {
    const user = await db.collections.user.load(userId);
    if (user._group._id === groupId)
        return true;
    const group = await db.collections.group.load(groupId);
    return group.users.some(r => r._id === userId);
};
exports.isUserInGroup = isUserInGroup;
//# sourceMappingURL=util.js.map