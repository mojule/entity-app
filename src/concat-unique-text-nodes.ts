// TODO move to @mojule/dom and remove dep from package

import * as CleanCSS from 'clean-css'
import { CreateTag } from '@mojule/dom'

const cleanCss = new CleanCSS()

export const concatUniqueTextNodes = ( ...elements: HTMLElement[] ) => {
  const textSet = new Set()

  elements.forEach( el => textSet.add( el.textContent ) )

  return [ ...textSet ].join( '\n' )
}

export type CatableElement = HTMLScriptElement | HTMLStyleElement
export type CatableElements = CatableElement[]
export type CatableWrapper = CreateTag<'style'> | CreateTag<'script'>

export const concatAndMove = ( wrapper: CatableWrapper, target: HTMLElement, ...elements: CatableElements ) => {
  const text = concatUniqueTextNodes( ...elements )
  elements.forEach( el => el.remove() )
  if ( text ) {
    target.appendChild( wrapper( text ) )
  }
}

export const concatAndMoveCss = ( wrapper: CatableWrapper, target: HTMLElement, ...elements: CatableElements ) => {
  let css = concatUniqueTextNodes( ...elements )

  elements.forEach( el => el.remove() )

  if ( css ) {
    //const start = process.hrtime()
    const minified = cleanCss.minify( css )
    //const end = process.hrtime( start )
    //log.debug( `css minify time: ${ end[ 0 ] * 1e3 + end[ 1 ] / 1e6 }ms` )

    target.appendChild( wrapper( minified.styles ) )
  }
}
