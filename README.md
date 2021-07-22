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
export type Foo = {
  name: string
  value: number
}

export type Bar = Foo & {
  foo?: DbRefFor<FooBarEntityMap,'foo'>
}

export type FooBarEntityMap = {
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
const db = await createMemoryDb( 'my db', fooBarEntityKeys, createDefaultDbItem )

const { foo, bar } = db.collections

const fooId = await foo.create({ name: 'a', value: 0 })

const dbFoo = await foo.load( fooId )

const barId = await bar.create({ 
  name: 'b', value: 1, 
  foo: {
    _collection: 'foo',
    _id: fooId
  }
})

await bar.remove( barId )
```

### data store proxies

- metadata
- secure
- unique
- validator

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
