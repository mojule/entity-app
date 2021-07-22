import { EntitySchemaMap, IdSchema, DbRefSchema } from '../types'
import { EntityDb } from '../../db/types'
import traverse = require('@entity-schema/json-schema-traverse')
import { TraverseCallback } from '@entity-schema/json-schema-traverse/dist/types'
import { JSONSchema7 } from 'json-schema'
import { eachAsync, clone, camelCase } from '@mojule/util'
import { isDbRefSchema } from '../ref'

export const dbRefResolver = async <TEntityMap, TKey extends keyof TEntityMap>(
  _key: TKey,
  schema: EntitySchemaMap<TEntityMap>[TKey],
  db: EntityDb<TEntityMap>
) => {
  schema = clone(schema)

  const dbRefSchemas: DbRefSchema[] = []

  const cb: TraverseCallback = (schema: JSONSchema7) => {
    if (schema.$id === undefined) return

    const idSchema = schema as IdSchema

    if (isDbRefSchema(idSchema)) {
      dbRefSchemas.push(idSchema)
    }
  }

  traverse(schema, { cb })

  await eachAsync(dbRefSchemas, async dbRefSchema => {
    const { _collection } = dbRefSchema.properties
    const [slug] = _collection.enum
    const entityKey = camelCase(slug) as keyof TEntityMap
    const collection = db.collections[entityKey]

    if (!collection) throw Error(`Expected ${entityKey} in db.collections`)

    const ids = await collection.ids()
    const entities = await collection.loadMany(ids)

    const titles = entities.map<string>(
      (e, i) => (
        typeof e['name'] === 'string' ? e['name'] : `${entityKey} ${i + 1}`
      )
    )

    dbRefSchema.properties._id['enum'] = ids
    dbRefSchema.properties._id['_enumTitles'] = titles
  })

  return schema
}