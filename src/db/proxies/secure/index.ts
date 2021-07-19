import {
  DbCollection, DbCollections, DbItem, DbRefFor, EntityDb
} from '../../types'

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

  there should be at least one root user in unproxied db or nobody will be able
  to do much!

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

  const login = async (user: LoginUser) => {
    const dbUser = await db.collections.user.findOne({ name: user.name })

    if (dbUser === undefined) {
      throw createEperm('login')
    }

    const internalCollections = await initCollections(db, dbUser)

    const isValid = await validateDbUser(db.collections.user, user)

    if (!isValid) {
      throw createEperm('login')
    }

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
      collectionData: undefined
    }

    const collections: SecureDbCollections<EntityMap, D> =
      Object.assign({}, internalCollections, deleteExternal)

    const userFns = createUserFns(internalCollections.user, dbUser)
    const groupFns = createGroupFns(internalCollections, dbUser)

    const accessFns = createAccessFns(
      internalCollections, groupFns.isUserInGroup, dbUser
    )

    const secureDb: SecureDb<EntityMap, D> = {
      drop, close, collections,
      ...accessFns, ...userFns, ...groupFns
    }

    return Object.assign( {}, db, secureDb )
  }

  return login
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

  const rootGroup: SecureGroup = {
    name: 'root',
    users: [userRef]
  }

  const groupId = await db.collections.group.create(rootGroup)

  const groupRef: DbRefFor<EntityMap, 'group'> = { _id: groupId, _collection: 'group' }

  const dbGroup = await db.collections.group.load(groupId)

  dbGroup._owner = userRef
  dbGroup._group = groupRef

  await db.collections.group.save(dbGroup)

  const dbUser = await db.collections.user.load(userId)

  dbUser._owner = userRef
  dbUser._group = groupRef

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
    await ensureGetCollectionData(
      db.collections.collectionData,
      key,
      userRef,
      groupRef
    )
  }
}

const ensureGetCollectionData = async <
  EntityMap extends SecureEntityMap,
  D extends SecureDbItem = SecureDbItem
>(
  collection: DbCollection<EntityMap["collectionData"], D>,
  key: keyof EntityMap & string,
  userRef: DbRefFor<EntityMap, 'user'>,
  groupRef: DbRefFor<EntityMap, 'group'>
) => {
  let collectionData = await collection.findOne(
    { name: key }
  )

  if (collectionData === undefined) {
    const _id = await collection.create(
      { name: key, _owner: userRef, _group: groupRef }
    )

    collectionData = await collection.load(_id)
  }

  return collectionData
}
