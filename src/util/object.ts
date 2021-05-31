export const emptyObject = obj => {
  Object.keys( obj ).forEach( key => {
    delete obj[ key ]
  } )
}

export const objectExcept = ( obj: any, ...keys: string[] ) => {
  const result = {}

  Object.keys( obj ).forEach( key => {
    if( keys.includes( key ) ) return

    result[ key ] = obj[ key ]
  } )

  return result
}

export const objectFilter = <T, TResult = T>(
  obj: T, predicate: ( key: string, value: any ) => boolean
) => {
  const result = {}

  Object.keys( obj ).forEach( key => {
    if ( !predicate( key, obj[ key ] ) ) return

    result[ key ] = obj[ key ]
  } )

  return result as TResult
}