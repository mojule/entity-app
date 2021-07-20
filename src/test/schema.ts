import { get } from '@mojule/json-pointer'
import { clone } from '@mojule/util'
import * as assert from 'assert'
import { schemaResolver } from '..'
import { isPatternSchema, isPropertiesSchema } from '../schema/predicates'
import { isDbRefSchema, refFactory } from '../schema/ref'
import { dbRefResolver } from '../schema/resolve/db-ref-resolver'
import { refResolver } from '../schema/resolve/ref-resolver'
import { EntitySchemaMap, IdSchema, SchemaMap } from '../schema/types'
import { createRefDb, RefDbBar, RefDbBaz, RefDbEntityMap, RefDbFoo, RefDbQux } from './fixtures/ref-db'
import { testSchemaDbMap, testSchemaMap } from './fixtures/schema'

describe('schema', () => {
  describe('refResolver', () => {
    it('resolves', () => {
      const schema = refResolver(testSchemaMap, 'baz')

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
      }

      assert.deepStrictEqual(schema, expect)
    })

    it('fails on missing $id', () => {
      const schemaMap = Object.assign(
        {},
        testSchemaMap,
        {
          bad: {
            $id: '#/bad',
            type: 'object',
            properties: {
              whack: { $ref: '#/whack' }
            }
          }
        } as SchemaMap
      )

      assert.throws(
        () => refResolver(schemaMap, 'bad'),
        { message: `Expected a schema for #/whack` }
      )
    })
  })

  describe('schemaResolver', () => {
    it('resolves', async () => {
      const db = await createRefDb()

      const foo0: RefDbFoo = {
        name: 'f0'
      }

      const baz0: RefDbBaz = {
        name: 'bz0',
        quxes: []
      }

      await db.collections.foo.create(foo0)
      const baz0Id = await db.collections.baz.create(baz0)

      const bar0: RefDbBar = {
        name: 'ba0',
        baz: { _collection: 'baz', _id: baz0Id }
      }

      const bar1: RefDbBar = {
        baz: { _collection: 'baz', _id: baz0Id }
      }

      const bar0Id = await db.collections.bar.create(bar0)
      const bar1Id = await db.collections.bar.create(bar1)

      const resolvedFoo = await schemaResolver(
        db, 'foo', testSchemaDbMap
      )

      const barEnum = get(resolvedFoo, '/properties/bar/properties/_id/enum')

      assert(Array.isArray(barEnum))
      assert.deepStrictEqual(barEnum, [bar0Id, bar1Id])

      const barEnumTiles = get(resolvedFoo, '/properties/bar/properties/_id/_enumTitles')

      assert(Array.isArray(barEnumTiles))
      assert.deepStrictEqual(barEnumTiles, [bar0.name, 'bar 2'])
    })

    it('fails on bad collection', async () => {
      const db = await createRefDb()

      const foo0: RefDbFoo = {
        name: 'f0'
      }

      const baz0: RefDbBaz = {
        name: 'bz0',
        quxes: []
      }

      await db.collections.foo.create(foo0)
      const baz0Id = await db.collections.baz.create(baz0)

      const bar0: RefDbBar = {
        name: 'ba0',
        baz: { _collection: 'baz', _id: baz0Id }
      }

      const bar1: RefDbBar = {
        baz: { _collection: 'baz', _id: baz0Id }
      }

      await db.collections.bar.create(bar0)
      await db.collections.bar.create(bar1)

      db.collections = {} as any

      assert.rejects(
        () => schemaResolver(db, 'foo', testSchemaDbMap),
        `Expected bar in db.collections`
      )
    })
  })

  describe('refFactory', () => {
    it('creates a refFactory', () => {
      const create = refFactory('#')

      assert.strictEqual(typeof create, 'function')
    })

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
      }

      const create = refFactory('#/')
      const ref = create('test')

      assert.deepStrictEqual(ref, expect)
    })
  })

  describe('isDbRefSchema', () => {
    it('fails not object', () => {
      assert(!isDbRefSchema(''))
    })

    it('fails no $id', () => {
      assert(!isDbRefSchema({}))
    })

    it('fails no title', () => {
      assert(!isDbRefSchema({ $id: '' }))
    })

    it('fails not object schema', () => {
      assert(!isDbRefSchema({ $id: '', title: '', type: 'string' }))
    })

    it('fails no properties', () => {
      assert(!isDbRefSchema({ $id: '', title: '', type: 'object' }))
    })

    it('fails bad _id property', () => {
      const base = {
        $id: '',
        title: '',
        type: 'object'
      }

      const and = (value: any) => Object.assign(value, base)

      const _idNotObject = and({ properties: { _id: '' } })
      const _idTitleNotString = and({ properties: { _id: { title: 42 } } })
      const _idTypeNotString = and({ properties: { _id: { title: '', type: 'number' } } })

      const tests = [_idNotObject, _idTitleNotString, _idTypeNotString]

      tests.forEach(test => assert(!isDbRefSchema(test)))
    })

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
      }

      const and = (value: any) => {
        const newBase = clone(base)

        newBase.properties['_collection'] = value

        return newBase
      }

      const _collectionNotObject = and('')
      const _collectionTitleNotString = and({ title: 42 })
      const _collectionTypeNotString = and({ title: '', type: 'number' })

      const _collectionEnumNotArray = and(
        { title: '', type: 'string', enum: null }
      )

      const _collectionEnumNotStringArray = and(
        { title: '', type: 'string', enum: [ 42 ] }
      )

      const tests = [
        _collectionNotObject, _collectionTitleNotString,
        _collectionTypeNotString, _collectionEnumNotArray,
        _collectionEnumNotStringArray
      ]

      tests.forEach(test => assert(!isDbRefSchema(test)))
    })
  })

  describe( 'predicates', () => {
    it( 'isPatternSchema', () => {
      const expect = {
        type: 'string',
        pattern: ''
      } as const

      assert( isPatternSchema( expect ) )
    })

    it( 'isPropertiesSchema', () => {
      const expect = {
        type: 'object',
        properties: {}
      } as const

      const failNotTypeObject = {
        type: 'string'
      } as const

      const failNotProperties = {
        type: 'object'
      } as const

      assert( isPropertiesSchema( expect ) )

      assert( !isPropertiesSchema( false ))
      assert( !isPropertiesSchema( failNotTypeObject ))
      assert( !isPropertiesSchema( failNotProperties ))
    })
  })
})
