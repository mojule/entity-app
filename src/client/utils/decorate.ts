import { ObjectMap } from '../../util/types'
import { fragment } from './h'
import { eachObjectMap } from '../../util/each';

export const decorateData = (
  data: ObjectMap<string>, ...els: HTMLElement[]
) => {
  els.forEach( el => Object.assign( el.dataset, data ) )


  return fragment( ...els )
}

export const decorateAttributes = (
  attr: ObjectMap<string>, ...els: HTMLElement[]
) => {
  els.forEach( el => {
    eachObjectMap( attr, ( value, key ) => {
      el.setAttribute( key, value )
    } )
  } )

  return fragment( ...els )
}
