import { ClientRoute } from '../types'
import { defaultHeaderContent } from '../../templates/header-content'
import { camelCase, startCase, kebabCase } from '../../../../util/lodash'
import { EntitySchemaMap, SchemaMap } from '../../../../schema/types'
import { createSchemaForm } from '../../../forms/schema-form'
import { entityNavigation } from '../../templates/entity-navigation'
import { h1, fragment } from '../../../../dom/h'
import { headerEls } from '../../templates/targeted-els'
import { headerTitleStyle } from '../../../css/header-title'
import { entityFormStyle } from '../../../css/entity-form'
import { EntityDb } from '../../../../db/types'
import { SpaResponse } from '@mojule/spa-router'
import { error } from '../../../templates/error'
import { getData } from '../../../forms/get-data'
import { schemaResolver } from '../../../../schema/resolve/resolver'
import { EntityCategories } from '../../../../entity/types'

export const createEntityEditRoute = <TEntityMap>(
  db: EntityDb<TEntityMap>,
  entityCategories: EntityCategories<TEntityMap>,
  entityEditSchemas: EntitySchemaMap<TEntityMap>,
  commonSchemas: SchemaMap = {},
  headerContent = defaultHeaderContent
) => {
  const route: ClientRoute = {
    method: 'get',
    path: `/edit/:entityCategory/:entityType/:id`,
    handlers: [
      async ( req, res ) => {
        if ( typeof req.params.entityCategory !== 'string' ) {
          return res.send(
            error( Error( 'Expected "entityCategory" parameter to be string' ) )
          )
        }

        if ( typeof req.params.entityType !== 'string' ) {
          return res.send(
            error( Error( 'Expected "entityType" parameter to be string' ) )
          )
        }

        if ( typeof req.params.id !== 'string' ) {
          return res.send(
            error( Error( 'Expected "id" parameter to be string' ) )
          )
        }

        const id = req.params.id
        const entityTypeSlug = req.params.entityType
        const entityCategorySlug = req.params.entityCategory

        const entityKey = camelCase( entityTypeSlug ) as keyof TEntityMap & string

        const schema = await schemaResolver<TEntityMap>(
          db, entityKey, entityEditSchemas, commonSchemas
        )

        const title = schema[ 'title' ] || startCase( entityKey as string )

        const existing = await db.collections[ entityKey ].load( id )

        const entityForm = createSchemaForm( schema, title, existing )

        entityForm.addEventListener( 'submit', async e => {
          e.preventDefault()

          await onEditSubmit( entityForm, entityKey, entityCategorySlug, id, res )
        } )

        const header: HTMLElement[] = [
          entityNavigation(
            entityCategories, headerContent, entityEditSchemas, 'entity'
          ),
          h1( { class: 'header-title' }, `Update ${ title }` )
        ]

        const content = fragment(
          headerTitleStyle,
          entityFormStyle,
          headerEls( ...header ),
          entityForm
        )

        res.send( content )
      }
    ]
  }

  const onEditSubmit = async (
    form: HTMLFormElement, entityKey: keyof TEntityMap & string,
    entityCategorySlug: string, id: string, res: SpaResponse<DocumentFragment>
  ) => {
    const data = getData( form )
    const collection = db.collections[ entityKey ]
    const entityTypeSlug = kebabCase( entityKey )

    data._id = id

    try {
      await collection.save( data )
    } catch ( err ) {
      res.send( error( err ) )
      return
    }


    res.redirect( `/list/${ entityCategorySlug }/${ entityTypeSlug }` )
  }

  return route
}
