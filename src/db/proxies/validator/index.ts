import { CreateDb, DbCollections, EntityDb } from '../../types'
import { ValidateEntity, ValidateOptions } from './types'
import { EntityKeys } from '../../../entity/types'
import { eachEntityKey } from '../../../entity/each-entity-key'
import { createValidatedCollection } from './create-collection'

const initCollections = async <TEntityMap>(
  collections: DbCollections<TEntityMap>, keys: EntityKeys<TEntityMap>,
  validator: ValidateEntity<TEntityMap>, options: ValidateOptions
) => {
  const validatedCollections: DbCollections<TEntityMap> = <any>{}

  await eachEntityKey( keys, async ( key: keyof TEntityMap ) => {
    validatedCollections[ key ] = await createValidatedCollection(
      collections[ key ], <keyof TEntityMap & string>key, validator, options
    )
  } )

  return validatedCollections
}

export const validatedDbFactory = <TEntityMap>(
  createDb: CreateDb<TEntityMap>, validator: ValidateEntity<TEntityMap>,
  validateOptions: ValidateOptions = {
    onCreate: true,
    onLoad: false,
    onSave: true
  }
) => {
  const createValidatedDb: CreateDb<TEntityMap> = async (
    name: string, keys: EntityKeys<TEntityMap>, options?: any
  ) => {
    const db = await createDb( name, keys, options )

    const { drop, close } = db

    const collections = await initCollections(
      db.collections, keys, validator, validateOptions
    )

    const validatedDb: EntityDb<TEntityMap> = { collections, drop, close }

    return validatedDb
  }

  return createValidatedDb
}
