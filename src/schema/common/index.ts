import { byteSizeSchema } from './byte-size-schema'
import { directorySchema } from './directory-schema'
import { filenameSchema } from './filename-schema'
import { mediaTypeSchema } from './media-type-schema'
import { nameSchema } from './name-schema'
import { pathSchema } from './path-schema'
import { tagsSchema } from './tags-schema'

export const commonSchema = {
  byteSize: byteSizeSchema,
  directory: directorySchema,
  filename: filenameSchema,
  mediaType: mediaTypeSchema,
  name: nameSchema,
  path: pathSchema,
  tags: tagsSchema
}
