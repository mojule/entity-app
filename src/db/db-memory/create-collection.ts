import {
  DbIds, DbCreate, DbLoad, DbItem, DbSave, DbRemove, DbCollection
} from '../types'

import {
  defaultLoadMany, defaultCreateMany, defaultSaveMany, defaultRemoveMany
} from '../default-many'

import { defaultFind, defaultFindOne } from '../default-query'
import { defaultLoadPaged } from '../default-load-paged'
import { createApplyPartial } from '../save-partial'

export const createCollection = <TEntity, D extends DbItem>(
  createDbItem: () => D
) => {
  const collection = new Map<string,TEntity & D>()

  const ids: DbIds = async () => [ ...collection.keys() ]

  const create: DbCreate<TEntity> = async entity => {    
    const dbEntity = Object.assign( createDbItem(), entity )

    collection.set( dbEntity._id, dbEntity )

    return dbEntity._id
  }

  const createMany = defaultCreateMany( create )

  const load: DbLoad<TEntity,D> = async id => {
    const dbEntity = collection.get( id )

    if ( dbEntity === undefined )
      throw Error( `Expected entity for ${ id }` )

    return dbEntity
  }

  const loadMany = defaultLoadMany( load )

  const save: DbSave<TEntity> = async document => {
    const { _id } = document

    if ( typeof _id !== 'string' )
      throw Error( 'Expected document to have _id:string' )

    const dbEntity = await applyPartial( document )
    
    collection.set( _id, dbEntity )
  }

  const saveMany = defaultSaveMany( save )

  const remove: DbRemove = async id => {
    if ( !( collection.has( id ) ) )
      throw Error( `Expected entity for ${ id }` )

    collection.delete( id )
  }

  const removeMany = defaultRemoveMany( remove )

  const find = defaultFind( ids, loadMany )
  const findOne = defaultFindOne( ids, loadMany )

  const loadPaged = defaultLoadPaged( ids, loadMany )

  const entityCollection: DbCollection<TEntity, D> = {
    ids, create, createMany, load, loadMany, save, saveMany, remove, removeMany,
    find, findOne, loadPaged
  }

  const applyPartial = createApplyPartial( entityCollection )

  return entityCollection
}
