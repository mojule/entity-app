import { createSequence, randId } from '@mojule/util'
import * as assert from 'assert'
import { createMemoryDb } from '../db/db-memory'
import { DbItem } from '../db/types'
import { EntityKeys } from '../entity/types'
import { createMemDb, createMemDbWithUser, testMemUser, MemUser, multipleUsers } from './fixtures/memory-db'

describe('memoryDb', () => {
  it('creates a db', async () => {
    const db = await createMemDb()

    assert(db)
    assert(db.collections)
    assert(db.collections.user)
    assert(db.collections.group)
  })

  // does nothing - should close make collections inaccessible? or...?
  it('closes', async () => {
    const db = await createMemDb()

    await db.close()
  })

  it('creates an entity', async () => {
    const { _id } = await createMemDbWithUser()

    assert(typeof _id === 'string' && _id.length)
  })

  it('loads an entity', async () => {
    const { db, _id } = await createMemDbWithUser()

    const user = await db.collections.user.load(_id)

    const expect = Object.assign({}, testMemUser, { _id })

    assert.deepStrictEqual(user, expect)
  })

  it('saves an entity', async () => {
    const { db, _id } = await createMemDbWithUser()

    const patchUser: Partial<MemUser> & DbItem = { _id, group: 'Bloopers' }

    await db.collections.user.save(patchUser)

    const user = await db.collections.user.load(_id)

    const expect = Object.assign({}, testMemUser, patchUser)

    assert.deepStrictEqual(user, expect)
  })

  it('does not save entity with no _id', async () => {
    const db = await createMemDb()

    const patchUser: any = testMemUser

    await assert.rejects(
      () => db.collections.user.save(patchUser),
      { message: 'Expected document to have _id:string' }
    )
  })

  it('removes an entity', async () => {
    const { db, _id } = await createMemDbWithUser()

    await db.collections.user.remove(_id)

    await assert.rejects(
      () => db.collections.user.load(_id),
      { message: `Expected entity for ${_id}` }
    )
  })

  it('rejects remove with bad _id', async () => {
    const db = await createMemDb()
    const _id = 'xxx'

    await assert.rejects(
      () => db.collections.user.remove(_id),
      { message: `Expected entity for ${_id}` }
    )
  })

  it('gets ids', async () => {
    const { db, _id } = await createMemDbWithUser()

    const ids = await db.collections.user.ids()

    assert.deepStrictEqual(ids, [_id])

    const _id2 = await db.collections.user.create(
      { name: 'Bob', group: 'Bobs' }
    )

    const ids2 = await db.collections.user.ids()

    assert.deepStrictEqual(ids2, [_id, _id2])
  })

  it('creates many', async () => {
    const db = await createMemDb()

    const users: MemUser[] = [
      testMemUser,
      { name: 'Bob', group: 'Bobs' }
    ]

    const _ids = await db.collections.user.createMany(users)

    assert(Array.isArray(_ids))
    assert.strictEqual(_ids.length, 2)
  })

  it('loads many', async () => {
    const db = await createMemDb()

    const users: MemUser[] = [
      testMemUser,
      { name: 'Bob', group: 'Bobs' }
    ]

    const _ids = await db.collections.user.createMany(users)

    const dbUsers = await db.collections.user.loadMany(_ids)

    const expectUsers = users.map(
      (u, i) => Object.assign({}, u, { _id: _ids[i] })
    )

    assert.deepStrictEqual(dbUsers, expectUsers)
  })

  it('saves many', async () => {
    const db = await createMemDb()

    const users: MemUser[] = [
      testMemUser,
      { name: 'Bob', group: 'Bobs' }
    ]

    const _ids = await db.collections.user.createMany(users)

    const patchUsers = [
      { _id: _ids[0], name: 'Nicholas' },
      { _id: _ids[1], group: 'Boogers' }
    ]

    await db.collections.user.saveMany(patchUsers)

    const dbUsers = await db.collections.user.loadMany(_ids)

    const expect = [
      { _id: _ids[0], name: 'Nicholas', group: testMemUser.group },
      { _id: _ids[1], name: 'Bob', group: 'Boogers' }
    ]

    assert.deepStrictEqual(dbUsers, expect)
  })

  it('loads paged', async () => {
    const db = await createMemDb()

    const users = createSequence(
      10,
      i => ({ name: `User ${i}`, group: `Group ${i}` })
    )

    const _ids = await db.collections.user.createMany(users)

    // defaults to zero
    const page0 = await db.collections.user.loadPaged(5 )
    
    const page1 = await db.collections.user.loadPaged(5, 1)

    for (let i = 0; i < 5; i++) {
      const user0 = page0[i]

      assert.strictEqual(user0.name, `User ${i}`)
      assert.strictEqual(_ids.indexOf(user0._id), i)

      const user1 = page1[i]

      assert.strictEqual(user1.name, `User ${i + 5}`)
      assert.strictEqual(_ids.indexOf(user1._id), i + 5)
    }

    // partial

    const partial = await db.collections.user.loadPaged(4, 2)

    assert.strictEqual(partial.length, 2)
  })

  it('find', async () => {
    const db = await createMemDb()

    await db.collections.user.createMany( multipleUsers )

    const goobers = await db.collections.user.find({ group: 'Goobers' })

    assert.strictEqual(goobers.length, 3)
    assert(goobers.every(g => g.group === 'Goobers'))

    const bobs = await db.collections.user.find({ group: 'Bobs' })

    assert.strictEqual(bobs.length, 1)
    assert(bobs.every(g => g.group === 'Bobs'))

    const boogers = await db.collections.user.find({ group: 'Boogers' })

    assert.strictEqual(boogers.length, 6)
    assert(boogers.every(g => g.group === 'Boogers'))
  })

  it('find one', async () => {
    const db = await createMemDb()

    const users = createSequence(
      10,
      i => (
        {
          name: `User ${i}`,
          group: i < 3 ? 'Goobers' : i === 3 ? 'Bobs' : 'Boogers'
        }
      )
    )

    await db.collections.user.createMany(users)

    const bob = await db.collections.user.findOne({ group: 'Bobs' })
    const nope = await db.collections.user.findOne({ group: 'Nopes' })

    assert(bob)
    assert.strictEqual(bob?.group, 'Bobs')
    assert(nope === undefined)
  })

  it('drops db', async () => {
    const { db } = await createMemDbWithUser()

    await db.drop()

    const ids = await db.collections.user.ids()

    assert.strictEqual(ids.length, 0)
  })

  it( 'creates db with extended metadata', async () => {
    type EntityMap = {
      foo: { name: string }
    }

    const keys: EntityKeys<EntityMap> = { foo: 'foo' }

    const memDb = await createMemoryDb( '', keys, () => ({ _id: randId(), _ctime: Date.now() }) )

    const fooId = await memDb.collections.foo.create({ name: 'Foo' })

    const foo = await memDb.collections.foo.load( fooId )

    assert.strictEqual( foo.name, 'Foo' )
    assert.strictEqual( typeof foo._ctime, 'number' )
  })
})
