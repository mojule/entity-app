import { DbCollections, DbItem, EntityDb } from '../../types'
import { createUniqueFieldsCollection } from './create-collection'

const initCollections = <TEntityMap, D extends DbItem>(
  collections: DbCollections<TEntityMap, D>,
  getUniqueFieldNames: ( key: keyof TEntityMap ) => string[]
) => {
  const unique = {} as DbCollections<TEntityMap, D>
  const keys = Object.keys(collections) as (keyof TEntityMap & string)[]

  keys.forEach(key => {
    const uniqueNames = getUniqueFieldNames( key )

    unique[key] = createUniqueFieldsCollection(
      collections[key], key, uniqueNames
    )
  })

  return unique
}

export const uniqueFieldDbFactory = <TEntityMap, D extends DbItem>(
  db: EntityDb<TEntityMap,D>,
  getUniqueFieldNames: ( key: keyof TEntityMap ) => string[]
) => {
  const collections = initCollections(
    db.collections, getUniqueFieldNames
  )

  return Object.assign( {}, db, { collections } )
}
