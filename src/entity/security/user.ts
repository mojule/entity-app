import { NamedEntity } from '../../entity/common/named'
import { DbRef } from '../../db/types'
import { SecurityEntityMap } from './types'
import { Role } from '../../security/types'
import { FromSchema } from 'json-schema-to-ts'
import { userSchema } from '../../schema/security/user-schema'

export type UserEntity = FromSchema<typeof userSchema>

export type PendingUserEntity = UserEntity & {
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
