import { DbRefFor } from '../../db/types'
import { SecurityEntityMap } from './types'
import { FromSchema } from 'json-schema-to-ts'
import { pendingUserSchema, userSchema } from '../../schema/security/user-schema'

export type UserEntity = FromSchema<typeof userSchema>

export type PendingUserEntity = FromSchema<typeof pendingUserSchema>

export interface UserData {
  _id?: string
  name: string
  email: string
  roles: string[]
}

export type UserRef = DbRefFor<SecurityEntityMap,'user'>
