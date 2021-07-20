import { createDefaultDbItem, createMemoryDb } from '../..'
import { DbRefFor } from '../../db/types'
import { EntityKeys } from '../../entity/types'

export type RefDbEntityMap = {
  foo: RefDbFoo
  bar: RefDbBar
  baz: RefDbBaz
  qux: RefDbQux
}

export type RefDbModelMap = Record<keyof RefDbEntityMap,{}> & {
  foo: RefDbFooModel
  bar: RefDbBarModel
  baz: RefDbBazModel
  qux: RefDbQuxModel
}

export type RefDbFoo = {
  name: string
  bar?: DbRefFor<RefDbEntityMap,'bar'>
  qux?: DbRefFor<RefDbEntityMap,'qux'>
}

export type RefDbFooModel = {
  name: string
  bar?: RefDbBarModel
}

export type RefDbBar = {
  name?: string
  baz: DbRefFor<RefDbEntityMap,'baz'>
}

export type RefDbBarModel = {
  name?: string
  baz: RefDbBazModel
}

export type RefDbBaz = {
  name: string
  quxes: DbRefFor<RefDbEntityMap,'qux'>[]
}

export type RefDbBazModel = {
  name: string
  quxes: RefDbQuxModel[]
}

export type RefDbQux = {
  name: string
  foo?: DbRefFor<RefDbEntityMap,'foo'>
}

export type RefDbQuxModel = {
  name: string
  foo?: RefDbFooModel
}

const refDbEntityKeys: EntityKeys<RefDbEntityMap> = {
  foo: 'foo',
  bar: 'bar',
  baz: 'baz',
  qux: 'qux'
}

export const createRefDb = async () => createMemoryDb(
  '', refDbEntityKeys, createDefaultDbItem
)