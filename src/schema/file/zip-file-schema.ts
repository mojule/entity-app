import { DbRefFor } from '../../db/types'
import { FileEntityMap } from '../../entity/file/types'
import { nameSchema } from '../common/name-schema'
import { pathSchema } from '../common/path-schema'
import { tagsSchema } from '../common/tags-schema'
import { fileMetadataSchema } from './common/file-metadata-schema'
import { fileRefSchema, imageFileRefSchema } from './refs'

export const zipFileSchema = {
  $id: '#/zip-file',
  title: 'ZIP File',
  type: 'object',
  properties: {
    name: nameSchema,
    tags: tagsSchema,
    meta: fileMetadataSchema,
    paths: {
      title: 'Paths',
      description: 'Paths in ZIP',
      type: 'array',
      items: pathSchema
    },
    files: {
      title: 'Files',
      description: 'Files in ZIP',
      type: 'array',
      items: fileRefSchema
    },
    images: {
      title: 'Images',
      description: 'Images in ZIP',
      type: 'array',
      items: imageFileRefSchema
    }
  },
  required: [ 'name', 'meta', 'paths', 'files', 'images' ]
} as const

