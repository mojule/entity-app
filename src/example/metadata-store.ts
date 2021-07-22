import { createMemoryDb, resolveRefsShallow } from '..'
import { createMetadataDbItem, metadataDbFactory } from '../db/proxies/metadata'
import { fooBarEntityKeys, FooBarEntityMap, FooBarModelMap } from './types'
import { populateDb } from './util'

type Mod = FooBarModelMap
type Ent = FooBarEntityMap

const start = async () => {
  const memDb = await createMemoryDb( 
    'my metadata db', fooBarEntityKeys, createMetadataDbItem 
  )

  const db = metadataDbFactory( memDb )

  await populateDb( db )

  const { bar } = db.collections

  const dbBar = await bar.findOne({})

  if( dbBar === undefined ) throw Error( 'expected dbBar' )

  console.log( JSON.stringify( dbBar, null, 2 ) )

  const barModel = await resolveRefsShallow<Mod,Ent,'bar'>( db, dbBar )

  console.log( JSON.stringify( barModel, null, 2 ) )
}

start().catch( console.error )
