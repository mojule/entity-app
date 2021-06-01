import { EntityDb, DbItem } from '../../../../db/types'
import { EntityTemplates, EntityTemplate } from '../../types'
import { ClientRoute } from '../types'
import { resolveRefsShallow } from '../../../../db/ref'
import { fragment } from '../../../../dom/h'
import { error } from '../../../templates/error'
import { EntitySchemaMap } from '../../../../schema/types'
import { headerEls, footerEls } from '../../templates/targeted-els'
import { createPagination } from '../../templates/pagination'
import { entityCards, EntityCardModel, EntityCardsModel } from '../../templates/entity-cards'
import { defaultHeaderContent } from '../../templates/header-content'
import { camelCase, startCase } from '../../../../util/lodash'
import { headerTitleStyle } from '../../../css/header-title'
import { EntityCategories } from '../../../../entity/types'

export type EntityPredicate<TEntityMap, TKey extends keyof TEntityMap = keyof TEntityMap> = ( 
  item: (TEntityMap[TKey] & DbItem),
  entityKey: TKey
) => boolean

const defaultEntityPredicate = () => true

export const createEntityListRoute = <TEntityMap, TTemplateMap extends TEntityMap>(
  db: EntityDb<TEntityMap>,
  entityCategories: EntityCategories<TEntityMap>,
  entitySchema: EntitySchemaMap<TEntityMap>,
  templates: EntityTemplates<TTemplateMap>,
  createEntityHeader: ( ...args: any[] ) => HTMLElement[],
  headerContent = defaultHeaderContent,
  filter: EntityPredicate<TEntityMap> = defaultEntityPredicate
) => {
  const route: ClientRoute = {
    method: 'get',
    path: `/list/:entityCategory/:entityType/:start?/:count?`,
    handlers: [
      async ( req, res ) => {
        if ( typeof req.params.entityType !== 'string' )
          return res.send(
            error( Error( 'Expected entityType parameter to be string' ) )
          )

        if ( typeof req.params.entityCategory !== 'string' )
          return res.send(
            error( Error( 'Expected entityCategory parameter to be string' ) )
          )

        const typeSlug = req.params.entityType
        const entityKey = camelCase( typeSlug ) as keyof TEntityMap
        const categorySlug = req.params.entityCategory
        const entityCategory = camelCase( categorySlug )

        let count = -1

        if ( req.params.count === undefined ) {
          const savedCount = localStorage.getItem(
            `/list/${ categorySlug }/${ typeSlug }/count`
          )

          count = savedCount !== null ? Number( savedCount ) : 10
        } else {
          count = Number( req.params.count )
        }

        if ( req.params.start === undefined ) {
          return res.redirect(
            `/list/${ categorySlug }/${ typeSlug }/0/${ count }`
          )
        }

        const start = Number( req.params.start )
        const collection = db.collections[ entityKey ]

        localStorage.setItem(
          `/list/${ categorySlug }/${ typeSlug }/count`,
          String( count )
        )

        try {
          const schema = entitySchema[ entityKey ]
          
          const template = (
            templates[ entityKey ] as 
            EntityTemplate<TEntityMap[ keyof TEntityMap ]>
          )

          const title = schema[ 'title' ] || startCase( entityKey as string )

          const allEntities = await collection.loadMany( await collection.ids() )
          
          const dbEntities = allEntities.filter( 
            e => filter( e, entityKey ) 
          ).reverse()

          if ( count < 0 ) count = dbEntities.length

          const resolvedEntities = await Promise.all(
            dbEntities.slice( 
              start, start + count 
            ).map( 
              d => resolveRefsShallow( db, d ) 
            )
          ) as ( TEntityMap[ keyof TEntityMap ] & DbItem )[]

          const { show, pagination } = createPagination(
            {
              path: `#/list/${ categorySlug }/${ typeSlug }`,
              total: dbEntities.length,
              start,
              count
            }
          )

          const header: HTMLElement[] = [
            ...createEntityHeader(
              entityCategories, headerContent, title, entitySchema, 
              entityCategory
            )
          ]         

          if ( resolvedEntities.length > 0 ) {
            header.push( show )
          }

          const footer: HTMLElement[] = []

          if ( dbEntities.length > count ) {
            footer.push( pagination )
          }

          const cards: EntityCardModel[] = []

          const entityCardsModel: EntityCardsModel = {
            title,
            createEntityPath: `#/create/${ categorySlug }/${ typeSlug }`,
            entityCardModels: cards
          }

          resolvedEntities.forEach( entity => {
            const id = entity._id
            const entityView = template( entity )
            const editPath = `#/edit/${ categorySlug }/${ typeSlug }/${ id }`
            const removePath = `#/remove/${ categorySlug }/${ typeSlug }/${ id }`
            const viewPath = `#/view/${ categorySlug }/${ typeSlug }/${ id }`

            const cardModel: EntityCardModel = {
              id, entityView, editPath, removePath, viewPath
            }

            cards.push( cardModel )
          } )

          const content = fragment(
            headerTitleStyle,
            headerEls( ...header ),
            entityCards( entityCardsModel ),
            footerEls( ...footer )
          )

          res.send( content )
        } catch ( err ) {
          res.send( error( err ) )
        }
      }
    ]
  }

  return route
}

