import * as byteSizeSchema from './byte-size.schema.json'
import * as directorySchema from './directory.schema.json'
import * as filenameSchema from './filename.schema.json'
import * as mediaTypeSchema from './media-type.schema.json'
import * as nameSchema from './name.schema.json'
import * as pathSchema from './path.schema.json'
import * as tagsSchema from './tags.schema.json'

import { SchemaMap, PatternSchema, IdSchema } from '../types'

export const commonSchema: SchemaMap = {
  byteSize: byteSizeSchema as IdSchema,
  directory: directorySchema as PatternSchema,
  filename: filenameSchema as PatternSchema,
  mediaType: mediaTypeSchema as PatternSchema,
  name: nameSchema as IdSchema,
  path: pathSchema as PatternSchema,
  tags: tagsSchema as IdSchema
}
