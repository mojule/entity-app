import { EntityDb } from '../../db/types'
import { EntitySchemaMap, SchemaMap } from '../types'
import { createRefSchemaMap, refFactory } from '../ref'
import { refResolver } from './ref-resolver'
import { dbRefResolver } from './db-ref-resolver'

const createRef = refFactory( '#' )

export const schemaResolver = async <TEntityMap>(
  db: EntityDb<TEntityMap>,
  entityKey: keyof TEntityMap & string,
  entitySchemas: EntitySchemaMap<TEntityMap>,
  commonSchemas: SchemaMap = {}
) => {
  const refSchemas = createRefSchemaMap( entitySchemas, createRef )

  const allSchema = Object.assign(
    {}, commonSchemas, refSchemas, entitySchemas
  )

  const refResolvedSchema = refResolver( allSchema, entityKey )
  const dbResolvedSchema = await dbRefResolver(
    entityKey, refResolvedSchema, db
  )

  return dbResolvedSchema
}
