import { Role } from './types'

export const Roles: Record<Role,Role> = {
  admin: 'admin',
  user: 'user',
  currentUser: 'currentUser',
  public: 'public'
}

export const hasRole = ( roles: string[], role: string ) =>
  roles.includes( role )

export const hasAllRoles = ( required: string[], user: string[] ) => 
  required.every( r => hasRole( user, r ) )