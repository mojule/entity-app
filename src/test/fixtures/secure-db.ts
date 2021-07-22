import { createMemoryDb } from '../..'
import { secureDbFactory } from '../../db/proxies/secure'
import { createSecureDbItem } from '../../db/proxies/secure/secure-db-item'

import { 
  LoginUser,
  SecureEntityMap, SecureUser 
} from '../../db/proxies/secure/types'

import { EntityKeys } from '../../entity/types'
import { PublicThing } from './common'

export type PublicThingEntityMap = SecureEntityMap & {
  publicThing: PublicThing
}

export const entityKeys: EntityKeys<PublicThingEntityMap> = { 
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
  const memDb = await createMemoryDb(
    '', entityKeys, createSecureDbItem
  )

  const login = await secureDbFactory(
    memDb, getRootUser()
  )

  return { login, memDb }
}

export const getLoginBob = (): LoginUser => 
  ({ name: 'Bob', password: 'Boogers' })
