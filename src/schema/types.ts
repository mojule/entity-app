import { KeyValueMap } from '@mojule/util'
import { JSONSchema } from 'json-schema-to-ts'
import { DeepReadonly } from 'json-schema-to-ts/lib/utils'

export type EntitySchema = JSONSchema

export type MaybeReadonly<T> = T | DeepReadonly<T>

export type IdSchemaBase = {
  $id: string  
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

export type DbRefSchemaBase<T extends string> = {
  $id: string
  title: string
  type: 'object'
  properties: DbRefSchemaProperties<T>
  required: [ '_id', '_collection' ]
}

export type DbRefSchema<T extends string = string> = DbRefSchemaBase<T>

export type DbRefSchemaProperties<T extends string = string> = {
  _id: {
    title: 'ID',
    type: 'string'
  },
  _collection: {
    title: 'Collection',
    type: 'string',
    enum: [ T ]
  }  
} 
