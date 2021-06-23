import { isObjectLeaf, traverseObject } from '@mojule/util'
import { DbRef, EntityDb } from './types'

export const getDbEdges = async <EntityMap>( db: EntityDb<EntityMap> ) => {
  const collectionNames = Object.keys( db.collections ) as ( keyof EntityMap )[]

  const edges: DbEdge<EntityMap>[] = []

  for( const name of collectionNames ){
    const collection = db.collections[ name ]
    const ids = await collection.ids()
    const entities = await collection.loadMany( ids )

    for( const entity of entities ){
      const from: DbRef<EntityMap> = {
        _collection: name,
        _id: entity._id
      }

      traverseObject( entity, ( value, pointer ) => {
        if( isDbRef( value ) ){
          const to = value
          edges.push({ from, to, pointer })
        }
      }) 
    }
  }  

  return edges
}

export type DbEdge<EntityMap> = {
  from: DbRef<EntityMap>
  to: DbRef<EntityMap>
  pointer: string
}

const isDbRef = ( value: any ) => 
  !isObjectLeaf( value ) && 
  typeof value[ '_collection' ] === 'string' &&
  typeof value[ '_id' ] === 'string' 
