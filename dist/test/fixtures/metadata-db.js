"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMetadataDb = exports.metadataEntityKeys = void 0;
const db_memory_1 = require("../../db/db-memory");
const metadata_1 = require("../../db/proxies/metadata");
exports.metadataEntityKeys = {
    publicThing: 'publicThing'
};
const createMetadataDb = async () => {
    const memDb = await db_memory_1.createMemoryDb('', exports.metadataEntityKeys, metadata_1.createMetadataDbItem);
    const metadataDb = metadata_1.metadataDbFactory(memDb);
    return metadataDb;
};
exports.createMetadataDb = createMetadataDb;
//# sourceMappingURL=metadata-db.js.map