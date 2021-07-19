import { DbCollections, EntityDb } from '../../types'
import { createMetadataCollection } from './create-collection'
import { MetadataDbItem } from './types'
import { randId } from '@mojule/util'
import { CreateDbItem } from '../../db-memory/types'

const initCollections = <TEntityMap, D extends MetadataDbItem>(
  collections: DbCollections<TEntityMap, D>
) => {
  const metadataCollections = {} as DbCollections<TEntityMap, D>
  const keys = Object.keys(collections) as (keyof TEntityMap & string)[]

  keys.forEach(key => {
    metadataCollections[key] = createMetadataCollection(
      collections[key], key
    )
  })

  return metadataCollections
}

export const metadataDbFactory = <
  TEntityMap, D extends MetadataDbItem = MetadataDbItem
>(
  db: EntityDb<TEntityMap, D>
) => {
  const collections = initCollections<TEntityMap, D>(db.collections)

  const metadataDb: EntityDb<TEntityMap, D> = Object.assign(
    {}, db, { collections }
  )

  return metadataDb
}

export const createMetadataDbItem: CreateDbItem<MetadataDbItem> = () => {
  const now = Date.now()
  const _id = randId()
  const _ver = 0
  const _atime = now
  const _ctime = now
  const _mtime = now

  const dbItem: MetadataDbItem = { _id, _ver, _atime, _ctime, _mtime }

  return dbItem
}
