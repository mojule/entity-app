import { EntityKeys } from '../../entity/types'
import { DbCollections, DbItem, EntityDb } from '../types'
import { defaultDrop } from '../default-drop'
import { createCollection } from './create-collection'
import { CreateDbItem } from './types'
import { randId } from '@mojule/util'

const initCollections = <TEntityMap, D extends DbItem>( 
  keys: EntityKeys<TEntityMap>, createDbItem: () => D
) => {
  const collections = {} as DbCollections<TEntityMap, D>

  Object.keys( keys ).forEach( key => {
    collections[ key ] = createCollection( createDbItem )
  } )

  return collections 
}

export const createMemoryDb = async <TEntityMap,D extends DbItem = DbItem>(
  _name: string, keys: EntityKeys<TEntityMap>, createDbItem: CreateDbItem<D>
) => {
  const drop = async () => defaultDrop( db )()

  const close = async () => { }

  const collections = initCollections<TEntityMap, D>( keys, createDbItem )

  const db: EntityDb<TEntityMap,D> = { drop, close, collections }

  return db
} 

export const createDefaultDbItem: CreateDbItem = () => ({ _id: randId() })
