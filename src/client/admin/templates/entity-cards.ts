import { cards } from './cards'

import {
  li, a, span, div, input, label, nav, ul
} from '../../../dom/h'

import { css } from '../../../dom/util'

export interface EntityCardsModel {
  title: string
  createEntityPath: string
  entityCardModels: EntityCardModel[]
}

export interface EntityCardModel {
  id: string
  entityView: Node
  viewPath: string
  editPath: string
  removePath: string
}

export const entityCards = ( model: EntityCardsModel ) => {
  const { title, createEntityPath, entityCardModels } = model

  const addEntityCard = li(
    a(
      {
        href: createEntityPath,
        'data-icon-label': 'create',
        class: 'icon-card'
      },
      span( `New ${ title }` )
    )
  )

  const children: HTMLLIElement[] = [
    addEntityCard,
    ...entityCardModels.map( entityCard )
  ]

  const entityCards = div(
    { class: 'entity-cards' },
    cards( ...children ),
    entityCardsStyle
  )

  return entityCards
}

export const createActionLi = ( path: string, icon: string, title: string ) => {
  if( path.trim() === '' ) return ''

  return li(
    a(
      {
        href: path,
        'data-icon': icon
      },
      title
    )
  )
}

export const entityCard = ( model: EntityCardModel ) => {
  const { id, entityView, editPath, removePath, viewPath } = model

  const card = li(
    div(
      { class: 'entity card', 'data-id': id },
      entityView,
      input( {
        type: 'checkbox',
        name: `is-selected-${ id }`,
        id: `is-selected-${ id }`
      } ),
      label(
        {
          for: `is-selected-${ id }`
        }
      )
    ),
    nav(
      { class: 'actions' },
      ul(
        createActionLi( viewPath, 'view', 'View' ),
        createActionLi( editPath, 'edit', 'Edit' ),
        createActionLi( removePath, 'remove', 'Remove' )
      )
    )
  )

  return card
}

const entityCardsStyle = css`
  .entity-cards .entity label {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
  }

  .entity-cards .entity input[type="checkbox"] {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 2;
  }

  .entity-cards .entity:hover label {
    background: rgba( 51, 153, 255, 0.0625 );
  }

  .entity-cards .entity :checked ~ label {
    background: rgba( 51, 153, 255, 0.125 );
  }

  .entity-cards .actions {
    border-top: 1px solid #ddd;
  }
`