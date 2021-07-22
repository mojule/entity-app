import { EntityDb, DbCollection } from './types'

export const defaultDrop = <TEntityMap>( db: EntityDb<TEntityMap> ) => {
  const drop = async () => {
    for( const key in db.collections ){
      const collection = db.collections[ key ]

      const ids = await collection.ids()

      await collection.removeMany( ids )
    }
  }

  return drop
}
