import { RequestHandler } from 'express'
import { PendingUserEntity, UserEntity } from '../entity/user'

export type ForgotPasswordOptions = {
  changePasswordHandlers?: RequestHandler[]
  notifyUserPasswordReset: ( user: UserEntity, secret: string ) => Promise<void>
  notifyUserPasswordChange: ( user: UserEntity ) => Promise<void>
}

export type LoginOptions = {
  loginHandlers: RequestHandler[]
}

export type RegisterOptions = {
  registerHandlers?: RequestHandler[]
  notifyUserVerifyEmail: ( pendingUser: PendingUserEntity ) => Promise<void>
}