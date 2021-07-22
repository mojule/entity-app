import { 
  EntityKeys, createMemoryDb, createDefaultDbItem, uniqueFieldDbFactory 
} from '../..'

export type UniqueFieldA = {
  name: string
  abbrev: string
  title: string
}

export type UniqueFieldB = {
  name: string
}

export type UniqueFieldEntityMap = {
  a: UniqueFieldA
  b: UniqueFieldB
}

export const uniqueEntityKeys: EntityKeys<UniqueFieldEntityMap> = {
  a: 'a', b: 'b'
}

export const createUniqueFieldDb = async () => {
  const memDb = await createMemoryDb( 
    '', uniqueEntityKeys, createDefaultDbItem 
  )

  const db = uniqueFieldDbFactory( memDb, key => {
    if( key === 'a' ) return [ 'name', 'abbrev' ]
    if( key === 'b') return [ 'name' ]
    
    return []
  })

  return db
}
