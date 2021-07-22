import { DbRefFor, EntityKeys } from '..'

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
