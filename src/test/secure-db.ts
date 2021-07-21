import { parseSymbolicNotation } from '@mojule/mode'
import * as assert from 'assert'
import { createMemoryDb } from '..'
import { secureDbFactory } from '../db/proxies/secure'
import { createSecureDbItem } from '../db/proxies/secure/secure-db-item'
import { LoginUser } from '../db/proxies/secure/types'
import { hashPassword } from '../db/proxies/secure/user'
import { DbItem } from '../db/types'
import { PublicThing } from './fixtures/common'
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

  describe('db', () => {
    describe('access', () => {
      describe('chmod', () => {
        it('succeeds entity', async () => {
          const { login, memDb } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const thingId = await db.collections.publicThing.create(
            { name: 'foo', value: 42 }
          )

          const newMode = parseSymbolicNotation('rwxrwxrwx')

          await db.chmod(newMode, 'publicThing', thingId)

          const thing = await db.collections.publicThing.load(thingId)

          assert.strictEqual(thing._mode, newMode)
        })

        it('succeeds collection', async () => {
          const { login, memDb } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const newMode = parseSymbolicNotation('rwxrwxrwx')

          await db.chmod(newMode, 'publicThing')

          const thingData = await memDb.collections.collectionData.findOne(
            { name: 'publicThing' }
          )

          assert(thingData)
          assert.strictEqual(thingData!._mode, newMode)
        })

        it('succeeds owner', async () => {
          const { login, memDb } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const newMode = parseSymbolicNotation('rwxrwxrwx')

          await db.chmod(newMode, 'publicThing')

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          const bobDb = await login(loginBob)

          const dbBob = await memDb.collections.user.findOne({ name: 'Bob' })

          assert(dbBob)

          const bobThingId = await bobDb.collections.publicThing.create(
            { name: 'Bob Thing', value: 69 }
          )

          let bobThing = await bobDb.collections.publicThing.load(bobThingId)

          assert.strictEqual(bobThing._mode, 0o770)

          await bobDb.chmod(newMode, 'publicThing', bobThingId)

          bobThing = await bobDb.collections.publicThing.load(bobThingId)

          assert.strictEqual(bobThing._mode, newMode)
        })

        it('fails', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          const thingId = await db.collections.publicThing.create(
            { name: 'foo', value: 42 }
          )

          const bobDb = await login(loginBob)

          await assert.rejects(async () => {
            await bobDb.chmod(0o0666, 'publicThing')
          })

          await assert.rejects(async () => {
            await bobDb.chmod(0o0666, 'publicThing', thingId)
          })
        })

        it('fails on nonexistent collection', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const newMode = parseSymbolicNotation('rwxrwxrwx')

          assert.rejects(
            db.chmod(newMode, 'nothing' as any),
            {
              message: 'Expected collectionData for nothing'
            }
          )
        })
      })

      describe('chown', () => {
        it('succeeds entity', async () => {
          const { login, memDb } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const thingId = await db.collections.publicThing.create(
            { name: 'foo', value: 42 }
          )

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          await db.chown('Bob', 'publicThing', thingId)

          const thing = await memDb.collections.publicThing.load(thingId)
          const dbBob = await memDb.collections.user.findOne({ name: 'Bob' })

          assert(dbBob)
          assert.strictEqual(thing._owner._id, dbBob._id, 'bob owns thing')

          const bobDb = await login(loginBob)

          await bobDb.chmod(0o0777, 'publicThing', thingId)

          assert.strictEqual(thing._mode, 0o0777, 'bob chmod thing')
        })

        it('succeeds collection', async () => {
          const { login, memDb } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)
          await db.chown('Bob', 'publicThing')

          const dbBob = await memDb.collections.user.findOne({ name: 'Bob' })

          assert(dbBob)

          const bobDb = await login(loginBob)

          const thingId = await bobDb.collections.publicThing.create(
            { name: 'foo', value: 42 }
          )

          const thing = await bobDb.collections.publicThing.load(
            thingId
          )

          assert.strictEqual(thing._owner._id, dbBob._id, 'bob owns thing')
        })

        it('succeeds collection, chown after user login', async () => {
          const { login, memDb } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          const dbBob = await memDb.collections.user.findOne({ name: 'Bob' })

          assert(dbBob)

          const bobDb = await login(loginBob)

          await db.chown('Bob', 'publicThing')

          const thingId = await bobDb.collections.publicThing.create(
            { name: 'foo', value: 42 }
          )

          const thing = await bobDb.collections.publicThing.load(
            thingId
          )

          assert.strictEqual(thing._owner._id, dbBob._id, 'bob owns thing')
        })        

        it('fails', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)          

          const bobDb = await login(loginBob)          

          await assert.rejects( async () => {
            await bobDb.chown('Bob', 'publicThing')
          })  
        })

        it('fails user', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          await assert.rejects( async () => {
            await db.chown('Bob', 'publicThing')
          })          
        })
      })

      describe( 'chgrp', () => {
        it( 'succeeds collection', async () => {
          const { login, memDb } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          await db.chgrp( 'users', 'publicThing' )
          
          const dbBob = await memDb.collections.user.findOne({ name: 'Bob' })
          
          assert( dbBob )

          const bobDb = await login( loginBob )

          const thingId = await bobDb.collections.publicThing.create( 
            { name: 'foo', value: 42 } 
          )

          const thing = await bobDb.collections.publicThing.load(
            thingId
          )

          assert.strictEqual(thing._owner._id, dbBob._id, 'bob owns thing')
        })

        it( 'succeeds entity', async () => {
          const { login, memDb } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          const thingId = await db.collections.publicThing.create( 
            { name: 'foo', value: 42 } 
          )

          await db.chgrp( 'users', 'publicThing' )

          await db.chmod( parseSymbolicNotation( 'rwxr-----' ), 'publicThing' )

          await db.chgrp( 'users', 'publicThing', thingId )
          
          const dbBob = await memDb.collections.user.findOne({ name: 'Bob' })
          
          assert( dbBob )

          const bobDb = await login( loginBob )

          let thing: Partial<PublicThing> & DbItem

          await assert.doesNotReject( async () => {
            thing = await bobDb.collections.publicThing.load(
              thingId
            )  
          })          

          await assert.rejects( async () => {
            await bobDb.collections.publicThing.save(
              thing
            )  
          })

          await db.chmod( parseSymbolicNotation( 'rwxrw----' ), 'publicThing' )

          await assert.doesNotReject( async () => {
            await bobDb.collections.publicThing.save(
              thing
            )  
          })
        })

        it( 'succeeds group owner', async () => {
          const { login, memDb } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          const thingId = await db.collections.publicThing.create( 
            { name: 'foo', value: 42 } 
          )

          await db.createGroup( 'bobs' )
          await db.chgrp( 'users', 'publicThing' )
          await db.chgrp( 'users', 'publicThing', thingId )
          await db.chown( 'Bob', 'publicThing', thingId )
          await db.addUserToGroups( 'Bob', 'bobs' )
          
          const dbBob = await memDb.collections.user.findOne({ name: 'Bob' })
          
          assert( dbBob )

          const bobDb = await login( loginBob )

          await bobDb.chgrp( 'bobs', 'publicThing', thingId )

          const thing = await memDb.collections.publicThing.load( thingId )

          const dbBobs = await memDb.collections.group.findOne({ name: 'bobs' })

          assert( dbBobs )

          assert.strictEqual( thing._group._id, dbBobs._id )
        })

        it( 'fails perm', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          const thingId = await db.collections.publicThing.create( 
            { name: 'foo', value: 42 } 
          )

          const bobDb = await login( loginBob )

          await assert.rejects( async () => {
            await bobDb.chgrp( 'users', 'publicThing', thingId )
          })
        })

        it( 'fails group', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          await assert.rejects( async () => {
            await db.chgrp( 'bobs', 'publicThing' )
          })
        })
      })
    })

    describe('user', () => {
      describe('createUser', () => {
        it('root succeeds', async () => {
          const { login, memDb } = await createSecureMemDbLogin()

          const root = getRootUser()
          const { name: rootName } = root
          const db = await login(root)

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

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

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

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

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

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

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          let usernames = await db.userNames()

          assert.deepStrictEqual(usernames, [root.name, loginBob.name])

          await db.removeUser('Bob')

          usernames = await db.userNames()

          assert.deepStrictEqual(usernames, [root.name])
        })

        it('fails perm', async () => {
          const { login } = await createSecureMemDbLogin()

          const root = getRootUser()

          const rootDb = await login(root)

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

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

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

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

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await rootDb.createUser(loginBob)

          const bobDb = await login(loginBob)

          await assert.rejects(async () => await bobDb.setPassword(root))
        })

        it('fails bad user', async () => {
          const { login } = await createSecureMemDbLogin()

          const root = getRootUser()

          const rootDb = await login(root)

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

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

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          const usernames = await db.userNames()

          assert.deepStrictEqual(usernames, [root.name, loginBob.name])
        })

        it('fails', async () => {
          const { login } = await createSecureMemDbLogin()

          const root = getRootUser()

          const rootDb = await login(root)

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await rootDb.createUser(loginBob)

          const bobDb = await login(loginBob)

          await assert.rejects(async () => await bobDb.userNames())
        })
      })
    })

    describe('group', () => {
      describe('groupNames', () => {
        it('succeeds', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const groupNames = await db.groupNames()

          assert.deepStrictEqual(groupNames, ['root', 'users', 'nobody'])
        })

        it('fails', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          const bobDb = await login(loginBob)

          await assert.rejects(async () => {
            await bobDb.groupNames()
          })
        })
      })

      describe('createGroup', async () => {
        it('succeeds', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          await db.createGroup('bobs')

          const groupNames = await db.groupNames()

          assert.deepStrictEqual(groupNames, ['root', 'users', 'nobody', 'bobs'])
        })

        it('fails', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          const bobDb = await login(loginBob)

          await assert.rejects(async () => {
            await bobDb.createGroup('bobs')
          })
        })
      })

      describe('removeGroup', async () => {
        it('succeeds', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          await db.createGroup('bobs')

          let groupNames = await db.groupNames()

          assert.deepStrictEqual(groupNames, ['root', 'users', 'nobody', 'bobs'])

          await db.removeGroup('bobs')

          groupNames = await db.groupNames()

          assert.deepStrictEqual(groupNames, ['root', 'users', 'nobody'])
        })

        it('fails', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          await db.createGroup('bobs')

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          const bobDb = await login(loginBob)

          await assert.rejects(async () => {
            await bobDb.removeGroup('bobs')
          })
        })

        it('fails no group', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          await assert.rejects(async () => {
            await db.removeGroup('bobs')
          })
        })
      })

      describe('setUserPrimaryGroup', () => {
        it('succeeds', async () => {
          const { login, memDb } = await createSecureMemDbLogin()

          const root = getRootUser()
          const db = await login(root)

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)
          await db.createGroup('bobs')

          await db.setUserPrimaryGroup('Bob', 'bobs')

          const dbBob = await memDb.collections.user.findOne({ name: 'Bob' })
          const bobsGroup = await memDb.collections.group.findOne({ name: 'bobs' })

          assert(dbBob)
          assert(bobsGroup)

          assert.strictEqual(dbBob._group._id, bobsGroup._id)
        })

        it('fails', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          await db.createGroup('bobs')

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          const bobDb = await login(loginBob)

          await assert.rejects(async () => {
            await bobDb.setUserPrimaryGroup('Bob', 'bobs')
          })
        })

        it('fails user', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          await db.createGroup('bobs')

          await assert.rejects(async () => {
            await db.setUserPrimaryGroup('Bob', 'bobs')
          })
        })

        it('fails group', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          await assert.rejects(async () => {
            await db.setUserPrimaryGroup('Bob', 'bobs')
          })
        })
      })

      describe('addUserToGroups', () => {
        it('succeeds', async () => {
          const { login, memDb } = await createSecureMemDbLogin()

          const root = getRootUser()
          const db = await login(root)

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)
          await db.createGroup('bobs')
          await db.addUserToGroups('Bob', 'bobs')

          const bobsGroup = await memDb.collections.group.findOne(
            { name: 'bobs' }
          )

          assert(bobsGroup)

          const dbBob = await memDb.collections.user.findOne({ name: 'Bob' })

          assert(dbBob)

          assert(bobsGroup.users.some(u => u._id === dbBob._id))
        })

        it('fails', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          await db.createGroup('bobs')

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          const bobDb = await login(loginBob)

          await assert.rejects(async () => {
            await bobDb.addUserToGroups('Bob', 'bobs')
          })
        })

        it('fails user', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          await assert.rejects(async () => {
            await db.addUserToGroups('Bob', 'users')
          })
        })

        it('fails group', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          await assert.rejects(async () => {
            await db.addUserToGroups(getRootUser().name, 'bobs')
          })
        })

        it('succeeds existing', async () => {
          const { login, memDb } = await createSecureMemDbLogin()

          const root = getRootUser()
          const db = await login(root)

          await db.createGroup('coolKids')
          await db.addUserToGroups(root.name, 'coolKids')

          const groupBefore = await memDb.collections.group.findOne(
            { name: 'coolKids' }
          )

          assert(groupBefore)
          assert.strictEqual(groupBefore.users.length, 1)

          await db.addUserToGroups(root.name, 'coolKids')

          const groupAfter = await memDb.collections.group.findOne(
            { name: 'coolKids' }
          )

          assert(groupAfter)
          assert.strictEqual(groupAfter.users.length, 1)
        })
      })

      describe('getUsersForGroup', () => {
        it('succeeds', async () => {
          const { login } = await createSecureMemDbLogin()

          const root = getRootUser()
          const { name: rootName } = root
          const db = await login(root)

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)
          await db.createGroup('bobs')
          await db.addUserToGroups('Bob', 'bobs')

          const usersForRoot = await db.getUsersForGroup('root')

          assert.deepStrictEqual(usersForRoot, [rootName])

          const usersForUsers = await db.getUsersForGroup('users')

          assert.deepStrictEqual(usersForUsers, [rootName, 'Bob'])

          const usersForBobs = await db.getUsersForGroup('bobs')

          assert.deepStrictEqual(usersForBobs, ['Bob'])
        })

        it('fails', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          const bobDb = await login(loginBob)

          await assert.rejects(async () => {
            await bobDb.getUsersForGroup('root')
          })
        })
      })

      describe('isUserInGroup', () => {
        it('succeeds', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)
          await db.createGroup('bobs')

          let isUsers = await db.isUserInGroup('Bob', 'users')
          let isBobs = await db.isUserInGroup('Bob', 'bobs')
          let isRoots = await db.isUserInGroup('Bob', 'root')

          assert(isUsers, 'is in users')
          assert(!isBobs, 'not in bobs')
          assert(!isRoots, 'not in roots')

          await db.addUserToGroups('Bob', 'bobs')

          isBobs = await db.isUserInGroup('Bob', 'bobs')

          assert(isBobs, 'is in bobs')
        })

        it('fails', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          const bobDb = await login(loginBob)

          await assert.rejects(async () => {
            await bobDb.isUserInGroup('Bob', 'users')
          })
        })

        it('fails username', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          await assert.rejects(async () => {
            await db.isUserInGroup('Bob', 'users')
          })
        })

        it('fails groupname', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          await assert.rejects(async () => {
            await db.isUserInGroup(getRootUser().name, 'bobs')
          })
        })
      })

      describe('removeUserFromGroups', () => {
        it('succeeds', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)
          await db.createGroup('bobs')

          let isUsers = await db.isUserInGroup('Bob', 'users')
          let isBobs = await db.isUserInGroup('Bob', 'bobs')
          let isRoots = await db.isUserInGroup('Bob', 'root')

          assert(isUsers, 'is in users')
          assert(!isBobs, 'not in bobs')
          assert(!isRoots, 'not in roots')

          await db.addUserToGroups('Bob', 'bobs')

          isBobs = await db.isUserInGroup('Bob', 'bobs')

          assert(isBobs, 'is in bobs')

          await db.removeUserFromGroups('Bob', 'bobs')

          isBobs = await db.isUserInGroup('Bob', 'bobs')

          assert(!isBobs, 'not in bobs')
        })

        it('fails', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          const loginBob: LoginUser = { name: 'Bob', password: 'Boogers' }

          await db.createUser(loginBob)

          const bobDb = await login(loginBob)

          await assert.rejects(async () => {
            await bobDb.removeUserFromGroups('Bob', 'users')
          })
        })

        it('fails user', async () => {
          const { login } = await createSecureMemDbLogin()

          const db = await login(getRootUser())

          await assert.rejects(async () => {
            await db.removeUserFromGroups('Bob', 'users')
          })
        })
      })
    })

    describe( 'collections', () => {
      
    })
  })
})
