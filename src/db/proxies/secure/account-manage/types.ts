import { FromSchema } from 'json-schema-to-ts'
import { EntityKeys } from '../../../../entity/types'
import { LoginUser } from '../types'
import { userSecretSchema, pendingUserSchema } from './schema'

export type PendingUser = FromSchema<typeof pendingUserSchema>

export type UserSecret = FromSchema<typeof userSecretSchema>

export type AccountManageEntityMap = {
  pendingUser: PendingUser,
  userSecret: UserSecret
}

export const accountManageEntityKeys: EntityKeys<AccountManageEntityMap> = {
  pendingUser: 'pendingUser',
  userSecret: 'userSecret'
}

export type AccountFns = {
  createPendingUser: CreatePendingUser
  verifyPendingUser: VerifyPendingUser
  createSecret: CreateSecret
  userForSecret: UserForSecret
  forgotPassword: ForgotPassword
  resetPassword: ResetPassword
  cleanSecrets: CleanSecrets
  cleanPendingUsers: CleanPendingUsers
  tempSecretForUser: TempSecretForUser
}

export type SecretType = 'api-key' | 'forgot-password' | 'temp'

export type CreatePendingUser = (user: LoginUser) => Promise<string>

export type VerifyPendingUser = ( secret: string ) => Promise<string>

export type CreateSecret = ( userName: string, type?: SecretType ) => Promise<string>

export type UserForSecret = ( secret: string, type?: SecretType  ) => Promise<string>

export type ForgotPassword = ( userName: string ) => Promise<string>

export type ResetPassword = 
  ( secret: string, newPassword: string ) => Promise<void>

export type CleanSecrets = ( maxAgeMs: number ) => Promise<void>

export type CleanPendingUsers = ( maxAgeMs: number ) => Promise<void>

export type TempSecretForUser = ( userName: string ) => Promise<string>
