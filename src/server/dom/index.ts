import { JSDOM } from 'jsdom'
import { StrictSelect } from '../../dom/types'

export const createDom = ( html = '<!doctype html>' ) => new JSDOM( html )

const dom = createDom()

export const { document } = dom.window

export const fragment = JSDOM.fragment

export const strictSelect: StrictSelect = ( selectors, parent?) => {
  parent = parent || document

  const result = parent.querySelector( selectors )

  if ( result === null ) throw Error( 'Expected selectors' )

  return result
}