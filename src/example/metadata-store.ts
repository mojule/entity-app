import { createMemoryDb, resolveRefsShallow } from '..'
import { createMetadataDbItem, metadataDbFactory } from '../db/proxies/metadata'
import { fooBarEntityKeys, FooBarEntityMap, FooBarModelMap } from './types'

type Mod = FooBarModelMap
type Ent = FooBarEntityMap

const start = async () => {
  const memDb = await createMemoryDb( 
    'my metadata db', fooBarEntityKeys, createMetadataDbItem 
  )

  const db = metadataDbFactory( memDb )

  const { foo, bar } = db.collections
  
  const fooId = await foo.create({ name: 'a', value: 0 })
   
  const barId = await bar.create({ 
    name: 'b', value: 1, 
    foo: {
      _collection: 'foo',
      _id: fooId
    }
  })

  const dbBar = await bar.load( barId )

  console.log( JSON.stringify( dbBar, null, 2 ) )

  const barModel = await resolveRefsShallow<Mod,Ent,'bar'>( db, dbBar )

  console.log( JSON.stringify( barModel, null, 2 ) )
}

start().catch( console.error )
