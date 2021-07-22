# entity-app

Manage data entities - WARNING this is very much a work in progress

## Architecture

A system for creating, editing, displaying and generally managing "Entities"

An Entity is essentially a model description

It is most useful when the entities in this system exist twice, once as JSON 
Schema and once as TypeScript types

You can avoid a considerable amount of duplication by using:

https://www.npmjs.com/package/json-schema-to-ts

### define entities

```ts
import { DbRefFor, EntityKeys } from '@mojule/entity-app'

export type DbFoo = {
  name: string
  value: number
}

export type Foo = DbFoo

export type DbBar = DbFoo & {
  foo?: DbRefFor<FooBarEntityMap,'foo'>
}

export type Bar = Foo & {
  foo?: Foo
}

export type FooBarEntityMap = {
  foo: DbFoo
  bar: DbBar
}

export type FooBarModelMap = {
  foo: Foo
  bar: Bar
}

export const fooBarEntityKeys: EntityKeys<FooBarEntityMap> = {
  foo: 'foo',
  bar: 'bar'
}

```

#### data stores

- memory
- fs
- mongodb
- level

```ts
import { 
  createDefaultDbItem, createMemoryDb, resolveRefsShallow 
} from '@mojule/entity-app'

import { fooBarEntityKeys, FooBarEntityMap, FooBarModelMap } from './types'

type Mod = FooBarModelMap
type Ent = FooBarEntityMap

const start = async () => {
  const db = await createMemoryDb( 
    'my db', fooBarEntityKeys, createDefaultDbItem 
  )

  const { foo, bar } = db.collections
  
  const fooId = await foo.create({ name: 'a', value: 0 })
   
  const barId = await bar.create({ 
    name: 'b', value: 1, 
    foo: {
      _collection: 'foo',
      _id: fooId
    }
  })

  await bar.save({ _id: barId, value: 2 })

  const dbBar = await bar.load( barId )

  console.log( JSON.stringify( dbBar, null, 2 ) )
  /*
        {
          "_id": "7bfbcb66d0f75071ba655c0f",
          "name": "b",
          "value": 2,
          "foo": {
            "_collection": "foo",
            "_id": "6dcdc64768366e5190521b3b"
          }
        }
  */

  await foo.save({ _id: fooId, value: 5 })

  const barModel = await resolveRefsShallow<Mod,Ent,'bar'>( db, dbBar )

  console.log( JSON.stringify( barModel, null, 2 ) )
  /*
        {
          "_id": "7bfbcb66d0f75071ba655c0f",
          "name": "b",
          "value": 2,
          "foo": {
            "_id": "6dcdc64768366e5190521b3b",
            "name": "a",
            "value": 5
          }
        }  
  */
}

start().catch( console.error )

```

### data store proxies

- metadata
  - filesystem like, atime, ctime, mtime etc, updated as db accessed
- secure
  - similar to linux file permissions, manage access to collections and 
    entities via users and groups
- unique
  - ensure unique indexes on given fields
- validator
  - validate entities as they enter the store, or optionally on load

#### metadata proxy

```ts
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
  /*
        {
          "_id": "97d207e825be34fab9c385be",
          "_ver": 1,
          "_atime": 1626922530649,
          "_ctime": 1626922530649,
          "_mtime": 1626922530649,
          "name": "b",
          "value": 2,
          "foo": {
            "_collection": "foo",
            "_id": "9b0d5f3d95628b12b96f1a98"
          }
        }          
  */

  const barModel = await resolveRefsShallow<Mod,Ent,'bar'>( db, dbBar )

  console.log( JSON.stringify( barModel, null, 2 ) )

  /*
        {
          "_id": "97d207e825be34fab9c385be",
          "_ver": 1,
          "_atime": 1626922530649,
          "_ctime": 1626922530649,
          "_mtime": 1626922530649,
          "name": "b",
          "value": 2,
          "foo": {
            "_id": "9b0d5f3d95628b12b96f1a98",
            "_ver": 1,
            "_atime": 1626922530652,
            "_ctime": 1626922530648,
            "_mtime": 1626922530649,
            "name": "a",
            "value": 5
          }
        }  
  */
}

start().catch( console.error )
```

#### secure proxy

```ts
import { 
  createMemoryDb, resolveRefsShallow, secureDbFactory, createSecureDbItem,
  LoginUser, secureEntityKeys, SecureEntityMap, EntityKeys
} from '@mojule/entity-app'

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

```

### types from schema

```ts
import { FromSchema } from 'json-schema-to-ts'
import { EntityKeys } from '..'
import { refFactory } from '../schema/ref'

export const fooSchema = {
  $id: '#/foo',
  type: 'object',
  properties: {
    name: { type: 'string' },
    value: { type: 'number' }
  },
  required: [ 'name', 'value' ]
} as const

const createDbRef = refFactory( '#' )

export const barSchema = {
  $id: '#/bar',
  type: 'object',
  properties: {
    ...fooSchema.properties,
    foo: createDbRef( 'foo' )
  },
  required: [ 'name', 'value' ]
} as const

export type DbFoo = FromSchema<typeof fooSchema>

export type Foo = DbFoo

export type DbBar = FromSchema<typeof barSchema>

export type Bar = Foo & {
  foo?: Foo
}

export type FooBarEntityMap = {
  foo: DbFoo
  bar: DbBar
}

export type FooBarModelMap = {
  foo: Foo
  bar: Bar
}

export const fooBarEntityKeys: EntityKeys<FooBarEntityMap> = {
  foo: 'foo',
  bar: 'bar'
}

```

### rest apis

url paths for route tree generated from and backed by data store + proxies

- for express `@mojule/entity-app-server`
- for SPA, via `@mojule/spa-app`, `@mojule/entity-app-client`

### client side admin

`@mojule/entity-app-client`

### view / templating

`@mojule/dom`
`@mojule/dom-components`

## License

MIT License

Copyright (c) 2021 Nik Coughlin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
