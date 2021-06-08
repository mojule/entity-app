import { eachObjectMap, clone } from '@mojule/util'
import traverse = require( '@entity-schema/json-schema-traverse' )
import { TraverseCallback } from '@entity-schema/json-schema-traverse/dist/types'

import { SchemaMap } from '../types'
import { JSONSchema7 } from 'json-schema'

export const refResolver = <TSchemaMap extends SchemaMap>(
  schemas: TSchemaMap, key: keyof TSchemaMap
) => {
  const idToKeyMap = new Map<string, keyof TSchemaMap>()

  eachObjectMap( schemas, ( schema, key: keyof TSchemaMap ) => {
    const { $id } = schema

    idToKeyMap.set( $id, key )
  } )

  const schema = clone( schemas[ key ] )

  const cb: TraverseCallback = ( schema: JSONSchema7 ) => {
    if( schema.$ref ){
      const refId = schema.$ref
      const key = idToKeyMap.get( refId )

      if( key === undefined )
        throw Error( `Expected a schema for ${ refId }` )

      const refSchema = schemas[ key ]

      delete schema.$ref

      Object.assign( schema, refSchema )
    }
  }

  traverse( schema, { cb } )

  return schema
}
