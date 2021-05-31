import { App } from '@mojule/spa-router'
import { DocumentTargets } from './types'
import { ClientRoute } from './routes/types'
import { error } from '../templates/error'

const hashChange = new Event( 'hashchange' )

export const createAdmin = (
  targets: DocumentTargets, routes: ClientRoute[],
  onSend = () => {}, onRedirect = () => {}
) => {
  const { main } = targets
  const targetKeys = Object.keys( targets )

  const send = ( node: DocumentFragment ) => {
    targetKeys.forEach( key => {
      const target = targets[ key ]

      target.innerHTML = ''

      const childNodes = <HTMLElement[]>[
        ...node.querySelectorAll( `[data-target="${ key }"]` )
      ]

      childNodes.forEach( n => {
        target.appendChild( n )

        delete n.dataset.target
      } )
    } )

    main.appendChild( node )
    setCurrent()
    onSend()
  }

  const redirect = ( path: string ) => {
    window.location.hash = `#${ path }`

    onRedirect()
  }

  const app = App( send, redirect )

  routes.forEach( route => {
    const { method, path, handlers } = route

    app[ method ]( path, ...handlers )
  } )

  window.addEventListener( 'hashchange', () => {
    const { hash } = window.location
    const path = hash.replace( '#', '' )

    try {
      app.router( path )
    } catch ( err ) {
      send( error( err ) )
    }
  } )

  if ( location.hash !== '' ) {
    window.dispatchEvent( hashChange )
  }

  return { redirect }
}

const normalizePathEnd = ( path: string ) =>
  path + ( path.endsWith( '/' ) ? '' : '/' )

const setCurrent = () => {
  const anchors = document.querySelectorAll( 'a' )
  const windowHash = normalizePathEnd( window.location.hash )

  anchors.forEach( anchor => {
    const anchorHash = normalizePathEnd( anchor.hash )

    anchor.classList.toggle(
      'current',
      anchor.hash !== '' && windowHash.startsWith( anchorHash )
    )
  } )
}
