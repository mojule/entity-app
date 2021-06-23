import { FromSchema } from 'json-schema-to-ts'
import { fileSchema } from '../../schema/file/file-schema'
import { zipFileSchema } from '../../schema/file/zip-file-schema'
import { imageFileSchema } from '../../schema/file/image-file-schema'
import { EntityKeys } from '../types'
import { FileEntityMap } from './types'

export type FileEntity = FromSchema<typeof fileSchema> 
export type ImageFileEntity = FromSchema<typeof imageFileSchema> 
export type ZipFileEntity = FromSchema<typeof zipFileSchema> 

export const fileEntityKeys: EntityKeys<FileEntityMap> = {
  file: 'file',
  imageFile: 'imageFile',
  zipFile: 'zipFile'
}
