import { randId } from '@mojule/util'
import { createMemoryDb } from '../..'
import { secureDbFactory } from '../../db/proxies/secure'

import { 
  SecureDbItem, SecureEntityMap, SecureUser 
} from '../../db/proxies/secure/types'

import { EntityKeys } from '../../entity/types'

export type PublicThing = {
  name: string
  value: number
}

export type EntityMap = SecureEntityMap & {
  publicThing: PublicThing
}

export const entityKeys: EntityKeys<EntityMap> = { 
  publicThing: 'publicThing',
  user: 'user',
  group: 'group',
  collectionData: 'collectionData'
}

export const getRootUser = (): SecureUser => ({
  name: 'Nik',
  password: 'goobers'
})

export const createSecureMemDbLogin = async () => {
  const createSecureDbItem = () => {
    const now = Date.now()
  
    const dbItem: SecureDbItem = {
      _id: randId(),
      _atime: now,
      _ctime: now,
      _mtime: now,
      _group: {
        _collection: 'group',
        _id: ''
      },
      _owner: {
        _collection: 'user',
        _id: ''
      },
      _mode: 0o0700
    }

    return dbItem    
  }

  const memDb = await createMemoryDb(
    '', entityKeys, createSecureDbItem
  )

  const login = await secureDbFactory(
    memDb, getRootUser()
  )

  return { login, memDb }
}
