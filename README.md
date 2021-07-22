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

```ts

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
