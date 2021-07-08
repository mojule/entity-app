import { DbItem } from '../../types'

export type Metadata = {
  _v: number
  _created: string
  _updated: string
}

export type MetadataDbItem = DbItem & Metadata
