import { 
  createMemoryDb, resolveRefsShallow, secureDbFactory, createSecureDbItem,
  LoginUser, secureEntityKeys, SecureEntityMap, EntityKeys
} from '..'
import { dbItemToEntity } from '../db/db-item-to-entity'

import { DbFoo, fooBarEntityKeys, FooBarEntityMap, FooBarModelMap } from './types'
import { populateDb } from './util'

type Models = FooBarModelMap
type Ents = FooBarEntityMap & SecureEntityMap

const secureFooBarEntityKeys: EntityKeys<Ents> = { 
  ...secureEntityKeys, 
  ...fooBarEntityKeys 
}

const start = async () => {
  const root: LoginUser = { name: 'root', password: 'goobers' }
  const bob: LoginUser = { name: 'Bob', password: 'boogers' }

  const memDb = await createMemoryDb( 
    'my secure db', secureFooBarEntityKeys, createSecureDbItem 
  )

  const login = await secureDbFactory( memDb, root )

  // login as root and set up users, groups and permissions

  const rootDb = await login( root )

  // don't populate until you have a store
  await populateDb( rootDb )

  const { foo: rootFoo, bar: rootBar } = rootDb.collections

  const fooIds = await rootFoo.ids()  
  const barIds = await rootBar.ids()  
  
  await rootDb.createUser( bob )
  
  await rootDb.createGroup( 'bobs' )
  
  await rootDb.addUserToGroups( 'Bob', 'bobs' )

  await rootDb.chgrp( 'bobs', 'foo' )
  await rootDb.chgrp( 'bobs', 'bar' )
  await rootDb.chmod( 0o0770, 'foo' )
  await rootDb.chmod( 0o0770, 'bar' )

  for( const fooId of fooIds ){
    await rootDb.chgrp( 'bobs', 'foo', fooId )
    await rootDb.chmod( 0o0770, 'foo', fooId )
  }

  for( const barId of barIds ){
    await rootDb.chgrp( 'bobs', 'bar', barId )
    await rootDb.chmod( 0o0770, 'bar', barId )
  }

  // login as bob - we should be allowed to access foo and bar

  const bobDb = await login( bob )

  const { foo: bobFoo, bar: bobBar } = bobDb.collections

  const firstDbFoo = await bobFoo.findOne({})

  if( firstDbFoo === undefined ) throw Error( 'Expected firstDbFoo' )

  await bobFoo.save({ _id: firstDbFoo._id, value: 7 })

  const firstDbBar = await bobBar.findOne({})

  if( firstDbBar === undefined ) throw Error( 'Expected firstDbBar' )

  // remove any metadata that we don't want resolved in the model
  const dbBarEntity = dbItemToEntity( firstDbBar )

  const barModel = await resolveRefsShallow<Models,Ents,'bar'>( 
    bobDb, dbBarEntity  
  )

  // note that the resolved foo property on bar still has metadata
  console.log( JSON.stringify( barModel, null, 2 ) )
  /*
        {
          "_id": "8429f2ed5d5f257897544d68",
          "name": "b",
          "value": 2,
          "foo": {
            "_id": "70636266f2e8c323caa51d5d",
            "_ver": 0,
            "_atime": 1626926136316,
            "_ctime": 1626926136316,
            "_mtime": 1626926136316,
            "_group": {
              "_id": "011664236e52c03b06329ed4",
              "_collection": "group"
            },
            "_owner": {
              "_id": "9ccb30147c8792f12868125f",
              "_collection": "user"
            },
            "_mode": 504,
            "name": "a",
            "value": 7
          }
        }  
  */
}

start().catch( console.error )
