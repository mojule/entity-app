import { DbCollections, EntityDb } from '../../types'
import { createMetadataCollection } from './create-collection'
import { MetadataDbItem } from './types'
import { randId } from '@mojule/util'
import { createMemoryDb } from '../../db-memory'
import { CreateDbItem } from '../../db-memory/types'
import { EntityKeys } from '../../../entity/types'

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
  const { drop, close } = db

  const collections = initCollections<TEntityMap, D>(db.collections)

  const metadataDb: EntityDb<TEntityMap, D> = { collections, drop, close }

  return metadataDb
}

export const createMetadataItem: CreateDbItem<MetadataDbItem> = () => {
  const now = new Date().toJSON()
  const _id = randId()
  const _v = 0
  const _created = now
  const _updated = now

  const dbItem: MetadataDbItem = { _id, _v, _created, _updated }

  return dbItem
}
