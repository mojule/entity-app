import * as assert from 'assert'
import { createValidatedDb } from './fixtures/validator'

describe('db validator', () => {

  describe('create', () => {
    it('create', async () => {
      const { validatedDb } = await createValidatedDb(
        { onCreate: true, onLoad: false, onSave: false }
      )

      assert.doesNotReject(
        async () => await validatedDb.collections.a.create({ name: '' })
      )

      assert.rejects(
        async () => await validatedDb.collections.a.create({} as any)
      )
    })

    it('createMany', async () => {
      const { validatedDb } = await createValidatedDb(
        { onCreate: true, onLoad: false, onSave: false }
      )

      assert.doesNotReject(
        async () =>
          await validatedDb.collections.a.createMany(
            [{ name: 'a' }, { name: 'b' }]
          )
      )

      assert.rejects(
        async () => await validatedDb.collections.a.createMany(
          [{ name: 'a' }, {}] as any
        )
      )
    })
  })

  describe('modify', () => {
    it('save', async () => {
      const { validatedDb } = await createValidatedDb(
        { onCreate: true, onLoad: false, onSave: true }
      )

      const _id = await validatedDb.collections.a.create({ name: 'a' })

      assert.doesNotReject(
        async () => await validatedDb.collections.a.save({ _id, name: 'b' })
      )

      assert.rejects(
        async () => await validatedDb.collections.a.save({ _id, name: 42 } as any)
      )
    })

    it('saveMany', async () => {
      const { validatedDb } = await createValidatedDb(
        { onCreate: false, onLoad: false, onSave: true }
      )

      const _ids = await validatedDb.collections.a.createMany(
        [{ name: 'a' }, { name: 'b' }]
      )

      const saveOk = _ids.map(_id => ({ _id, name: _id }))
      const saveFail = _ids.map(_id => ({ _id, name: 42 }))

      assert.doesNotReject(
        async () => await validatedDb.collections.a.saveMany(
          saveOk
        )
      )

      assert.rejects(
        async () => await validatedDb.collections.a.createMany(
          saveFail as any
        )
      )
    })
  })

  describe('read', () => {
    it('load', async () => {
      const { validatedDb } = await createValidatedDb(
        { onCreate: false, onLoad: true, onSave: false }
      )

      const _id = await validatedDb.collections.a.create({ name: 'a' })
      const _failId = await validatedDb.collections.a.create({ name: 42 } as any)

      assert.doesNotReject(
        async () => await validatedDb.collections.a.load(_id)
      )

      assert.rejects(
        async () => await validatedDb.collections.a.load(_failId)
      )
    })

    it('loadMany', async () => {
      const { validatedDb } = await createValidatedDb(
        { onCreate: false, onLoad: true, onSave: false }
      )

      const _ids = await validatedDb.collections.a.createMany([{ name: 'a' }, { name: 'b' }])
      const _failIds = await validatedDb.collections.a.createMany([{ name: 'a' }, { name: 42 }] as any)

      assert.doesNotReject(
        async () => await validatedDb.collections.a.loadMany(_ids)
      )

      assert.rejects(
        async () => await validatedDb.collections.a.loadMany(_failIds)
      )
    })

    it('find succeeds', async () => {
      const { validatedDb } = await createValidatedDb(
        { onCreate: false, onLoad: true, onSave: false }
      )

      await validatedDb.collections.a.createMany([{ name: 'a' }, { name: 'b' }])

      assert.doesNotReject(
        async () => await validatedDb.collections.a.find({})
      )
    })

    it('find fails', async () => {
      const { validatedDb } = await createValidatedDb(
        { onCreate: false, onLoad: true, onSave: false }
      )

      await validatedDb.collections.a.createMany([{ name: 'a' }, { name: 42 }] as any)

      assert.rejects(
        async () => await validatedDb.collections.a.find({})
      )
    })

    it('findOne succeeds', async () => {
      const { validatedDb } = await createValidatedDb(
        { onCreate: false, onLoad: true, onSave: false }
      )

      await validatedDb.collections.a.createMany([{ name: 'a' }, { name: 'b' }])

      assert.doesNotReject(
        async () => {
          const result = await validatedDb.collections.a.findOne({ name: 'a' })

          if (result === undefined) throw Error('Expected a')

          const expectUndef = validatedDb.collections.a.findOne({ name: 'c' })

          if( expectUndef !== undefined ) throw Error( 'Expected undefined' )
        }
      )
    })

    it('findOne fails', async () => {
      const { validatedDb } = await createValidatedDb(
        { onCreate: false, onLoad: true, onSave: false }
      )

      await validatedDb.collections.a.createMany([{ name: 'a' }, { name: 42 }] as any)

      assert.rejects(
        async () => await validatedDb.collections.a.findOne({ name: 42 })
      )
    })

  })
})