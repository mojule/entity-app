"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbItemToEntity = void 0;
const dbItemToEntity = (dbItem) => {
    const entity = {};
    Object.keys(dbItem).forEach(key => {
        if (key.startsWith('_'))
            return;
        entity[key] = dbItem[key];
    });
    return entity;
};
exports.dbItemToEntity = dbItemToEntity;
//# sourceMappingURL=db-item-to-entity.js.map