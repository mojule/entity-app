import { createMetadataDbItem } from '../metadata'
import { SecureDbItem } from './types'

export const createSecureDbItem = () => {
  const metadataDbItem = createMetadataDbItem()

  const dbItem = {
    _group: {
      _collection: 'group' as const,
      _id: ''
    },
    _owner: {
      _collection: 'user' as const,
      _id: ''
    },
    _mode: 0o0700
  }

  const secureDbItem: SecureDbItem = Object.assign(
    metadataDbItem, dbItem
  )

  return secureDbItem    
}
