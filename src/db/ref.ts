import { DbRef, EntityDb } from './types'

export const isRef = <TEntityMap>( ref: any ): ref is DbRef<TEntityMap> => {
  if ( !ref ) return false
  if ( typeof ref._id !== 'string' ) return false
  if ( typeof ref._collection !== 'string' ) return false

  return true
}

export const isRefArray = <TEntityMap>( arg: any[] ): arg is DbRef<TEntityMap>[] => {
  if ( !Array.isArray( arg ) ) return false
  if ( !arg.every( isRef ) ) return false

  return true
}

export const resolveRef = async <TEntityMap>(
  db: EntityDb<TEntityMap>, ref: DbRef<TEntityMap>
) => {
  const { _collection, _id } = ref
  const collection = db.collections[ _collection ]
  const dbEntity = await collection.load( _id )

  return dbEntity
}

export const resolveRefArray = async <TEntityMap>(
  db: EntityDb<TEntityMap>, refs: DbRef<TEntityMap>[]
): Promise<TEntityMap[ keyof TEntityMap ][]> => {
  if( refs.length === 0 ) return []

  const [ first ] = refs
  const { _collection } = first
  const ids = refs.map( ref => ref._id )

  const dbEntitys = await db.collections[ _collection ].loadMany( ids )

  return dbEntitys
}

export const resolveRefsShallow = async <TEntityMap, TEntity>(
  db: EntityDb<TEntityMap>, obj: TEntity
) => {
  const result: Partial<TEntity> = {}
  const keys = Object.keys( obj )

  for ( let i = 0; i < keys.length; i++ ) {
    const value = obj[ keys[ i ] ]

    if ( isRef<TEntityMap>( value ) ) {
      result[ keys[ i ] ] = await resolveRef( db, value )
    } else if ( isRefArray<TEntityMap>( value ) ) {
      result[ keys[ i ] ] = await resolveRefArray( db, value )
    } else {
      result[ keys[ i ] ] = value
    }
  }

  return <TEntity>result
}

export const resolveRefsDeep = async <TEntityMap, TEntity>(
  db: EntityDb<TEntityMap>, obj: TEntity, depthLimit = 20
) => {
  const resolve = async<TEntity>( obj: TEntity, depth = 0 ) => {
    if( depth > depthLimit )
      throw Error( 'Exceeded depth limit' )

    const result: Partial<TEntity> = {}
    const keys = Object.keys( obj )

    for ( let i = 0; i < keys.length; i++ ) {
      const value = obj[ keys[ i ] ]

      if ( isRef<TEntityMap>( value ) ) {
        let entity = await resolveRef( db, value )

        result[ keys[ i ] ] = await resolve( entity, depth + 1 )
      } else if ( isRefArray<TEntityMap>( value ) ) {
        let entities = await resolveRefArray( db, value )

        result[ keys[ i ] ] = await Promise.all(
          entities.map( e => resolve( e, depth + 1 ) )
        )
      } else {
        result[ keys[ i ] ] = value
      }
    }

    return <TEntity>result
  }

  return resolve( obj )
}
