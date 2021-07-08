import { DbIds, DbLoadMany, DbFind, DbFindOne, DbItem } from './types'
import mingo from 'mingo'

export const defaultFind = <TEntity,D extends DbItem = DbItem>(
  ids: DbIds, loadMany: DbLoadMany<TEntity,D>
) => {
  const find: DbFind<TEntity,D> = async criteria => {
    const entityIds = await ids()
    const entities = await loadMany( entityIds )

    const query = new mingo.Query( criteria )

    return entities.filter( e => query.test( e ) )
  }

  return find
}

export const defaultFindOne = <TEntity,D extends DbItem = DbItem>(
  ids: DbIds, loadMany: DbLoadMany<TEntity,D>
) => {
  const findOne: DbFindOne<TEntity,D> = async criteria => {
    const entityIds = await ids()
    const entities = await loadMany( entityIds )

    const query = new mingo.Query( criteria )

    return entities.find( e => query.test( e ) )
  }

  return findOne
}
