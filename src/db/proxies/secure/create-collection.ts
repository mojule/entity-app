import { canAccess, r, w } from '@mojule/mode'
import { defaultLoadPaged } from '../../default-load-paged'

import {
  EntityDb, DbRefFor, DbItem, DbIds, DbCreate, DbCreateMany, DbLoad, DbLoadMany,
  DbSave, DbSaveMany, DbFind, DbFindOne, DbRemove, DbRemoveMany, DbCollection
} from '../../types'

import {
  SecureEntityMap, SecureDbItem, SecureUser, privilegedDbItemKeys
} from './types'

import { createEperm } from './errors'
import { createAccessOptions } from './util'
import { hashPassword } from './user'

export const createSecureCollection = async <
  K extends keyof EntityMap,
  EntityMap extends SecureEntityMap,
  D extends SecureDbItem = SecureDbItem
>(
  db: EntityDb<EntityMap, D>,
  key: K,
  user: SecureUser & D
) => {
  const getUser = () => db.collections.user.load(user._id)

  type Entity = EntityMap[K]

  const collection = db.collections[key]

  // we can bang assert because they are created in init
  const collectionData = (
    await db.collections.collectionData.findOne({ name: key })
  )!


  const collectionAccessOptions = async () => createAccessOptions(
    db, await getUser(), collectionData, true
  )

  const canReadCollection = async () => {
    const canRead = canAccess(r, await collectionAccessOptions())

    return canRead
  }

  const canWriteCollection = async () => {
    const canWrite = canAccess(w, await collectionAccessOptions())

    return canWrite
  }

  const userRef: DbRefFor<EntityMap, 'user'> = {
    _id: user._id, _collection: 'user'
  }

  const getGroupRef = async (): Promise<DbRefFor<EntityMap, 'group'>> => ({
    _id: (await getUser())._group._id, _collection: 'group'
  })

  const assertReadEntity = async (
    entity: SecureDbItem, operation: string
  ) => {
    const accessOptions = await createAccessOptions(
      db, await getUser(), entity, false
    )

    if (!(await canReadCollection()) || !canAccess(r, accessOptions))
      throw createEperm(operation)
  }

  const assertWriteEntity = async (
    document: DbItem, operation: string
  ) => {
    const entity = await collection.load(document._id)

    const accessOptions = await createAccessOptions(db, await getUser(), entity, false)

    if (!( await canWriteCollection() ) || !canAccess(w, accessOptions))
      throw createEperm(operation)
  }

  const assertLoad = (entity: SecureDbItem) =>
    assertReadEntity(entity, 'load')


  const assertSave = (document: DbItem) => assertWriteEntity(document, 'save')

  const cleanPassword = <Entity>(entity: Entity) => {
    if (key === 'user') {
      return Object.assign({}, entity, { password: '' })
    }

    return entity
  }

  const decorateItem = async <Entity>(entity: Entity) => {
    entity['_owner'] = userRef
    entity['_group'] = await getGroupRef()
  }

  const ids: DbIds = async () => {
    if (!(await canReadCollection()))
      throw createEperm('ids')

    const ids = await collection.ids()

    const filteredIds: string[] = []

    for (const id of ids) {
      const entity = await collection.load(id)
      const accessOptions = await createAccessOptions(db, await getUser(), entity, false)

      if (canAccess(r, accessOptions)) filteredIds.push(id)
    }

    return filteredIds
  }

  const decorateUser = async <TEntity>(user: TEntity) => {
    user = await hashPassword(user)

    const userEntity = user as unknown as SecureUser

    if (!userEntity.isRoot) {
      const group = await db.collections.group.findOne({ name: 'users' })

      // hasn't been created yet
      if (group === undefined) throw Error('Expected users group')

      user['_group']['_id'] = group._id
    }

    return user
  }

  const create: DbCreate<Entity> = async entity => {
    if (!( await canWriteCollection() ))
      throw createEperm('create')

    await decorateItem(entity)

    if (key === 'user') {
      entity = await decorateUser(entity)
    }

    return collection.create(entity)
  }

  const createMany: DbCreateMany<Entity> = async entities => {
    if (!( await canWriteCollection() ))
      throw createEperm('createMany')

    for (const entity of entities) {
      await decorateItem(entity)
    }

    if (key === 'user') {
      entities = await Promise.all(entities.map(decorateUser))
    }

    return collection.createMany(entities)
  }

  const load: DbLoad<Entity, D> = async id => {
    const entity = await collection.load(id)

    await assertLoad(entity)

    return cleanPassword(entity)
  }

  const loadMany: DbLoadMany<Entity, D> = async ids => {
    const entities = await collection.loadMany(ids)

    await Promise.all(entities.map(assertLoad))

    return entities.map(cleanPassword)
  }


  const filterDocument = async (document: Partial<Entity> & DbItem) => {
    if (!(await getUser()).isRoot) {
      const originalDocument = document

      document = {} as Partial<Entity> & D

      const keys = Object.keys(originalDocument)

      keys.forEach(key => {
        if (privilegedDbItemKeys.includes(key)) return

        document[key] = originalDocument[key]
      })
    }

    return document
  }

  const save: DbSave<Entity> = async document => {
    await assertSave(document)

    if (key === 'user') {
      document = await hashPassword(document)
    }

    return collection.save(await filterDocument(document))
  }

  const saveMany: DbSaveMany<Entity> = async documents => {
    await Promise.all(documents.map(assertSave))

    documents = await Promise.all(documents.map(filterDocument))

    if (key === 'user') {
      documents = await Promise.all(documents.map(hashPassword))
    }

    return collection.saveMany(documents)
  }

  const find: DbFind<Entity, D> = async query => {
    if (!(await canReadCollection())) throw createEperm('find')

    const result = await collection.find(query)

    const filteredResult: typeof result = []

    for (const entity of result) {
      const accessOptions = await createAccessOptions(db, await getUser(), entity, false)

      if (canAccess(r, accessOptions)) {
        filteredResult.push(cleanPassword(entity))
      }
    }

    return filteredResult
  }

  const findOne: DbFindOne<Entity, D> = async query => {
    if (!(await canReadCollection())) throw createEperm('find')

    const entity = await collection.findOne(query)

    if (entity === undefined) return

    const accessOptions = await createAccessOptions(db, await getUser(), entity, false)

    if (!canAccess(r, accessOptions)) return

    return cleanPassword(entity)
  }

  const loadPaged = defaultLoadPaged(ids, loadMany)

  const onRemoveUser = async (userId: string) => {
    const allGroups = await db.collections.group.find({})

    for (const group of allGroups) {
      const withoutUser = group.users.filter(r => r._id !== userId)

      if (withoutUser.length !== group.users.length) {
        group.users = withoutUser

        await db.collections.group.save(group)
      }
    }
  }

  const remove: DbRemove = async id => {
    const entity = await collection.load(id)

    await assertWriteEntity(entity, 'remove')

    if (key === 'user') {
      await onRemoveUser(entity._id)
    }


    return collection.remove(id)
  }

  const removeMany: DbRemoveMany = async ids => {
    const entities = await collection.loadMany(ids)

    const mapper = (entity: DbItem) => async () => {
      await assertWriteEntity(entity, 'removeMany')

      if (key === 'user') {
        await onRemoveUser(entity._id)
      }
    }

    await Promise.all(entities.map(mapper))

    return collection.removeMany(ids)
  }

  const secureCollection: DbCollection<EntityMap[K], D> = {
    ids, create, createMany, load, loadMany, save, saveMany, find, findOne,
    loadPaged, remove, removeMany
  }

  return secureCollection
}
