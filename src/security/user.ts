import * as bcrypt from 'bcryptjs'
import { UserData, UserEntity } from '..'
import { Role } from './types'

export const createUserEntity = async ( data: UserData, password: string ) => {
  password = await bcrypt.hash( password, 10 )

  const { name, email, roles } = data

  const userEntity: UserEntity = {
    name, email, roles: roles as Role[], password
  }

  return userEntity
}
