import { DbCollection, EntityDb, CreateDb, DbItem } from '../../types'
import { EntityKeys } from '../../../entity/types'

export type DbCachedCollection = {
  flushCache: () => Promise<void>
}

export type DbCachedCollections<TEntityMap,D extends DbItem = DbItem> = {
  [ key in keyof TEntityMap ]:
  DbCollection<TEntityMap[ key ],D> & DbCachedCollection
}

export interface EntityDbCached<TEntityMap,D extends DbItem = DbItem> extends EntityDb<TEntityMap,D> {
  collections: DbCachedCollections<TEntityMap,D>
}

export interface CreateDbCached<TEntityMap,D extends DbItem = DbItem> extends CreateDb<TEntityMap,D> {
  ( name: string, keys: EntityKeys<TEntityMap> ):
    Promise<EntityDbCached<TEntityMap,D>>
}
