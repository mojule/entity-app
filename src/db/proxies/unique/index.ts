import { CreateDb, DbCollections, EntityDb } from '../../types'
import { EntityKeys } from '../../../entity/types'
import { eachEntityKey } from '../../../entity/each-entity-key'
import { createUniqueFieldsCollection } from './create-collection'

const initCollections = async <TEntityMap>(
  collections: DbCollections<TEntityMap>,
  keys: EntityKeys<TEntityMap>,
  getUniqueFieldNames: ( key: keyof TEntityMap ) => string[]
) => {
  const unique: DbCollections<TEntityMap> = <any>{}

  await eachEntityKey( keys, async ( key: keyof TEntityMap ) => {
    const uniqueNames = getUniqueFieldNames( key )

    unique[ key ] = await createUniqueFieldsCollection(
      collections[ key ], <keyof TEntityMap & string>key,
      uniqueNames
    )
  } )

  return unique
}

export const uniqueFieldDbFactory = <TEntityMap>(
  createDb: CreateDb<TEntityMap>,
  getUniqueFieldNames: ( key: keyof TEntityMap ) => string[]
) => {
  const createMetadataDb: CreateDb<TEntityMap> = async (
    name: string, keys: EntityKeys<TEntityMap>, options?: any
  ) => {
    const db = await createDb( name, keys, options )

    const { drop, close } = db

    const collections = await initCollections(
      db.collections, keys, getUniqueFieldNames
    )

    const metadataDb: EntityDb<TEntityMap> = { collections, drop, close }

    return metadataDb
  }

  return createMetadataDb
}
