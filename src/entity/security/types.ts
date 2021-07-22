import { ApiKeyEntity } from './api-key'
import { ResetPasswordEntity } from './reset-password'

export interface SecurityEntityMap {
  apiKey: ApiKeyEntity
  pendingUser: never
  resetPassword: ResetPasswordEntity
}
