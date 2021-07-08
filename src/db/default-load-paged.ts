import { DbIds, DbItem, DbLoadMany, DbLoadPaged } from './types'

export const defaultLoadPaged = <TEntity,D extends DbItem = DbItem>(
  ids: DbIds, loadMany: DbLoadMany<TEntity,D>
) => {
  const loadPaged: DbLoadPaged<TEntity,D> = async (
    pageSize: number, pageIndex = 0
  ) => {
    const entityIds = await ids()
    const start = pageIndex * pageSize
    const end = start + pageSize
    const pageIds = entityIds.slice( start, end )

    const entities = await loadMany( pageIds )

    return entities
  }

  return loadPaged
}
