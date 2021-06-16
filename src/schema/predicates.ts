import { EntitySchema, PatternSchema, PropertiesSchema } from './types'

export const isPatternSchema =
  (schema: EntitySchema): schema is PatternSchema =>
    typeof schema === 'object' && schema.type === 'string' &&
    typeof schema.pattern === 'string'


export const isPropertiesSchema = (
  schema: EntitySchema
): schema is PropertiesSchema => {
  if (typeof schema === 'boolean') return false
  if( schema.type !== 'object' ) return false
  if (typeof schema.properties !== 'object') return false

  return true
}
