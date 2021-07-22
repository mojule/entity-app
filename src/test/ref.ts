import { clone } from '@mojule/util'
import * as assert from 'assert'
import { isRef, isRefArray } from '../'
import { resolveRef, resolveRefArray, resolveRefsDeep, resolveRefsShallow } from '../db/ref'
import { DbRef, DbRefFor } from '../db/types'
import { createMemDb, MemEntityMap, MemUser } from './fixtures/memory-db'
import { createRefDb, RefDbBaz, RefDbEntityMap, RefDbFoo, RefDbModelMap, RefDbQux } from './fixtures/ref-db'

describe('ref', () => {
  it('isRef', () => {
    const expect = {
      _id: '',
      _collection: ''
    }

    assert(!isRef(null))
    assert(!isRef({ _id: '' }))
    assert(!isRef({ _collection: '' }))
    assert(isRef(expect))
  })

  it('isRefArray', () => {
    const expect = {
      _id: '',
      _collection: ''
    }

    assert(!isRefArray([null]))
    assert(!isRefArray(null as any))
    assert(!isRefArray([expect, null]))
    assert(isRefArray([expect, expect]))
  })

  it('resolveRef', async () => {
    const db = await createMemDb()

    const entity: MemUser = { name: 'Nik', group: 'People' }

    const _id = await db.collections.user.create(clone(entity))

    const ref: DbRefFor<MemEntityMap, 'user'> = {
      _collection: 'user',
      _id
    }

    const dbItem = await resolveRef(db, ref)

    assert.strictEqual(dbItem.name, entity.name)
    assert.strictEqual(dbItem.group, entity.group)
  })

  it('resolveRefArray', async () => {
    const db = await createMemDb()

    const entities: MemUser[] = [
      { name: 'Nik', group: 'People' },
      { name: 'Kate', group: 'People' }
    ]

    const _ids = await db.collections.user.createMany(clone(entities))

    const refs: DbRefFor<MemEntityMap, 'user'>[] = _ids.map(
      _id => ({ _collection: 'user', _id })
    )

    const dbItems = await resolveRefArray(db, refs)

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i]
      const dbItem = dbItems[i]

      assert.strictEqual(dbItem._id, _ids[i])
      assert.strictEqual(dbItem.name, entity.name)
      assert.strictEqual(dbItem.group, entity.group)
    }

    const empty = await resolveRefArray(db, [])

    assert.strictEqual(empty.length, 0)
  })

  it('resolveRefsShallow', async () => {
    const db = await createRefDb()

    const foo0: RefDbFoo = {
      name: 'f0'
    }

    const baz0: RefDbBaz = {
      name: 'bz0',
      quxes: []
    }

    const qux0: RefDbQux = {
      name: 'q0'
    }

    const qux1: RefDbQux = {
      name: 'q1'
    }

    const foo0Id = await db.collections.foo.create(foo0)

    qux0.foo = { _collection: 'foo', _id: foo0Id }

    const qux0Id = await db.collections.qux.create(qux0)
    const qux1Id = await db.collections.qux.create(qux1)

    baz0.quxes.push(
      { _collection: 'qux', _id: qux0Id },
      { _collection: 'qux', _id: qux1Id }
    )

    const shallow = await resolveRefsShallow<RefDbModelMap, RefDbEntityMap, 'qux'>(
      db, qux0
    )

    assert.deepStrictEqual(
      shallow,
      { name: 'q0', foo: { _id: foo0Id, name: 'f0' } }
    )

    const shallowArray = await resolveRefsShallow<RefDbModelMap, RefDbEntityMap, 'baz'>(
      db, baz0
    )

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
    }

    assert.deepStrictEqual(
      shallowArray, expectArray
    )
  })

  it( 'resolveRefsDeep', async () => {
    const db = await createRefDb()

    const foo0: RefDbFoo = {
      name: 'f0'
    }

    const baz0: RefDbBaz = {
      name: 'bz0',
      quxes: []
    }

    const qux0: RefDbQux = {
      name: 'q0'
    }

    const qux1: RefDbQux = {
      name: 'q1'
    }

    const foo0Id = await db.collections.foo.create(foo0)

    qux0.foo = { _collection: 'foo', _id: foo0Id }

    const qux0Id = await db.collections.qux.create(qux0)
    const qux1Id = await db.collections.qux.create(qux1)

    baz0.quxes.push(
      { _collection: 'qux', _id: qux0Id },
      { _collection: 'qux', _id: qux1Id }
    )

    const deep = await resolveRefsDeep<RefDbModelMap, RefDbEntityMap, 'baz'>(
      db, baz0
    )

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
    }

    assert.deepStrictEqual(
      deep, expectDeep
    )

    // make a circular ref

    foo0.qux = { _collection: 'qux', _id: qux0Id }

    await db.collections.foo.save( Object.assign( foo0, { _id: foo0Id } ) )

    await assert.rejects(
      async () => await resolveRefsDeep<RefDbModelMap,RefDbEntityMap,'foo'>( db, foo0 ),
      { message: 'Exceeded depth limit'}
    )
  })
})