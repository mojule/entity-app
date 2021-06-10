import { FromSchema } from 'json-schema-to-ts'
import { fileSchema } from '../../schema/file/file-schema'
import { zipFileSchema } from '../../schema/file/zip-file-schema'
import { imageFileSchema } from '../../schema/file/image-file-schema'

export type FileEntity = FromSchema<typeof fileSchema> 
export type ImageFileEntity = FromSchema<typeof imageFileSchema> 
export type ZipFileEntity = FromSchema<typeof zipFileSchema> 
