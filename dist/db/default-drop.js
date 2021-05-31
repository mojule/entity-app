"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultDrop = void 0;
const defaultDrop = (db) => {
    const drop = async () => {
        const collections = Object.values(db.collections);
        for (let c = 0; c < collections.length; c++) {
            const collection = collections[c];
            const ids = await collection.ids();
            await collection.removeMany(ids);
        }
    };
    return drop;
};
exports.defaultDrop = defaultDrop;
//# sourceMappingURL=default-drop.js.map