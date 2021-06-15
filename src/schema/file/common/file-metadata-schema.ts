import { mediaTypeSchema } from '../../common/media-type-schema'
import { pathSchema } from '../../common/path-schema'

export const fileMetadataSchema = {
  $id: '#/file-metadata',
  title: 'File Metadata',
  type: 'object',
  properties: {
    path: pathSchema,
    mimetype: mediaTypeSchema,
    size: {
      type: 'integer',
      minimum: 0
    }
  },
  additionalProperties: false,
  required: [ 'path', 'mimetype', 'size' ]
} as const
