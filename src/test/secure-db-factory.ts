import * as assert from 'assert'
import { createMemoryDb } from '..'
import { secureDbFactory } from '../db/proxies/secure'
import { createSecureDbItem } from '../db/proxies/secure/secure-db-item'
import { LoginUser } from '../db/proxies/secure/types'
import { createSecureMemDbLogin, entityKeys, getRootUser } from './fixtures/secure-db'

describe('secure db', () => {
  describe('secureDbFactory', () => {
    it('creates a secure db login', async () => {
      const { login } = await createSecureMemDbLogin()

      assert.strictEqual(typeof login, 'function')
    })

    it('initializes new root user', async () => {
      const { login, memDb } = await createSecureMemDbLogin()

      const root = getRootUser()
      const db = await login(root)

      const { name } = root

      const dbRootUser = await memDb.collections.user.findOne({ name })

      assert(db)
      assert(db.collections)
      assert(dbRootUser)

      const rootOwnerId = dbRootUser._owner._id
      const rootGroupId = dbRootUser._group._id

      assert.strictEqual(rootOwnerId, dbRootUser._id)
      assert.strictEqual(dbRootUser._mode, 0o0770)

      const rootGroup = await memDb.collections.group.load(rootGroupId)

      assert(rootGroup)

      assert.strictEqual(rootGroup.name, 'root')
      assert.strictEqual(rootGroup._owner._id, dbRootUser._id)
      assert.strictEqual(rootGroup._group._id, rootGroupId)
      assert.strictEqual(rootGroup._mode, 0o0770)
      assert.deepStrictEqual(
        rootGroup.users,
        [{ _id: dbRootUser._id, _collection: 'user' }]
      )

      const usersGroup = await memDb.collections.group.findOne(
        { name: 'users' }
      )

      assert(usersGroup)

      const nobodyGroup = await memDb.collections.group.findOne(
        { name: 'nobody' }
      )

      assert(nobodyGroup)
    })

    it('rejects non root user', async () => {
      const memDb = await createMemoryDb(
        '', entityKeys, createSecureDbItem
      )

      const login0 = await secureDbFactory(memDb, getRootUser())

      const db = await login0(getRootUser())

      const bob: LoginUser = { name: 'Bob', password: 'Boogers' }

      await db.createUser(bob)

      await assert.rejects(
        async () => await secureDbFactory(memDb, bob)
      )
    })


    it('rejects bad root user', async () => {
      const memDb = await createMemoryDb(
        '', entityKeys, createSecureDbItem
      )

      const root = getRootUser()
      const { name } = root

      await secureDbFactory(memDb, root)

      await assert.rejects(
        async () => await secureDbFactory(memDb, { name, password: '' })
      )
    })
  })
})