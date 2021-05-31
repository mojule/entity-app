import { Role } from './types'
import { Handler } from 'express'
import { hasAllRoles } from './roles'

export const createRolesHandler = ( requiredRoles: Role[] ) => {
  const handler: Handler = ( req, _res, next ) => {
    const user = req.user 

    let currentRoles: Role[] = []

    if( user && Array.isArray( user[ 'roles' ] ) ){
      currentRoles = user[ 'roles' ]
    }

    const isInRoles = hasAllRoles( requiredRoles, currentRoles )    

    if( !isInRoles ){
      const err = Error( 'User is not authorized to perform this action' )
      
      next( err )

      return 
    }

    next()
  }

  return handler
}
