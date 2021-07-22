"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbItemToMetadata = exports.dbItemToEntity = void 0;
const dbItemToEntity = (dbItem) => {
    const entity = {};
    Object.keys(dbItem).forEach(key => {
        if (key !== '_id' && key.startsWith('_'))
            return;
        entity[key] = dbItem[key];
    });
    return entity;
};
exports.dbItemToEntity = dbItemToEntity;
const dbItemToMetadata = (dbItem) => {
    const metadata = {};
    Object.keys(dbItem).forEach(key => {
        if (!key.startsWith('_'))
            return;
        metadata[key] = dbItem[key];
    });
    return metadata;
};
exports.dbItemToMetadata = dbItemToMetadata;
//# sourceMappingURL=db-item-to-entity.js.map