import { EntityKeys } from '../../../entity/types'
import { CreateDb, DbCollections, DbItem} from '../../types'
import { createCacheCollection } from './create-collection'

import {
  CreateDbCached, DbCachedCollection, EntityDbCached, DbCachedCollections
} from './types'

/*
  Things to know about this cache!

  It is slower to drop or populate a db using this cache

  It will however speed up repeated accesses to the same objects

  It is not safe for multi-client use!
*/

export const cachedDbFactory = <TEntityMap,D extends DbItem = DbItem>(
  createDb: CreateDb<TEntityMap,D>
) => {
  const createCachedDb: CreateDbCached<TEntityMap,D> = async (
    name: string, keys: EntityKeys<TEntityMap>, options?: any
  ) => {
    const db = await createDb( 'cached-' + name, keys, options )

    const { collections, close } = db
    const cachedCollections = await createCachedCollections( collections )

    const drop = async () => {
      await db.drop()

      const collections: DbCachedCollection[] = Object.values(
        cacheDb.collections
      )

      for ( let i = 0; i < collections.length; i++ ) {
        await collections[ i ].flushCache()
      }
    }

    const cacheDb: EntityDbCached<TEntityMap,D> = {
      collections: cachedCollections,
      close, drop
    }

    return cacheDb
  }

  return createCachedDb
}

const createCachedCollections = async <TEntityMap,D extends DbItem = DbItem>(
  collections: DbCollections<TEntityMap,D>
) => {
  const keys = Object.keys( collections )
  const cachedCollections: DbCachedCollections<TEntityMap,D> = <any>{}

  for ( let i = 0; i < keys.length; i++ ) {
    const key = keys[ i ]

    cachedCollections[ key ] = await createCacheCollection(
      collections[ key ]
    )
  }

  return cachedCollections
}
