"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplyPartial = void 0;
const createApplyPartial = (collection) => {
    const applyPartial = async (entity) => {
        const existing = await collection.load(entity._id);
        return Object.assign({}, existing, entity);
    };
    return applyPartial;
};
exports.createApplyPartial = createApplyPartial;
//# sourceMappingURL=save-partial.js.map