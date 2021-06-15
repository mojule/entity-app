import { nameSchema } from '../common/name-schema'
import { tagsSchema } from '../common/tags-schema'
import { imageFileMetadataSchema } from './common/image-file-metadata-schema'

export const imageFileSchema = {
  $id: '#/image-file',
  title: 'Image File',
  type: 'object',
  properties: {
    name: nameSchema,
    tags: tagsSchema,
    meta: imageFileMetadataSchema
  },
  required: [ 'name', 'meta' ]
} as const
