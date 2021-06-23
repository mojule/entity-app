"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbEdges = void 0;
const util_1 = require("@mojule/util");
const getDbEdges = async (db) => {
    const collectionNames = Object.keys(db.collections);
    const edges = [];
    for (const name of collectionNames) {
        const collection = db.collections[name];
        const ids = await collection.ids();
        const entities = await collection.loadMany(ids);
        for (const entity of entities) {
            const from = {
                _collection: name,
                _id: entity._id
            };
            util_1.traverseObject(entity, (value, pointer) => {
                if (isDbRef(value)) {
                    const to = value;
                    edges.push({ from, to, pointer });
                }
            });
        }
    }
    return edges;
};
exports.getDbEdges = getDbEdges;
const isDbRef = (value) => !util_1.isObjectLeaf(value) &&
    typeof value['_collection'] === 'string' &&
    typeof value['_id'] === 'string';
//# sourceMappingURL=get-db-edges.js.map