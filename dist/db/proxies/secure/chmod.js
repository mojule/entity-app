"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChmod = void 0;
const errors_1 = require("./errors");
const createChmod = async (collections, user) => {
    const chmod = async (mode, collection, _id) => {
        const collectionData = await collections.collectionData.findOne({ name: collection });
        if (collectionData === undefined)
            throw Error(`Expected collectionData for ${collection}`);
        if (_id === undefined) {
            assertChmod(user, collectionData);
            collectionData._mode = mode;
            await collections.collectionData.save(collectionData);
            return;
        }
        const dbCollection = collections[collection];
        const entity = await dbCollection.load(_id);
        assertChmod(user, entity);
        entity._mode = mode;
        await dbCollection.save(entity);
    };
    return chmod;
};
exports.createChmod = createChmod;
const assertChmod = (dbUser, dbItem) => {
    if (dbUser.isRoot || dbUser._id === dbItem._owner._id)
        return;
    throw errors_1.createEperm('chmod');
};
//# sourceMappingURL=chmod.js.map