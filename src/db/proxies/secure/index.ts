import {
  DbCollection, DbCollections, DbItem, DbRefFor, EntityDb
} from '../../types'

import { accountManageFactory } from './account-manage'

import { createUniqueFieldsCollection } from '../unique/create-collection'
import { createAccessFns } from './access'
import { createSecureCollection } from './create-collection'

import { createEperm } from './errors'
import { createGroupFns } from './group'

import {
  SecureEntityMap, SecureDbItem, LoginUser, SecureUser, SecureDb, SecureGroup,
  SecureDbCollections
} from './types'

import { createUserFns, hashPassword, validateDbUser } from './user'

const initCollections = async <
  EntityMap extends SecureEntityMap,
  D extends SecureDbItem = SecureDbItem
>(
  db: EntityDb<EntityMap, D>,
  user: SecureUser & D
) => {
  const secureCollections = {} as DbCollections<EntityMap, D>

  for (const key in db.collections) {
    let collection = await createSecureCollection(
      db, key, user
    )

    if (key === 'user' || key === 'group' || key === 'collectionData') {
      collection = createUniqueFieldsCollection(
        collection, key, ['name']
      )
    }

    secureCollections[key] = collection
  }

  return secureCollections
}

/*
  creates a secure db 

  returns a login function that returns a db where the logged in user can only
  do what they have permission for
*/
export const secureDbFactory = async <
  EntityMap extends SecureEntityMap,
  D extends SecureDbItem = SecureDbItem
>(
  db: EntityDb<EntityMap, D>,
  rootUser: LoginUser
) => {
  const existingUser = await db.collections.user.findOne(
    { name: rootUser.name }
  )

  if (existingUser === undefined) {
    await initRootUser(db, rootUser)
  } else {
    if (!existingUser.isRoot)
      throw Error(`User ${existingUser.name} exists but is not root`)

    const isValid = await validateDbUser(db.collections.user, rootUser)

    if (!isValid) throw createEperm('secureDbFactory')
  }

  const login = async (user?: LoginUser) => {
    if (user !== undefined) {
      const isValid = await validateDbUser(db.collections.user, user)

      if (!isValid) {
        throw createEperm('login')
      }
    }

    const userName = user ? user.name : 'nobody'

    const dbUser = await db.collections.user.findOne({ name: userName })

    if( dbUser === undefined )
      throw Error( `Expected db user named ${ userName }` )

    const internalCollections = await initCollections(db, dbUser)

    const drop: EntityDb<EntityMap, D>['drop'] = async () => {
      if (!dbUser.isRoot) throw createEperm('drop')

      return db.drop()
    }

    const close: EntityDb<EntityMap, D>['close'] = async () => {
      if (!dbUser.isRoot) throw createEperm('close')

      return db.close()
    }

    const deleteExternal: Record<keyof SecureEntityMap, undefined> = {
      user: undefined,
      group: undefined,
      collectionData: undefined,
      pendingUser: undefined,
      userSecret: undefined
    }

    const collections: SecureDbCollections<EntityMap, D> =
      Object.assign({}, internalCollections, deleteExternal)

    const userFns = createUserFns(internalCollections.user, dbUser)
    const groupFns = createGroupFns(internalCollections, dbUser)

    const accessFns = createAccessFns(
      db.collections, groupFns.isUserInGroup, dbUser
    )

    const accountFns = accountManageFactory(db)

    const secureDb: SecureDb<EntityMap, D> = {
      drop, close, collections,
      ...accessFns, ...userFns, ...groupFns,
      account: accountFns
    }

    secureDb[InternalCollections] = internalCollections

    return Object.assign({}, db, secureDb)
  }

  return login
}

export const InternalCollections = Symbol('Internal Collections')

const initGroups = async<
  EntityMap extends SecureEntityMap,
  D extends SecureDbItem = SecureDbItem
>(db: EntityDb<EntityMap, D>, userRef: DbRefFor<EntityMap, 'user'>) => {
  const createGroup = async (
    name: string, users: DbRefFor<EntityMap, 'user'>[]
  ) => {
    const group: SecureGroup = { name, users }

    const groupId = await db.collections.group.create(group)

    const groupRef: DbRefFor<EntityMap, 'group'> = { _id: groupId, _collection: 'group' }

    const dbGroup = await db.collections.group.load(groupId)

    dbGroup._owner = userRef
    dbGroup._group = groupRef

    await db.collections.group.save(dbGroup)

    return groupRef
  }

  const rootGroupRef = await createGroup('root', [userRef])
  const usersRef = await createGroup('users', [userRef])
  const nobodyRef = await createGroup('nobody', [])

  return { rootGroupRef, usersRef, nobodyRef }
}

const initRootUser = async <
  EntityMap extends SecureEntityMap,
  D extends SecureDbItem = SecureDbItem
>(db: EntityDb<EntityMap, D>, rootUser: LoginUser) => {
  const user: SecureUser = await hashPassword(rootUser)

  user.isRoot = true

  const userId = await db.collections.user.create(user)

  const userRef: DbRefFor<EntityMap, 'user'> = {
    _id: userId, _collection: 'user'
  }

  const { rootGroupRef } = await initGroups(db, userRef)

  const dbUser = await db.collections.user.load(userId)

  dbUser._owner = userRef
  dbUser._group = rootGroupRef

  const saveUser: Partial<SecureUser> & DbItem = {
    _id: dbUser._id
  }

  Object.keys(dbUser).forEach(key => {
    if (key === 'password') return

    saveUser[key] = dbUser[key]
  })

  await db.collections.user.save(saveUser)

  // create collectionData, owned by root
  for (const key in db.collections) {
    await initCollectionData(
      db.collections.collectionData,
      key,
      userRef,
      rootGroupRef
    )
  }
}

const initCollectionData = async <
  EntityMap extends SecureEntityMap,
  D extends SecureDbItem = SecureDbItem
>(
  collection: DbCollection<EntityMap["collectionData"], D>,
  key: keyof EntityMap & string,
  userRef: DbRefFor<EntityMap, 'user'>,
  groupRef: DbRefFor<EntityMap, 'group'>
) => {
  const _id = await collection.create(
    { name: key, _owner: userRef, _group: groupRef }
  )

  const collectionData = await collection.load(_id)

  return collectionData
}
