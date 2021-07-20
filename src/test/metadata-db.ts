import { delayPromise } from '@mojule/util'
import * as assert from 'assert'
import { MetadataDbItem } from '../db/proxies/metadata/types'
import { createDisorderedDb, createMetadataDb } from './fixtures/metadata-db'

describe('metadata db', () => {
  const assertCreate = (
    item: MetadataDbItem, before: number
  ) => {
    assert.strictEqual(item._ver, 0)
    assert(item._atime > before)
    assert(item._ctime > before)
    assert(item._mtime > before)
  }

  const assertAccess = (
    old: MetadataDbItem, current: MetadataDbItem
  ) => {
    assert.strictEqual(old._id, current._id)
    assert.strictEqual(old._ver, current._ver)
    assert.strictEqual(old._ctime, current._ctime)
    assert.strictEqual(old._mtime, current._mtime)
    assert(current._atime > old._atime)
  }

  const assertModify = (
    old: MetadataDbItem, current: MetadataDbItem
  ) => {
    assert.strictEqual(old._id, current._id)
    assert.strictEqual(old._ctime, current._ctime)
    assert(current._ver > old._ver)
    assert(current._mtime > old._mtime)
  }

  describe('create', () => {
    it('create', async () => {
      const db = await createMetadataDb()

      const before = Date.now()

      await delayPromise(5)

      const _id = await db.collections.publicThing.create(
        { name: 'thing', value: 42 }
      )

      const item = await db.collections.publicThing.load(_id)

      assertCreate(item, before)
    })

    it('createMany', async () => {
      const db = await createMetadataDb()

      const before = Date.now()

      await delayPromise(5)

      const _ids = await db.collections.publicThing.createMany(
        [
          { name: 'thing', value: 42 },
          { name: 'other', value: 69 }
        ]
      )

      const items = await db.collections.publicThing.loadMany(_ids)

      for (const item of items) {
        assertCreate(item, before)
      }
    })
  })

  describe('modify', () => {
    it('save', async () => {
      const db = await createMetadataDb()

      const _id = await db.collections.publicThing.create(
        { name: 'thing', value: 42 }
      )

      const old = await db.collections.publicThing.load(_id)

      await delayPromise(5)

      await db.collections.publicThing.save({ _id })

      const current = await db.collections.publicThing.load(_id)

      assertModify(old, current)
    })

    it('saveMany', async () => {
      const db = await createMetadataDb()

      const _ids = await db.collections.publicThing.createMany(
        [
          { name: 'thing', value: 42 },
          { name: 'other', value: 69 }
        ]
      )

      const saveIds = _ids.map(_id => ({ _id }))

      const oldItems = await db.collections.publicThing.loadMany(_ids)

      await delayPromise(5)

      await db.collections.publicThing.saveMany(saveIds)

      const currentItems = await db.collections.publicThing.loadMany(_ids)

      assert.strictEqual(oldItems.length, currentItems.length)

      for (let i = 0; i < oldItems.length; i++) {
        assertModify(oldItems[i], currentItems[i])
      }
    })

    it( 'saveMany expected ordered result', async () => {
      const db = await createDisorderedDb()

      const _ids = await db.collections.publicThing.createMany(
        [
          { name: 'thing', value: 42 },
          { name: 'other', value: 69 }
        ]
      )

      const saveIds = _ids.map(_id => ({ _id }))

      assert.rejects(
        db.collections.publicThing.saveMany( saveIds )
      )
    })
  })

  describe('access', () => {
    it('load', async () => {
      const db = await createMetadataDb()

      const _id = await db.collections.publicThing.create(
        { name: 'thing', value: 42 }
      )

      const old = await db.collections.publicThing.load(_id)

      await delayPromise(5)

      const current = await db.collections.publicThing.load(_id)

      assertAccess(old, current)
    })

    it('loadMany', async () => {
      const db = await createMetadataDb()

      const _ids = await db.collections.publicThing.createMany(
        [
          { name: 'thing', value: 42 },
          { name: 'other', value: 69 }
        ]
      )

      const oldThings = await db.collections.publicThing.loadMany(_ids)

      await delayPromise(5)

      const currentThings = await db.collections.publicThing.loadMany(_ids)

      assert.strictEqual(oldThings.length, 2)
      assert.strictEqual(currentThings.length, 2)

      for (let i = 0; i < oldThings.length; i++) {
        assertAccess(oldThings[i], currentThings[i])
      }
    })

    it('find', async () => {
      const db = await createMetadataDb()

      await db.collections.publicThing.createMany(
        [
          { name: 'thing', value: 42 },
          { name: 'other', value: 69 }
        ]
      )

      const oldThings = await db.collections.publicThing.find({ value: { $gt: 0 } })

      await delayPromise(5)

      const currentThings = await db.collections.publicThing.find({ value: { $gt: 0 } })

      assert.strictEqual(oldThings.length, 2)
      assert.strictEqual(currentThings.length, 2)

      for (let i = 0; i < oldThings.length; i++) {
        assertAccess(oldThings[i], currentThings[i])
      }
    })

    it('findOne', async () => {
      const db = await createMetadataDb()

      const _id = await db.collections.publicThing.create(
        { name: 'thing', value: 42 }
      )

      const old = await db.collections.publicThing.findOne({ _id })

      await delayPromise(5)

      const current = await db.collections.publicThing.findOne({ _id })

      assert(old && current)

      assertAccess(old, current)
    })

    it( 'findOne with bad query', async () => {
      const db = await createMetadataDb()

      const none = await db.collections.publicThing.findOne({})

      assert( none === undefined )
    })

    it( 'loadPaged', async () => {
      const db = await createMetadataDb()

      await db.collections.publicThing.createMany(
        [
          { name: 'thing', value: 42 },
          { name: 'other', value: 69 }
        ]
      )

      const oldThings = await db.collections.publicThing.loadPaged( 2 )

      await delayPromise(5)

      const currentThings = await db.collections.publicThing.loadPaged( 2 )

      assert.strictEqual(oldThings.length, 2)
      assert.strictEqual(currentThings.length, 2)

      for (let i = 0; i < oldThings.length; i++) {
        assertAccess(oldThings[i], currentThings[i])
      }
    })
  })
})