import { KeyValueMap } from '@mojule/util'
import { JSONSchema } from 'json-schema-to-ts'
import { DeepReadonly } from 'json-schema-to-ts/lib/utils'
import { SchemaRoles } from '../entity/security/types'

export type EntitySchema = JSONSchema

export type MaybeReadonly<T> = T | DeepReadonly<T>

export type IdSchemaBase = {
  $id: string
  _esRoles?: SchemaRoles
}

export type IdSchema = EntitySchema & MaybeReadonly<IdSchemaBase>

export type EntitySchemaMap<TEntityMap> = KeyValueMap<TEntityMap,IdSchema>

export type SchemaMap = Record<string,IdSchema>

export type PatternSchemaBase = {
  type: 'string'
  pattern: string
}

export type PropertiesSchema = EntitySchema & { 
  type: 'object'
  properties: Record<string, EntitySchema> 
}

export type PatternSchema = IdSchema & MaybeReadonly<PatternSchemaBase>

export type DbRefSchemaBase = {
  $id: string
  title: string
  type: 'object'
  properties: DbRefSchemaProperties
  required: [ '_id', '_collection' ]
}

export type DbRefSchema = IdSchema & MaybeReadonly<DbRefSchemaBase>

export type DbRefSchemaProperties = {
  _id: {
    title: 'ID',
    type: 'string'
  },
  _collection: {
    title: 'Collection',
    type: 'string',
    enum: [ string ]
  }  
} 
