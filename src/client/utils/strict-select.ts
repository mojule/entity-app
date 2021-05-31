import { StrictSelect } from '../../dom/types'

export const strictSelect: StrictSelect = ( 
  selectors: string, parent?: ParentNode | undefined 
) => {
  parent = parent || document

  const result = parent.querySelector( selectors )

  if( result === null ) throw Error( 'Expected selectors' )

  return result
}
