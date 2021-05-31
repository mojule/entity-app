import { Link } from './types'
import { nav, ul, li, a, span } from '../../utils/h'

export const link = ( { content, uri: href }: Link ) =>
  href === undefined ? span( content ) : a( { href }, content )

export const linksNav = ( ...model: Link[] ) =>
  nav(
    linksUl( ...model )
  )

export const linksUl = ( ...model: Link[] ) =>
  ul(
    ...model.map( l => li( link( l ) ) )
  )
