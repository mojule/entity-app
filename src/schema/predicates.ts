import { EntitySchema, PatternSchema } from './types'

export const isPatternSchema =
  ( schema: EntitySchema ): schema is PatternSchema =>
    typeof schema === 'object' && schema.type === 'string' && 
    typeof schema.pattern === 'string'
