"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_pointer_1 = require("@mojule/json-pointer");
const util_1 = require("@mojule/util");
const assert = require("assert");
const __1 = require("..");
const predicates_1 = require("../schema/predicates");
const ref_1 = require("../schema/ref");
const ref_resolver_1 = require("../schema/resolve/ref-resolver");
const ref_db_1 = require("./fixtures/ref-db");
const schema_1 = require("./fixtures/schema");
describe('schema', () => {
    describe('refResolver', () => {
        it('resolves', () => {
            const schema = ref_resolver_1.refResolver(schema_1.testSchemaMap, 'baz');
            const expect = {
                $id: '#/baz',
                properties: {
                    quxes: {
                        type: 'array',
                        items: {
                            '$id': '#/qux',
                            properties: {
                                name: {
                                    type: 'string'
                                }
                            },
                            required: ['name']
                        }
                    }
                },
                required: ['name', 'quxes']
            };
            assert.deepStrictEqual(schema, expect);
        });
        it('fails on missing $id', () => {
            const schemaMap = Object.assign({}, schema_1.testSchemaMap, {
                bad: {
                    $id: '#/bad',
                    type: 'object',
                    properties: {
                        whack: { $ref: '#/whack' }
                    }
                }
            });
            assert.throws(() => ref_resolver_1.refResolver(schemaMap, 'bad'), { message: `Expected a schema for #/whack` });
        });
    });
    describe('schemaResolver', () => {
        it('resolves', async () => {
            const db = await ref_db_1.createRefDb();
            const foo0 = {
                name: 'f0'
            };
            const baz0 = {
                name: 'bz0',
                quxes: []
            };
            await db.collections.foo.create(foo0);
            const baz0Id = await db.collections.baz.create(baz0);
            const bar0 = {
                name: 'ba0',
                baz: { _collection: 'baz', _id: baz0Id }
            };
            const bar1 = {
                baz: { _collection: 'baz', _id: baz0Id }
            };
            const bar0Id = await db.collections.bar.create(bar0);
            const bar1Id = await db.collections.bar.create(bar1);
            const resolvedFoo = await __1.schemaResolver(db, 'foo', schema_1.testSchemaDbMap);
            const barEnum = json_pointer_1.get(resolvedFoo, '/properties/bar/properties/_id/enum');
            assert(Array.isArray(barEnum));
            assert.deepStrictEqual(barEnum, [bar0Id, bar1Id]);
            const barEnumTiles = json_pointer_1.get(resolvedFoo, '/properties/bar/properties/_id/_enumTitles');
            assert(Array.isArray(barEnumTiles));
            assert.deepStrictEqual(barEnumTiles, [bar0.name, 'bar 2']);
        });
        it('fails on bad collection', async () => {
            const db = await ref_db_1.createRefDb();
            const foo0 = {
                name: 'f0'
            };
            const baz0 = {
                name: 'bz0',
                quxes: []
            };
            await db.collections.foo.create(foo0);
            const baz0Id = await db.collections.baz.create(baz0);
            const bar0 = {
                name: 'ba0',
                baz: { _collection: 'baz', _id: baz0Id }
            };
            const bar1 = {
                baz: { _collection: 'baz', _id: baz0Id }
            };
            await db.collections.bar.create(bar0);
            await db.collections.bar.create(bar1);
            db.collections = {};
            assert.rejects(() => __1.schemaResolver(db, 'foo', schema_1.testSchemaDbMap), `Expected bar in db.collections`);
        });
    });
    describe('refFactory', () => {
        it('creates a refFactory', () => {
            const create = ref_1.refFactory('#');
            assert.strictEqual(typeof create, 'function');
        });
        it('create ref from factory', () => {
            const expect = {
                $id: '#/test-ref',
                title: 'Test',
                type: 'object',
                properties: {
                    _id: {
                        title: 'ID',
                        type: 'string'
                    },
                    _collection: {
                        title: 'Collection',
                        type: 'string',
                        enum: ['test']
                    }
                },
                required: ['_id', '_collection']
            };
            const create = ref_1.refFactory('#/');
            const ref = create('test');
            assert.deepStrictEqual(ref, expect);
        });
    });
    describe('isDbRefSchema', () => {
        it('fails not object', () => {
            assert(!ref_1.isDbRefSchema(''));
        });
        it('fails no $id', () => {
            assert(!ref_1.isDbRefSchema({}));
        });
        it('fails no title', () => {
            assert(!ref_1.isDbRefSchema({ $id: '' }));
        });
        it('fails not object schema', () => {
            assert(!ref_1.isDbRefSchema({ $id: '', title: '', type: 'string' }));
        });
        it('fails no properties', () => {
            assert(!ref_1.isDbRefSchema({ $id: '', title: '', type: 'object' }));
        });
        it('fails bad _id property', () => {
            const base = {
                $id: '',
                title: '',
                type: 'object'
            };
            const and = (value) => Object.assign(value, base);
            const _idNotObject = and({ properties: { _id: '' } });
            const _idTitleNotString = and({ properties: { _id: { title: 42 } } });
            const _idTypeNotString = and({ properties: { _id: { title: '', type: 'number' } } });
            const tests = [_idNotObject, _idTitleNotString, _idTypeNotString];
            tests.forEach(test => assert(!ref_1.isDbRefSchema(test)));
        });
        it('fails bad _collection property', () => {
            const base = {
                $id: '',
                title: '',
                type: 'object',
                properties: {
                    _id: {
                        title: '',
                        type: 'string'
                    }
                }
            };
            const and = (value) => {
                const newBase = util_1.clone(base);
                newBase.properties['_collection'] = value;
                return newBase;
            };
            const _collectionNotObject = and('');
            const _collectionTitleNotString = and({ title: 42 });
            const _collectionTypeNotString = and({ title: '', type: 'number' });
            const _collectionEnumNotArray = and({ title: '', type: 'string', enum: null });
            const _collectionEnumNotStringArray = and({ title: '', type: 'string', enum: [42] });
            const tests = [
                _collectionNotObject, _collectionTitleNotString,
                _collectionTypeNotString, _collectionEnumNotArray,
                _collectionEnumNotStringArray
            ];
            tests.forEach(test => assert(!ref_1.isDbRefSchema(test)));
        });
    });
    describe('predicates', () => {
        it('isPatternSchema', () => {
            const expect = {
                type: 'string',
                pattern: ''
            };
            assert(predicates_1.isPatternSchema(expect));
        });
        it('isPropertiesSchema', () => {
            const expect = {
                type: 'object',
                properties: {}
            };
            const failNotTypeObject = {
                type: 'string'
            };
            const failNotProperties = {
                type: 'object'
            };
            assert(predicates_1.isPropertiesSchema(expect));
            assert(!predicates_1.isPropertiesSchema(false));
            assert(!predicates_1.isPropertiesSchema(failNotTypeObject));
            assert(!predicates_1.isPropertiesSchema(failNotProperties));
        });
    });
});
//# sourceMappingURL=schema.js.map