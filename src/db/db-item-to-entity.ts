export const dbItemToEntity = <TEntity>( 
  dbItem: TEntity
): TEntity => {
  const entity = {} as TEntity

  Object.keys( dbItem ).forEach( key => {
    if( key.startsWith( '_' ) ) return

    entity[ key ] = dbItem[ key ]
  })

  return entity
}
