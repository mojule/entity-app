import { DbCollections, DbItem, EntityDb } from '../../types'
import { ValidateEntity, ValidateOptions } from './types'
import { createValidatedCollection } from './create-collection'

const initCollections = <TEntityMap, D extends DbItem>(
  collections: DbCollections<TEntityMap, D>, 
  validator: ValidateEntity<TEntityMap>, 
  options: ValidateOptions
) => {
  const validatedCollections = {} as DbCollections<TEntityMap, D>

  for( const key in collections ){
    validatedCollections[ key ] = createValidatedCollection(
      collections[ key ], key, validator, options
    )
  }

  return validatedCollections
}

export const validatedDbFactory = <TEntityMap, D extends DbItem = DbItem>(
  db: EntityDb<TEntityMap, D>, 
  validator: ValidateEntity<TEntityMap>,
  validateOptions: ValidateOptions = {
    onCreate: true,
    onLoad: false,
    onSave: true
  }
) => {
  const { drop, close } = db

  const collections = initCollections(
    db.collections, validator, validateOptions
  )

  const validatedDb: EntityDb<TEntityMap, D> = { collections, drop, close }

  return validatedDb
}
