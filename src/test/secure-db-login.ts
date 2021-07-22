import * as assert from 'assert'
import { createMemoryDb } from '..'
import { secureDbFactory } from '../db/proxies/secure'
import { createSecureDbItem } from '../db/proxies/secure/secure-db-item'
import { createSecureMemDbLogin, entityKeys, getRootUser } from './fixtures/secure-db'

describe('secure db', () => {
  describe('login', () => {
    it('logs in', async () => {
      const memDb = await createMemoryDb(
        '', entityKeys, createSecureDbItem
      )

      const root = getRootUser()

      const login = await secureDbFactory(
        memDb, root
      )

      await assert.doesNotReject(async () => await login(root))
    })

    it('logs in to initialized db', async () => {
      const memDb = await createMemoryDb(
        '', entityKeys, createSecureDbItem
      )

      const root = getRootUser()

      // this call will init rootUser
      await secureDbFactory(
        memDb, root
      )

      // this instance of db already contains rootUser
      const login1 = await secureDbFactory(
        memDb, getRootUser()
      )

      const bobDb = await login1(root)

      assert(bobDb)
      assert(bobDb.collections)
    })

    it('rejects unknown user', async () => {
      const { login } = await createSecureMemDbLogin()

      await assert.rejects(
        async () => {
          await login({ name: '', password: '' })
        }
      )
    })

    it('rejects bad user', async () => {
      const { login } = await createSecureMemDbLogin()
      const { name } = getRootUser()

      await assert.rejects(
        async () => await login({ name, password: '' })
      )
    })

    it('drops and closes when root', async () => {
      const memDb = await createMemoryDb(
        '', entityKeys, createSecureDbItem
      )

      const root = getRootUser()

      const login = await secureDbFactory(
        memDb, root
      )

      const db = await login(root)

      await assert.doesNotReject(async () => db.drop())
      await assert.doesNotReject(async () => db.close())
    })

    it('fails drop or close when not root', async () => {
      const memDb = await createMemoryDb(
        '', entityKeys, createSecureDbItem
      )

      const root = getRootUser()

      const login = await secureDbFactory(
        memDb, root
      )

      const rootDb = await login(root)

      await rootDb.createUser({ name: 'Bob', password: 'Boogers' })

      const bobDb = await login({ name: 'Bob', password: 'Boogers' })

      await assert.rejects(async () => bobDb.drop())
      await assert.rejects(async () => bobDb.close())
    })
  })
})
