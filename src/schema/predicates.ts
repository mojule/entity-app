import { JSONSchema7 } from 'json-schema'
import { PatternSchema } from './types'

export const isPatternSchema =
  ( schema: JSONSchema7 ): schema is PatternSchema =>
    schema.type === 'string' && typeof schema.pattern === 'string'
