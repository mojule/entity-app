import { DbIds, DbLoadMany, DbFind, DbFindOne } from './types'
import mingo from 'mingo'

export const defaultFind = <TEntity>(
  ids: DbIds, loadMany: DbLoadMany<TEntity>
) => {
  const find: DbFind<TEntity> = async criteria => {
    const entityIds = await ids()
    const entities = await loadMany( entityIds )

    const query = new mingo.Query( criteria )

    // weird typing in latest mingo :/ 
    // wants query to be a `RawObject`, which is Record<string, unknown>
    // complains that TEntity & DbItem is not RawObject
    return entities.filter( e => query.test( e as any ) )
  }

  return find
}

export const defaultFindOne = <TEntity>(
  ids: DbIds, loadMany: DbLoadMany<TEntity>
) => {
  const findOne: DbFindOne<TEntity> = async criteria => {
    const entityIds = await ids()
    const entities = await loadMany( entityIds )

    const query = new mingo.Query( criteria )

    return entities.find( e => query.test( e as any ) )
  }

  return findOne
}
