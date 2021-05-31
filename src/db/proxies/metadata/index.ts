import { CreateDb, DbCollections, EntityDb } from '../../types'
import { EntityKeys } from '../../../entity/types'
import { eachEntityKey } from '../../../entity/each-entity-key'
import { createMetadataCollection } from './create-collection'

const initCollections = async <TEntityMap>(
  collections: DbCollections<TEntityMap>, keys: EntityKeys<TEntityMap>
) => {
  const metadataCollections: DbCollections<TEntityMap> = <any>{}

  await eachEntityKey( keys, async ( key: keyof TEntityMap ) => {
    metadataCollections[ key ] = await createMetadataCollection(
      collections[ key ], <keyof TEntityMap & string>key
    )
  } )

  return metadataCollections
}

export const metadataDbFactory = <TEntityMap>(
  createDb: CreateDb<TEntityMap>
) => {
  const createMetadataDb: CreateDb<TEntityMap> = async (
    name: string, keys: EntityKeys<TEntityMap>, options?: any
  ) => {
    const db = await createDb( name, keys, options )

    const { drop, close } = db

    const collections = await initCollections( db.collections, keys )

    const metadataDb: EntityDb<TEntityMap> = { collections, drop, close }

    return metadataDb
  }

  return createMetadataDb
}
