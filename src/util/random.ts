import { createSequence } from './each'

export const randInt = ( exclMax: number ) =>
  Math.floor( Math.random() * exclMax )

export const randId = ( length = 24 ) =>
  createSequence(
    length,
    () => randInt( 16 )
  ).map(
    v => v.toString( 16 )
  ).join( '' )

export const pick = <T>( arr: T[] ) => arr[ randInt( arr.length ) ]
