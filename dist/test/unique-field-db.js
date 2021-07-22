"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@mojule/util");
const assert = require("assert");
const unique_field_db_1 = require("./fixtures/unique-field-db");
describe('unique field db', () => {
    it('create', async () => {
        const db = await unique_field_db_1.createUniqueFieldDb();
        await assert.doesNotReject(db.collections.a.create({ name: 'a', abbrev: 'A', title: 'The A' }));
        await assert.doesNotReject(async () => await db.collections.a.create({ name: 'b', abbrev: 'B', title: 'The A' }));
        await assert.rejects(async () => await db.collections.a.create({ name: 'b', abbrev: 'C', title: 'The A' }));
        await assert.rejects(async () => await db.collections.a.create({ name: 'c', abbrev: 'B', title: 'The A' }));
    });
    it('createMany', async () => {
        const db = await unique_field_db_1.createUniqueFieldDb();
        await assert.doesNotReject(async () => await db.collections.a.createMany([
            { name: 'a', abbrev: 'A', title: 'The A' },
            { name: 'b', abbrev: 'B', title: 'The A' }
        ]));
        await assert.rejects(async () => await db.collections.a.createMany([
            { name: 'c', abbrev: 'C', title: 'The A' },
            { name: 'b', abbrev: 'D', title: 'The A' }
        ]));
    });
    it('createMany checks siblings', async () => {
        const db = await unique_field_db_1.createUniqueFieldDb();
        await assert.rejects(async () => await db.collections.a.createMany([
            { name: 'a', abbrev: 'A', title: 'The A' },
            { name: 'a', abbrev: 'B', title: 'The A' }
        ]));
    });
    it('save', async () => {
        const db = await unique_field_db_1.createUniqueFieldDb();
        const firstId = await db.collections.a.create({ name: 'a', abbrev: 'A', title: 'The A' });
        const secondId = await db.collections.a.create({ name: 'b', abbrev: 'B', title: 'The B' });
        await assert.doesNotReject(async () => await db.collections.a.save({ _id: firstId, name: 'c', abbrev: 'A', title: 'The B' }));
        await assert.rejects(async () => await db.collections.a.save({ _id: secondId, name: 'b', abbrev: 'A' }));
    });
    it('saveMany', async () => {
        const db = await unique_field_db_1.createUniqueFieldDb();
        const many = [
            { name: 'a', abbrev: 'A', title: 'The A' },
            { name: 'b', abbrev: 'B', title: 'The B' }
        ];
        const ids = await db.collections.a.createMany(many);
        const update = many.map((entity, i) => {
            const dbItem = { _id: ids[i] };
            Object.assign(dbItem, entity);
            if (i === 0) {
                dbItem.name = 'c', dbItem.abbrev = 'C';
            }
            if (i === 1) {
                dbItem.name = 'd', dbItem.abbrev = 'D';
            }
            return dbItem;
        });
        await assert.doesNotReject(async () => await db.collections.a.saveMany(update));
        // second time proves items can be saved with their existing values
        await assert.doesNotReject(async () => await db.collections.a.saveMany(update));
        const updateFail = [
            { _id: ids[0], abbrev: 'A' },
            { _id: ids[1], abbrev: 'A' }
        ];
        await assert.rejects(async () => await db.collections.a.saveMany(updateFail));
    });
    it('saveMany checks siblings', async () => {
        const db = await unique_field_db_1.createUniqueFieldDb();
        const many = [
            { name: 'a', abbrev: 'A', title: 'The A' },
            { name: 'b', abbrev: 'B', title: 'The B' }
        ];
        const ids = await db.collections.a.createMany(many);
        const update = many.map((entity, i) => {
            entity = util_1.clone(entity);
            Object.assign(entity, { _id: ids[i] });
            if (i === 0) {
                entity.name = 'b', entity.abbrev = 'B';
            }
            if (i === 1) {
                entity.name = 'a', entity.abbrev = 'A';
            }
            return entity;
        });
        await assert.doesNotReject(async () => await db.collections.a.saveMany(update));
    });
});
//# sourceMappingURL=unique-field-db.js.map