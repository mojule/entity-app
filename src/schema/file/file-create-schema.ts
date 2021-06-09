import { tagsSchema } from '../common/tags-schema'

export const fileCreateSchema = {
  "$id": "#/file-create",
  "title": "Upload File",
  "type": "object",
  "properties": {
    "file": {
      "title": "Upload File",
      "type": "string",
      "format": "file"
    },
    "tags": tagsSchema
  }
} as const
