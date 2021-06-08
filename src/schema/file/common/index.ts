import * as fileMetadataSchema from './file-metadata.schema.json'
import * as imageFileMetadataSchema from './image-file-metadata.schema.json'

import { SchemaMap, IdSchema } from '../../types'

export const fileCommonSchema: SchemaMap = {
  fileMetadata: fileMetadataSchema as IdSchema,
  imageFileMetadata: imageFileMetadataSchema as IdSchema,
}
