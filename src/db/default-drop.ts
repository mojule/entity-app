import { EntityDb, DbCollection } from './types'

export const defaultDrop = <TEntityMap>( db: EntityDb<TEntityMap> ) => {
  const drop = async () => {
    const collections = <DbCollection<any>[]>Object.values( db.collections )

    for ( let c = 0; c < collections.length; c++ ) {
      const collection = collections[ c ]

      const ids = await collection.ids()

      await collection.removeMany( ids )
    }
  }

  return drop
}
