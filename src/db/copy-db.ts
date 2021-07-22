import { getDbEdges } from './get-db-edges'
import { set } from '@mojule/json-pointer'
import { DbItem, EntityDb, EntityDbReadable } from './types'
import { dbItemToEntity } from '..'
import { strictMapGet } from '@mojule/util'

export const copyDb = async <EntityMap,D extends DbItem = DbItem>( 
  source: EntityDbReadable<EntityMap,D>, dest: EntityDb<EntityMap,D>,
  log: ( ...args: any[] ) => void = () => {}
) => {
  const edges = await getDbEdges( source )
  const collectionNames = Object.keys( source.collections ) as ( keyof EntityMap )[]
  const oldToNewIdMap = new Map<string,string>()
  
  await dest.drop()

  for( const name of collectionNames ){
    log( 'Copying collection', name )

    const sourceCollection = source.collections[ name ]
    const destCollection = dest.collections[ name ]

    const ids = await sourceCollection.ids()
    const entities = await sourceCollection.loadMany( ids )

    for( const entity of entities ){
      const destEntity = dbItemToEntity( entity )
      const oldId = entity._id
      const newId = await destCollection.create( destEntity )

      oldToNewIdMap.set( oldId, newId )
    }

    log( `Copied ${ entities.length } item(s)` )
  }

  log( `Updating ${ edges.length } db ref edges` )
  
  const cache: Record<string,any> = {}

  const loadEntity = async <K extends keyof EntityMap>( 
    collection: K, id: string 
  ) => {
    const key = `${ collection }_${ id }`

    if( key in cache ){
      return cache[ key ] as Promise<EntityMap[K] & DbItem>
    }

    const destCollection = dest.collections[ collection ]

    const entity = await destCollection.load( id )

    cache[ key ] = entity

    return entity
  }

  const saveSet = new Set<string>()
  const saveActions: (()=>Promise<void>)[] = []

  for( const { from, to, pointer } of edges ){
    const destCollection = dest.collections[ from._collection ]    
    const destId = strictMapGet( oldToNewIdMap, from._id )
    const destEntity = await loadEntity( from._collection, destId )

    const key = `${ from._collection }_${ destId }`

    if( !saveSet.has( key ) ){
      saveSet.add( key )
      
      const action = () => destCollection.save( destEntity )

      saveActions.push( action )
    }

    const _id = strictMapGet( oldToNewIdMap, to._id )
    const { _collection } = to

    set( destEntity, pointer, { _id, _collection } )
  }

  log( `Saving ${ saveActions.length } updated entities` )

  for( const action of saveActions ){
    await action()
  }

  log( 'Done' )
}
