import { FromSchema } from 'json-schema-to-ts'
import { DbItem } from '../../types'
import { metadataDbItemSchema } from './schema'

export type Metadata = FromSchema<typeof metadataDbItemSchema>

export type MetadataDbItem = DbItem & Metadata
