import { mediaTypeSchema } from '../../common/media-type-schema'
import { pathSchema } from '../../common/path-schema'

export const imageFileMetadataSchema = {
  $id: '#/image-file-metadata',
  title: 'Image File Metadata',
  type: 'object',
  properties: {
    path: pathSchema,
    mimetype: mediaTypeSchema,
    size: {
      type: 'integer',
      minimum: 0
    },
    width: {
      type: 'integer'
    },
    height: {
      type: 'integer'
    }
  },
  additionalProperties: false,
  required: [ 'path', 'mimetype', 'size', 'width', 'height' ]
} as const
