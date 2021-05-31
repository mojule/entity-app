import { NamedEntity } from '../../entity/common/named'
import { DbRef } from '../../db/types'
import { SecurityEntityMap } from './types'
import { Role } from '../types'

export interface UserEntity extends NamedEntity {
  email: string
  password: string
  roles: Role[]
}

export interface PendingUserEntity extends UserEntity {
  secret: string
}

export interface UserData {
  _id?: string
  name: string
  email: string
  roles: string[]
}

export interface UserRef extends DbRef<SecurityEntityMap> {
  _collection: 'user'
}
