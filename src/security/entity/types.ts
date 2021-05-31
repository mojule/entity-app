import { ApiKeyEntity } from './api-key'
import { PendingUserEntity, UserEntity } from './user'
import { Role } from '../types'
import { ActionType } from '../../server/routes/types'
import { ResetPasswordEntity } from './reset-password'

export interface SecurityEntityMap {
  apiKey: ApiKeyEntity
  user: UserEntity
  pendingUser: PendingUserEntity
  resetPassword: ResetPasswordEntity
}

export type SchemaRoles = Record<ActionType,Role[]>
