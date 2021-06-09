import { fileSchema } from './file-schema'
import { fileCreateSchema } from './file-create-schema'
import { imageFileSchema } from './image-file-schema'
import { zipFileSchema } from './zip-file-schema'
import { IdSchema, SchemaMap } from '../types'

export const fileEntitySchema = {
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

export const fileEntityCreateSchema: SchemaMap = {
  file: fileCreate,
  imageFile: imageFileCreate,
  zipFile: zipFileCreate
}
