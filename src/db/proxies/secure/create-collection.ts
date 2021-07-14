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
  type Entity = EntityMap[K]

  const collection = db.collections[key]

  const collectionData = await db.collections.collectionData.findOne({ name: key })

  if( collectionData === undefined )
    throw Error( `Expected collectionData for ${ key }`)

  const collectionAccessOptions = await createAccessOptions(
    db, user, collectionData, true
  )

  const canReadCollection = canAccess(r, collectionAccessOptions)
  const canWriteCollection = canAccess(w, collectionAccessOptions)

  const userRef: DbRefFor<EntityMap,'user'> = { 
    _id: user._id, _collection: 'user' 
  }

  const groupRef: DbRefFor<EntityMap,'group'> = { 
    _id: user._group._id, _collection: 'group' 
  }  

  const assertReadEntity = async (
    entity: SecureDbItem, operation: string
  ) => {
    const accessOptions = await createAccessOptions(db, user, entity, false)

    if (!canReadCollection || !canAccess(r, accessOptions))
      throw createEperm(operation)
  }

  const assertWriteEntity = async (
    document: DbItem, operation: string
  ) => {
    const entity = await collection.load(document._id)

    const accessOptions = await createAccessOptions(db, user, entity, false)

    if (!canWriteCollection || !canAccess(w, accessOptions))
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

  const decorateItem = <Entity>( entity: Entity ) => {
    entity[ '_user' ] = userRef
    entity[ '_group' ] = groupRef
  }

  const ids: DbIds = async () => {
    if (!canReadCollection)
      throw createEperm('ids')

    const ids = await collection.ids()

    const filteredIds: string[] = []

    for (const id of ids) {
      const entity = await collection.load(id)
      const accessOptions = await createAccessOptions(db, user, entity, false)

      if (canAccess(r, accessOptions)) filteredIds.push(id)
    }

    return filteredIds
  }

  const create: DbCreate<Entity> = async entity => {
    if (!canWriteCollection)
      throw createEperm('create')

    if( key === 'user' ){
      entity = await hashPassword( entity )      
    }

    decorateItem( entity )

    return collection.create(entity)
  }

  const createMany: DbCreateMany<Entity> = async entities => {
    if (!canWriteCollection)
      throw createEperm('createMany')

    if( key === 'user' ){
      entities = await Promise.all( entities.map( hashPassword ) )
    }

    entities.forEach( decorateItem )

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


  const filterDocument = (document: Partial<Entity> & DbItem) => {
    if (!user.isRoot) {
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

    if( key === 'user' ){
      document = await hashPassword( document )
    }

    return collection.save(filterDocument(document))
  }

  const saveMany: DbSaveMany<Entity> = async documents => {
    await Promise.all(documents.map(assertSave))

    documents = documents.map(filterDocument)

    if( key === 'user' ){
      documents = await Promise.all( documents.map( hashPassword ) )
    }

    return collection.saveMany(documents)
  }

  const find: DbFind<Entity, D> = async query => {
    if (!canReadCollection) throw createEperm('find')

    const result = await collection.find(query)

    const filteredResult: typeof result = []

    for (const entity of result) {
      const accessOptions = await createAccessOptions(db, user, entity, false)

      if (canAccess(r, accessOptions)) {
        filteredResult.push(cleanPassword(entity))
      }
    }

    return filteredResult
  }

  const findOne: DbFindOne<Entity, D> = async query => {
    if (!canReadCollection) throw createEperm('find')

    const entity = await collection.findOne(query)

    if (entity === undefined) return

    const accessOptions = await createAccessOptions(db, user, entity, false)

    if (!canAccess(r, accessOptions)) return

    return cleanPassword(entity)
  }

  const loadPaged = defaultLoadPaged(ids, loadMany)

  const remove: DbRemove = async id => {
    const entity = await collection.load(id)

    await assertWriteEntity(entity, 'remove')

    return collection.remove(id)
  }

  const removeMany: DbRemoveMany = async ids => {
    const entities = await collection.loadMany(ids)
    const mapper = (entity: DbItem) => assertWriteEntity(entity, 'save')

    await Promise.all(entities.map(mapper))

    return collection.removeMany(ids)
  }

  const secureCollection: DbCollection<EntityMap[K], D> = {
    ids, create, createMany, load, loadMany, save, saveMany, find, findOne,
    loadPaged, remove, removeMany
  }

  return secureCollection
}
