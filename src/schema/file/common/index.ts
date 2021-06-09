import { fileMetadataSchema } from './file-metadata-schema'
import { imageFileMetadataSchema } from './image-file-metadata-schema'

export const fileCommonSchema = {
  fileMetadata: fileMetadataSchema,
  imageFileMetadata: imageFileMetadataSchema,
}
