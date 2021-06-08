import { EntityKeys } from '../../entity/types'
import { DbCollections, EntityDb } from '../types'
import { defaultDrop } from '../default-drop'
import { createCollection } from './create-collection'

const initCollections = <TEntityMap>( keys: EntityKeys<TEntityMap> ) => {
  const collections: Partial<DbCollections<TEntityMap>> = {}

  Object.keys( keys ).forEach( key => {
    collections[ key ] = createCollection( {} )
  } )

  return <DbCollections<TEntityMap>>collections
}

export const createMemoryDb = async <TEntityMap>(
  _name: string, keys: EntityKeys<TEntityMap>
) => {
  const drop = async () => defaultDrop( db )()

  const close = async () => { }

  const collections = initCollections( keys )

  const db: EntityDb<TEntityMap> = { drop, close, collections }

  return db
}
