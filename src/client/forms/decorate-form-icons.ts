import { span } from '../utils/h'

export const decorateFormIcons = ( form: HTMLFormElement ) => {
  const buttons = Array.from<HTMLButtonElement>(
    form.querySelectorAll( 'button[data-action]' )
  )

  buttons.forEach( button => {
    const { action, iconLabel } = button.dataset

    if ( !action ) return
    if ( iconLabel !== undefined ) return

    if ( action.includes( 'delete' ) ) {
      button.dataset.iconLabel = 'remove'
    }

    if ( action.includes( 'add' ) || action.includes( 'create' ) ) {
      button.dataset.iconLabel = 'create'
    }

    const { innerText } = button

    button.innerText = ''

    button.appendChild( span( innerText ) )
  } )
}
