import { i } from '../../dom/h'

export const iconDecorator = <T extends IconClassMap>( classMap: T ) => {
  const icons = <HTMLElement[]>[
    ...document.querySelectorAll( '[data-icon], [data-icon-label]' )
  ]

  icons.forEach( el => {
    const existing = el.querySelector( 'i' )

    if( existing ) return

    const { icon, iconLabel } = el.dataset

    if ( iconLabel && iconLabel in classMap ){
      const iconElement = i( { class: classMap[ iconLabel ] } )

      el.prepend( iconElement )
    } else if( icon && icon in classMap ){
      const iconElement = i( { class: classMap[ icon ] } )

      iconElement.title = el.innerText

      el.innerHTML = ''

      el.append( iconElement )
    }
  } )
}

export type IconWeight = 'solid' | 'regular' | 'light'

export interface IconClassMap {
  create: string
  edit: string
  remove: string
  hierarchySeparator: string
  view: string
}
