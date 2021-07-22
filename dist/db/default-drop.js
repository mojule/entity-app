"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultDrop = void 0;
const defaultDrop = (db) => {
    const drop = async () => {
        for (const key in db.collections) {
            const collection = db.collections[key];
            const ids = await collection.ids();
            await collection.removeMany(ids);
        }
    };
    return drop;
};
exports.defaultDrop = defaultDrop;
//# sourceMappingURL=default-drop.js.map