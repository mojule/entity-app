import {
  DbLoad, DbLoadMany, DbCreate, DbCreateMany, DbSave, DbSaveMany, DbRemove,
  DbRemoveMany,
  DbItem
} from './types'

export const defaultCreateMany = <TEntity>( create: DbCreate<TEntity> ) => {
  const createMany: DbCreateMany<TEntity> = async entities =>
    Promise.all( entities.map( create ) )

  return createMany
}

export const defaultLoadMany = <TEntity,D extends DbItem = DbItem>( 
  load: DbLoad<TEntity, D> 
) => {
  const loadMany: DbLoadMany<TEntity,D> = async ids =>
    Promise.all( ids.map( load ) )

  return loadMany
}

export const defaultSaveMany = <TEntity>( save: DbSave<TEntity> ) => {
  const saveMany: DbSaveMany<TEntity> = async entities =>
    Promise.all( entities.map( save ) ).then( () => {} )

  return saveMany
}

export const defaultRemoveMany = ( remove: DbRemove ) => {
  const removeMany: DbRemoveMany = async ids =>
    Promise.all( ids.map( remove ) ).then( () => {} )

  return removeMany
}
