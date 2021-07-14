import { DbItem } from './types'

export const dbItemToEntity = <TEntity>( 
  dbItem: TEntity
): TEntity => {
  const entity = {} as TEntity

  Object.keys( dbItem ).forEach( key => {
    if( key !== '_id' && key.startsWith( '_' ) ) return

    entity[ key ] = dbItem[ key ]
  })

  return entity
}

export const dbItemToMetadata = <TEntity, D extends DbItem = DbItem>(
  dbItem: TEntity & D
) => {
  const metadata = {} as D

  Object.keys( dbItem ).forEach( key => {
    if( !key.startsWith( '_' ) ) return

    metadata[ key ] = dbItem[ key ]
  })

  return metadata
}
