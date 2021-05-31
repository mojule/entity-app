import { ClientRoute } from './types'
import { EntitySchemaMap } from '../../../schema/types'
import { entityNavigation } from '../templates/entity-navigation'
import { defaultHeaderContent } from '../templates/header-content'
import { fragment } from '../../utils/h'
import { EntityCategories } from '../../../entity/types'
import { error } from '../../templates/error'

export const createRootRoute = <
  TEntityMap, TEntityCategories extends EntityCategories<TEntityMap>
>(
  entityCategories: TEntityCategories
) => {
  const route: ClientRoute = {
    method: 'get',
    path: '/',
    handlers: [
      ( _req, res ) => {
        res.send(
          fragment(
            entityNavigation<TEntityMap, TEntityCategories>( entityCategories )
          )
        )
      }
    ]
  }

  return route
}

export const createSecondaryRoute = <
  TEntityMap, TEntityCategories extends EntityCategories<TEntityMap>
>(
  entityCategories: TEntityCategories,
  entitySchema: EntitySchemaMap<TEntityMap>,
  headerContent = defaultHeaderContent
) => {
  const route: ClientRoute = {
    method: 'get',
    path: `/:entityCategory`,
    handlers: [
      ( req, res ) => {
        const entityCategory = req.params.entityCategory

        if ( typeof entityCategory !== 'string' ){
          res.send(
            error(
              Error( 'Expected parameter "entityCategory" to be string' )
            )
          )
          return
        }

        if ( !( entityCategory in entityCategories ) ){
          res.send(
            error(
              Error( `Expected ${ entityCategory } in entityCategories` )
            )
          )
          return
        }

        res.send(
          fragment(
            entityNavigation(
              entityCategories, headerContent, entitySchema, entityCategory
            )
          )
        )
      }
    ]
  }

  return route
}
