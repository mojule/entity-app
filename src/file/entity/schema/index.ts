import * as fileSchema from './file.schema.json'
import * as fileCreateSchema from './file-create.schema.json'
import * as imageFileSchema from './image-file.schema.json'
import * as zipFileSchema from './zip-file.schema.json'
import { SchemaMap, IdSchema } from '../../../schema/types'

export const fileEntitySchema: SchemaMap = {
  file: fileSchema as IdSchema,
  imageFile: imageFileSchema as IdSchema,
  zipFile: zipFileSchema as IdSchema
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
