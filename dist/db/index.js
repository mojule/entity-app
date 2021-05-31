"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbItemToEntity = void 0;
const dbItemToEntity = (dbItem) => {
    const entity = Object.assign({}, dbItem, { _id: undefined });
    delete entity['_id'];
    return entity;
};
exports.dbItemToEntity = dbItemToEntity;
//# sourceMappingURL=index.js.map