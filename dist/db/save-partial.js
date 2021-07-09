"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplyPartial = void 0;
const createApplyPartial = (collection) => {
    const applyPartial = async (entity) => {
        const existing = await collection.load(entity._id);
        const document = entity;
        const overwriteKeys = Object.keys(existing).filter(k => k.startsWith('_') || !(k in entity));
        overwriteKeys.forEach(key => entity[key] = existing[key]);
        return document;
    };
    return applyPartial;
};
exports.createApplyPartial = createApplyPartial;
//# sourceMappingURL=save-partial.js.map