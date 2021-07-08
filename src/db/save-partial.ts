import { DbCollectionRead, DbItem } from './types'

export const createApplyPartial = <TEntity, D extends DbItem>( 
  collection: DbCollectionRead<TEntity, D> 
) => {
  const applyPartial = async ( entity: Partial<TEntity> & DbItem ) => {
    const existing = await collection.load( entity._id )

    const document = entity as TEntity & D

    const overwriteKeys = Object.keys( existing ).filter(
      k => k.startsWith( '_' ) || !( k in entity )
    )

    overwriteKeys.forEach( key => entity[ key ] = existing[ key ] )

    return document
  }

  return applyPartial
}
