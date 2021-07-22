import { createMemoryDb } from '../../db/db-memory'
import { createMetadataDbItem, metadataDbFactory } from '../../db/proxies/metadata'
import { MetadataDbItem } from '../../db/proxies/metadata/types'
import { DbLoadMany } from '../../db/types'
import { EntityKeys } from '../../entity/types'
import { PublicThing } from './common'

export type MetadataEntityMap = {
  publicThing: PublicThing
}

export const metadataEntityKeys: EntityKeys<MetadataEntityMap> = {
  publicThing: 'publicThing'
}

export const createMetadataDb = async () => {
  const memDb = await createMemoryDb(
    '', metadataEntityKeys, createMetadataDbItem
  )

  const metadataDb = metadataDbFactory(memDb)

  return metadataDb
}

export const createDisorderedDb = async () => {
  const memDb = await createMemoryDb(
    '', metadataEntityKeys, createMetadataDbItem
  )

  const collection = memDb.collections.publicThing

  const { loadMany: originalLoadMany } = collection

  collection.loadMany = async ids =>
    originalLoadMany(ids.reverse())

  const metadataDb = metadataDbFactory(memDb)

  return metadataDb
}
