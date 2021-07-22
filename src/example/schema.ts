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
