import { Link } from '../../templates/nav/types'
import { linksNav } from '../../templates/nav'
import { EntitySchemaMap } from '../../../schema/types'
import { kebabCase, startCase } from '../../../util/lodash'
import { headerEls } from './targeted-els'
import { defaultHeaderContent } from './header-content'
import { EntityCategories } from '../../../entity/types'
import { div, h1, span } from '../../../dom/h'
import { css } from '../../../dom/util'

export const entityNavigation = <
  TEntityMap, TEntityCategories extends EntityCategories<TEntityMap>
>(
  entityCategories: TEntityCategories,
  headerContent: Node | string = defaultHeaderContent,
  entitySchema?: EntitySchemaMap<TEntityMap>,
  entityCategory?: keyof TEntityCategories & string
) => {
  const nodes: HTMLElement[] = []

  nodes.push(primaryEntityNavigation(headerContent, entityCategories))

  if (entitySchema && entityCategory) {
    const entityCategorySlug = kebabCase(entityCategory)
    nodes.push(
      secondaryEntityNavigation(
        entitySchema,
        entityCategorySlug,
        entityCategories[entityCategory].keys
      )
    )
  }

  return div(
    headerEls(
      ...nodes
    )
  )
}

export const primaryEntityNavigation = <TEntityMap>(
  headerContent: Node | string,
  entityCategories: EntityCategories<TEntityMap>
) =>
  div(
    {
      class: 'navigation--primary'
    },
    css`
      .navigation--primary {
        font-size: 1.4rem;
        border-bottom: 1px dotted #ddd;
      }

      .navigation--primary a {
        text-decoration: none;
      }

      .navigation--primary h1 {
        display: inline;
      }
    `,
    linksNav(
      {
        content: headerContent,
        uri: './'
      },
      {
        content: span({ 'data-icon': 'hierarchySeparator' }, '>')
      },
      ...Object.keys(entityCategories).map(key => {
        const category = entityCategories[key]
        const { title } = category
        const slug = kebabCase(key)

        return { content: title, uri: `#/${slug}` }
      })
    )
  )

export const secondaryEntityNavigation = <TEntityMap>(
  entitySchema: EntitySchemaMap<TEntityMap>,
  entityCategorySlug: string,
  keys: (keyof TEntityMap)[]
) => {
  const links: Link[] = []

  keys.forEach(key => {
    const schema = entitySchema[key]
    const title = schema[ 'title' ] || startCase(key as string)
    const typeSlug = kebabCase(key as string)

    links.push({
      content: title,
      uri: `#/list/${entityCategorySlug}/${typeSlug}`
    })
  })

  const nav = div(
    {
      class: 'navigation--secondary'
    },
    css`
      .navigation--secondary {
        font-size: 1.3rem;
      }

      .navigation--secondary a {
        text-decoration: none;
      }
    `,
    linksNav(
      ...links
    )
  )

  return nav
}

export const defaultCreateEntityHeader = <
  TEntityMap, TEntityCategories extends EntityCategories<TEntityMap>
>(
  entityCategories: TEntityCategories,
  headerContent: Node | string = defaultHeaderContent,
  title: string,
  entitySchema?: EntitySchemaMap<TEntityMap>,
  entityCategory?: keyof TEntityCategories & string
) =>
  [
    entityNavigation(
      entityCategories, headerContent, entitySchema, entityCategory
    ),
    h1({ class: 'header-title' }, title, ' entities')
  ] 