import { DbItem } from './types'

export const dbItemToEntity = <TEntity>( dbItem: TEntity & DbItem ): TEntity => {
  const entity: TEntity = Object.assign( {}, dbItem, { _id: undefined } )

  delete entity[ '_id' ]

  return entity
}
  
