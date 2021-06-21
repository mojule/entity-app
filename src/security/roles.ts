import { Role, RoleMap } from './types'

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

export const addRolesToSchema = <T>( 
  schema: T, roles: RoleMap, propertyRoles?: Record<string,RoleMap>
) => {
  const roleSchema = Object.assign(
    {}, schema, { _esRoles: roles }
  )

  if( propertyRoles ){
    if( schema[ 'properties' ] ){
      Object.keys( propertyRoles ).forEach( key => {
        const property = schema[ 'properties' ][ key ]

        if( !property ) return
        
        property._esRoles = propertyRoles[ key ]
      })
    }
  }

  return roleSchema
}
