import { FromSchema } from 'json-schema-to-ts'
import { fileMetadataSchema } from '../../schema/file/common/file-metadata-schema'
import { imageFileMetadataSchema } from '../../schema/file/common/image-file-metadata-schema'

export type FileMetadata = FromSchema<typeof fileMetadataSchema>

export type ImageFileMetadata = FromSchema<typeof imageFileMetadataSchema>
