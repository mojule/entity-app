"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const db_item_to_entity_1 = require("../db/db-item-to-entity");
const metadata_db_1 = require("./fixtures/metadata-db");
describe('db', () => {
    it('dbItemToEntity', async () => {
        const db = await metadata_db_1.createMetadataDb();
        const _id = await db.collections.publicThing.create({ name: 'thing', value: 42 });
        const dbItem = await db.collections.publicThing.load(_id);
        const entity = db_item_to_entity_1.dbItemToEntity(dbItem);
        const entityKeys = Object.keys(entity);
        assert.deepStrictEqual(entityKeys, ['_id', 'name', 'value']);
    });
    it('dbItemToMetadata', async () => {
        const db = await metadata_db_1.createMetadataDb();
        const _id = await db.collections.publicThing.create({ name: 'thing', value: 42 });
        const dbItem = await db.collections.publicThing.load(_id);
        const metadata = db_item_to_entity_1.dbItemToMetadata(dbItem);
        const metadataKeys = Object.keys(metadata);
        assert.deepStrictEqual(metadataKeys, ['_id', '_ver', '_atime', '_ctime', '_mtime']);
    });
});
//# sourceMappingURL=db.js.map