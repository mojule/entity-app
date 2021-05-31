import { unwrap } from '../utils/unwrap'

export const dedupeFieldsets = ( form: HTMLFormElement ) => {
  const fieldsets = Array.from( form.querySelectorAll( 'fieldset' ) )

  fieldsets.forEach( fieldset => {
    const { parentElement } = fieldset

    if ( parentElement === null ) return

    const legend = Array.from( fieldset.children ).find(
      el => el.matches( 'legend' )
    )

    if ( legend === undefined ) return

    if ( parentElement.matches( 'fieldset' ) ) {
      const parentLegend = Array.from( parentElement.children ).find(
        el => el.matches( 'legend' )
      )

      if ( parentLegend === undefined ) return

      if ( parentLegend.innerHTML === legend.innerHTML ) {
        unwrap( fieldset )
        legend.remove()
      }
    }
  } )
}
