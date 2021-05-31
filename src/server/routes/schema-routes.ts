import { EntitySchemaMap } from '../../schema/types'
import { Route, Method, SchemaRoute, ActionType } from './types'
import { eachKeyValueMap } from '../../util/each'
import { kebabCase } from '../../util/lodash'
import { Request, Response } from 'express-serve-static-core'
import { Role } from '../../security/types'
import { EntitySchemaDb } from '../../db/types'
import { RequestHandler } from 'express'
import { canAccessSchema } from '../../security/schema-security'
import { log } from '@mojule/log-iisnode'

export const createSchemaRoutes = <TEntityMap>(
  schemaMap: EntitySchemaMap<TEntityMap>
) => {
  const routes: SchemaRoute<TEntityMap>[] = []

  eachKeyValueMap( schemaMap, ( schema, collectionKey ) => {
    const method: Method = 'get'
    const path = `/schema/${ kebabCase( collectionKey ) }`
    const handler = ( _req: Request, res: Response ) => res.json( schema )
    const handlers = [ handler ]
    const meta = { collectionKey }
    const route: SchemaRoute<TEntityMap> = {
      method, path, handlers, meta, roles: []
    }

    if (
      schema[ '_esRoles' ] &&
      Array.isArray( schema[ '_esRoles' ][ 'read' ] )
    ) {
      const schemaReadRoles = schema[ '_esRoles' ][ 'read' ] as Role[]

      route.roles = schemaReadRoles
    }

    routes.push( route )
  } )

  return routes
}

export const createEntitySchemaRouteHandler = <TEntityMap>(
  store: EntitySchemaDb<TEntityMap>,
  collectionKey: keyof TEntityMap,
  type: ActionType
) => {
  const handler: RequestHandler = async ( req, res, next ) => {
    const { user } = req

    const currentRoles: Role[] = []

    if ( user && Array.isArray( user[ 'roles' ] ) ) {
      currentRoles.push( ...user[ 'roles' ] )
    }

    const schemaMap = await store.getAllSchema()

    const schemaId = `#/${ kebabCase( collectionKey as string ) }`

    const schema = schemaMap[ schemaId ]

    if( schema === undefined ){
      const err = Error( `No schema found with $id ${ schemaId }` )

      next( err )

      return
    }

    if ( !canAccessSchema( schema, type, currentRoles ) ) {
      log.warn( 'Tried to access without roles', { collectionKey, user } )

      res.status( 403 ).send( '403 Forbidden' )

      return
    }

    next()
  }

  return handler
}
