import { CreateElement, H, NodeOrString } from './types'
import { ObjectMap } from '../util/types'
import { eachObjectMap } from '../util/each'

export const createH = ( document: Document ) => {
  const createElement: CreateElement = (
    name: string, ...args: any[]
  ) => {
    if ( args.length === 0 ) return createEl( name, {} )

    const [ first, ...nodes ] = args

    if ( typeof first === 'string' || isNode( first ) ) {
      return createEl( name, {}, ...args )
    }

    return createEl( name, first, ...nodes )
  }

  const createEl = (
    name: string, attributes: ObjectMap<string>, ...childNodes: NodeOrString[]
  ) => {
    const el = document.createElement( name )

    eachObjectMap( attributes, ( value, key ) => {
      el.setAttribute( key, value )
    } )

    try {
      childNodes.forEach( n =>
        el.appendChild(
          typeof n === 'string' ? createTextNode( n ) : n
        )
      )
    } catch( err ){
      //console.log( { name, attributes, childNodes } )

      throw err
    }

    return el
  }

  const createTextNode = ( content = '' ) => document.createTextNode( content )

  const createFragment = ( ...childNodes: NodeOrString[] ) => {
    const fragment = document.createDocumentFragment()

    childNodes.forEach( n =>
      fragment.appendChild(
        typeof n === 'string' ? createTextNode( n ) : n
      )
    )

    return fragment
  }

  const handler: ProxyHandler<H> = {
    get: ( _obj, name ) => {
      if ( name === 'element' ) return createElement
      if ( name === 'text' ) return createTextNode
      if ( name === 'fragment' ) return createFragment

      return ( ...args: any[] ) => createElement( String( name ), ...args )
    }
  }

  const h = new Proxy<H>( <any>{}, handler )

  return h
}

const isNode = ( arg: any ): arg is Node =>
  arg && typeof arg.nodeType === 'number'
