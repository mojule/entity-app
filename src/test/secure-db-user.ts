import * as assert from 'assert'
import { LoginUser } from '../db/proxies/secure/types'
import { hashPassword } from '../db/proxies/secure/user'

import { 
  createSecureMemDbLogin, getLoginBob, getRootUser 
} from './fixtures/secure-db'

describe('secure db', () => {
  describe('db', () => {
    describe('user', () => {
      describe('createUser', () => {
        it('root succeeds', async () => {
          const { login, memDb } = await createSecureMemDbLogin()

          const root = getRootUser()
          const { name: rootName } = root
          const db = await login(root)

          const loginBob = getLoginBob()

          await db.createUser(loginBob)

          const dbBob = await memDb.collections.user.findOne({ name: 'Bob' })
          const dbRoot = await memDb.collections.user.findOne({ name: rootName })

          assert(dbBob)
          assert(dbRoot)

          assert.strictEqual(dbBob._mode, 0o0770)
          assert.strictEqual(dbBob._owner._id, dbRoot._id)

          const dbBobGroup = await memDb.collections.group.load(dbBob._group._id)

          assert.strictEqual(dbBobGroup.name, 'users')
        })

        it('root creates another root', async () => {
          const { login, memDb } = await createSecureMemDbLogin()

          const root = getRootUser()
          const { name: rootName } = root
          const db = await login(root)

          const loginBob = getLoginBob()

          await db.createUser(loginBob, true)

          const dbBob = await memDb.collections.user.findOne({ name: 'Bob' })
          const dbRoot = await memDb.collections.user.findOne({ name: rootName })

          assert(dbBob)
          assert(dbBob.isRoot)
          assert(dbRoot)

          assert.strictEqual(dbBob._mode, 0o0770)
          assert.strictEqual(dbBob._owner._id, dbRoot._id)

          const dbBobGroup = await memDb.collections.group.load(dbBob._group._id)

          assert.strictEqual(dbBobGroup.name, 'root')
        })

        it('fails', async () => {
          const { login } = await createSecureMemDbLogin()

          const root = getRootUser()

          const rootDb = await login(root)

          const loginBob = getLoginBob()

          await rootDb.createUser(loginBob)

          const bobDb = await login(loginBob)

          await assert.rejects(
            async () => await bobDb.createUser({ name: 'Kate', password: 'Kittens' })
          )
        })
      })

      describe('removeUser', () => {
        it('succeeds', async () => {
          const { login } = await createSecureMemDbLogin()

          const root = getRootUser()

          const db = await login(root)

          const loginBob = getLoginBob()

          await db.createUser(loginBob)

          let usernames = await db.userNames()

          assert.deepStrictEqual(usernames, [root.name, 'nobody', loginBob.name])

          await db.removeUser('Bob')

          usernames = await db.userNames()

          assert.deepStrictEqual(usernames, [root.name, 'nobody'])
        })

        it('fails perm', async () => {
          const { login } = await createSecureMemDbLogin()

          const root = getRootUser()

          const rootDb = await login(root)

          const loginBob = getLoginBob()

          await rootDb.createUser(loginBob)

          const bobDb = await login(loginBob)

          await assert.rejects(
            async () => await bobDb.removeUser(root.name)
          )
        })

        it('fails bad name', async () => {
          const { login } = await createSecureMemDbLogin()

          const root = getRootUser()

          const db = await login(root)

          await assert.rejects(
            async () => await db.removeUser('Bob')
          )
        })
      })

      describe('setPassword', () => {
        it('util hashPassword does not alter non-user', async () => {
          const obj = { a: 'b' }

          const after = await hashPassword(obj)

          assert.strictEqual(after, obj)
        })

        it('succeeds', async () => {
          const { login } = await createSecureMemDbLogin()

          const root = getRootUser()

          const rootDb = await login(root)

          const loginBob = getLoginBob()

          await rootDb.createUser(loginBob)

          await assert.doesNotReject(async () => {
            await login(loginBob)
          })

          const newLoginBob: LoginUser = { name: 'Bob', password: 'Cooties' }

          await rootDb.setPassword(newLoginBob)

          await assert.doesNotReject(async () => {
            await login(newLoginBob)
          })

          await assert.rejects(async () => {
            await login(loginBob)
          })
        })

        it('fails', async () => {
          const { login } = await createSecureMemDbLogin()

          const root = getRootUser()

          const rootDb = await login(root)

          const loginBob = getLoginBob()

          await rootDb.createUser(loginBob)

          const bobDb = await login(loginBob)

          await assert.rejects(async () => await bobDb.setPassword(root))
        })

        it('fails bad user', async () => {
          const { login } = await createSecureMemDbLogin()

          const root = getRootUser()

          const rootDb = await login(root)

          const loginBob = getLoginBob()

          await assert.rejects(async () => {
            await rootDb.setPassword(loginBob)
          })
        })
      })

      describe('userNames', () => {
        it('succeeds', async () => {
          const { login } = await createSecureMemDbLogin()

          const root = getRootUser()

          const db = await login(root)

          const loginBob = getLoginBob()

          await db.createUser(loginBob)

          const usernames = await db.userNames()

          assert.deepStrictEqual(usernames, [root.name, 'nobody', loginBob.name])
        })

        it('fails', async () => {
          const { login } = await createSecureMemDbLogin()

          const root = getRootUser()

          const rootDb = await login(root)

          const loginBob = getLoginBob()

          await rootDb.createUser(loginBob)

          const bobDb = await login(loginBob)

          await assert.rejects(async () => await bobDb.userNames())
        })
      })
    })
  })
})
