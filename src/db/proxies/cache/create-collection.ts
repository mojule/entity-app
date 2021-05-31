import { defaultCreateMany, defaultLoadMany } from '../../default-many'
import { DbCachedCollection } from './types'

import {
  DbCollection, DbItem, DbIds, DbCreate, DbLoad, DbSave, DbSaveMany, DbRemove,
  DbRemoveMany,
  DbFind,
  DbFindOne
} from '../../types'
import { defaultFindOne, defaultFind } from '../../default-query'
import { defaultLoadPaged } from '../../default-load-paged'

export const createCacheCollection = async <TEntity>(
  collection: DbCollection<TEntity>
) => {
  let idSet: Set<string>
  let entityMap: Map<string, TEntity & DbItem>

  const ids: DbIds = async () => [ ...idSet ]

  const create: DbCreate<TEntity> = async entity => {
    const _id = await collection.create( entity )

    idSet.add( _id )
    entityMap.set( _id, Object.assign( {}, entity, { _id } ) )

    return _id
  }

  // not safe to cache, order may change
  const createMany = defaultCreateMany( create )

  const load: DbLoad<TEntity> = async id => {
    if ( entityMap.has( id ) ) return entityMap.get( id )!

    const dbEntity = await collection.load( id )

    entityMap.set( id, dbEntity )

    return dbEntity
  }

  // not safe to cache, order may change
  const loadMany = defaultLoadMany( load )

  const save: DbSave<TEntity> = async document => {
    const { _id } = document

    idSet.add( _id )
    entityMap.set( _id, document )

    await collection.save( document )
  }

  const saveMany: DbSaveMany<TEntity> = async documents => {
    documents.forEach( d => {
      idSet.add( d._id )
      entityMap.set( d._id, d )
    } )

    await collection.saveMany( documents )
  }

  const remove: DbRemove = async id => {
    idSet.delete( id )

    if ( entityMap.has( id ) ) entityMap.delete( id )

    await collection.remove( id )
  }

  const removeMany: DbRemoveMany = async ids => {
    ids.forEach( id => {
      idSet.delete( id )

      if ( entityMap.has( id ) ) entityMap.delete( id )
    } )

    await collection.removeMany( ids )
  }

  const flushCache = async () => {
    idSet = new Set<string>( await collection.ids() )
    entityMap = new Map<string, TEntity & DbItem>()
  }

  const find: DbFind<TEntity> = defaultFind( ids, loadMany )
  const findOne: DbFindOne<TEntity> = defaultFindOne( ids, loadMany )

  const loadPaged = defaultLoadPaged( ids, loadMany )

  const cachedCollection: DbCollection<TEntity> & DbCachedCollection = {
    ids, create, createMany, load, loadMany, save, saveMany, remove, removeMany,
    flushCache, find, findOne, loadPaged
  }

  await flushCache()

  return cachedCollection
}
