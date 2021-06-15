import { IdSchema } from '../../types'
import { fileMetadataSchema } from './file-metadata-schema'
import { imageFileMetadataSchema } from './image-file-metadata-schema'

export const fileCommonSchema: Record<string,IdSchema> = {
  fileMetadata: fileMetadataSchema,
  imageFileMetadata: imageFileMetadataSchema,
}
