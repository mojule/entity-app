import { nameSchema } from '../common/name-schema'
import { tagsSchema } from '../common/tags-schema'
import { fileMetadataSchema } from './common/file-metadata-schema'

export const fileSchema = {
  "$id": "#/file",
  "title": "File",
  "type": "object",
  "properties": {
    "name": nameSchema,
    "tags": tagsSchema,
    "meta": fileMetadataSchema
  },
  "required": [ "name", "meta" ]
} as const
