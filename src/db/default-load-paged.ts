import { DbIds, DbLoadMany, DbLoadPaged } from './types'

export const defaultLoadPaged = <TEntity>(
  ids: DbIds, loadMany: DbLoadMany<TEntity>
) => {
  const loadPaged: DbLoadPaged<TEntity> = async (
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
