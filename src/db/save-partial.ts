import { DbCollectionRead, DbItem } from './types'

export const createApplyPartial = <TEntity, D extends DbItem>( 
  collection: DbCollectionRead<TEntity, D> 
) => {
  const applyPartial = async ( entity: Partial<TEntity> & DbItem ) => {
    const existing = await collection.load( entity._id )

    return Object.assign( {}, existing, entity )
  }

  return applyPartial
}
