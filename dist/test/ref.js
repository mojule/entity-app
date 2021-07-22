"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@mojule/util");
const assert = require("assert");
const __1 = require("../");
const ref_1 = require("../db/ref");
const memory_db_1 = require("./fixtures/memory-db");
const ref_db_1 = require("./fixtures/ref-db");
describe('ref', () => {
    it('isRef', () => {
        const expect = {
            _id: '',
            _collection: ''
        };
        assert(!__1.isRef(null));
        assert(!__1.isRef({ _id: '' }));
        assert(!__1.isRef({ _collection: '' }));
        assert(__1.isRef(expect));
    });
    it('isRefArray', () => {
        const expect = {
            _id: '',
            _collection: ''
        };
        assert(!__1.isRefArray([null]));
        assert(!__1.isRefArray(null));
        assert(!__1.isRefArray([expect, null]));
        assert(__1.isRefArray([expect, expect]));
    });
    it('resolveRef', async () => {
        const db = await memory_db_1.createMemDb();
        const entity = { name: 'Nik', group: 'People' };
        const _id = await db.collections.user.create(util_1.clone(entity));
        const ref = {
            _collection: 'user',
            _id
        };
        const dbItem = await ref_1.resolveRef(db, ref);
        assert.strictEqual(dbItem.name, entity.name);
        assert.strictEqual(dbItem.group, entity.group);
    });
    it('resolveRefArray', async () => {
        const db = await memory_db_1.createMemDb();
        const entities = [
            { name: 'Nik', group: 'People' },
            { name: 'Kate', group: 'People' }
        ];
        const _ids = await db.collections.user.createMany(util_1.clone(entities));
        const refs = _ids.map(_id => ({ _collection: 'user', _id }));
        const dbItems = await ref_1.resolveRefArray(db, refs);
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const dbItem = dbItems[i];
            assert.strictEqual(dbItem._id, _ids[i]);
            assert.strictEqual(dbItem.name, entity.name);
            assert.strictEqual(dbItem.group, entity.group);
        }
        const empty = await ref_1.resolveRefArray(db, []);
        assert.strictEqual(empty.length, 0);
    });
    it('resolveRefsShallow', async () => {
        const db = await ref_db_1.createRefDb();
        const foo0 = {
            name: 'f0'
        };
        const baz0 = {
            name: 'bz0',
            quxes: []
        };
        const qux0 = {
            name: 'q0'
        };
        const qux1 = {
            name: 'q1'
        };
        const foo0Id = await db.collections.foo.create(foo0);
        qux0.foo = { _collection: 'foo', _id: foo0Id };
        const qux0Id = await db.collections.qux.create(qux0);
        const qux1Id = await db.collections.qux.create(qux1);
        baz0.quxes.push({ _collection: 'qux', _id: qux0Id }, { _collection: 'qux', _id: qux1Id });
        const shallow = await ref_1.resolveRefsShallow(db, qux0);
        assert.deepStrictEqual(shallow, { name: 'q0', foo: { _id: foo0Id, name: 'f0' } });
        const shallowArray = await ref_1.resolveRefsShallow(db, baz0);
        const expectArray = {
            name: 'bz0',
            quxes: [{
                    '_id': qux0Id,
                    name: 'q0',
                    foo: {
                        '_collection': 'foo',
                        '_id': foo0Id
                    }
                }, {
                    '_id': qux1Id,
                    name: 'q1'
                }]
        };
        assert.deepStrictEqual(shallowArray, expectArray);
    });
    it('resolveRefsDeep', async () => {
        const db = await ref_db_1.createRefDb();
        const foo0 = {
            name: 'f0'
        };
        const baz0 = {
            name: 'bz0',
            quxes: []
        };
        const qux0 = {
            name: 'q0'
        };
        const qux1 = {
            name: 'q1'
        };
        const foo0Id = await db.collections.foo.create(foo0);
        qux0.foo = { _collection: 'foo', _id: foo0Id };
        const qux0Id = await db.collections.qux.create(qux0);
        const qux1Id = await db.collections.qux.create(qux1);
        baz0.quxes.push({ _collection: 'qux', _id: qux0Id }, { _collection: 'qux', _id: qux1Id });
        const deep = await ref_1.resolveRefsDeep(db, baz0);
        const expectDeep = {
            name: 'bz0',
            quxes: [{
                    '_id': qux0Id,
                    name: 'q0',
                    foo: {
                        '_id': foo0Id,
                        name: 'f0'
                    }
                }, {
                    '_id': qux1Id,
                    name: 'q1'
                }]
        };
        assert.deepStrictEqual(deep, expectDeep);
        // make a circular ref
        foo0.qux = { _collection: 'qux', _id: qux0Id };
        await db.collections.foo.save(Object.assign(foo0, { _id: foo0Id }));
        await assert.rejects(async () => await ref_1.resolveRefsDeep(db, foo0), { message: 'Exceeded depth limit' });
    });
});
//# sourceMappingURL=ref.js.map