import { fileSchema } from './file-schema'
import { fileCreateSchema } from './file-create-schema'
import { imageFileSchema } from './image-file-schema'
import { zipFileSchema } from './zip-file-schema'
import { EntitySchemaMap, IdSchema } from '../types'
import { FileEntityMap } from '../../entity/file/types'

export const fileEntitySchema: EntitySchemaMap<FileEntityMap> = {
  file: fileSchema,
  imageFile: imageFileSchema,
  zipFile: zipFileSchema
}

const fileCreate = Object.assign(
  {}, fileCreateSchema, { title: fileSchema.title }
) as IdSchema

const imageFileCreate = Object.assign(
  {}, fileCreateSchema, { title: imageFileSchema.title }
) as IdSchema

const zipFileCreate = Object.assign(
  {}, fileCreateSchema, { title: zipFileSchema.title }
) as IdSchema

export const fileEntityCreateSchema: EntitySchemaMap<FileEntityMap> = {
  file: fileCreate,
  imageFile: imageFileCreate,
  zipFile: zipFileCreate
}
