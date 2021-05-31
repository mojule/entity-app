export interface PredicateMap<T> {
  [ id: string ]: ( value: T ) => boolean
}

export interface Buckets<T> {
  [ id: string ]: T[]
}

const getPredicateIds = <T>( item: T, predicateMap: PredicateMap<T> ): string[] => {
  const ids = Object.keys( predicateMap )
  const matches: string[] = []

  ids.forEach( id => {
    if ( predicateMap[ id ]( item ) ) matches.push( id )
  })

  return matches
}

export const bucket = <T>( items: T[], predicateMap: PredicateMap<T> ) => {
  const result: Buckets<T> = {}

  const ids = Object.keys( predicateMap )

  ids.forEach( id => result[ id ] = [] )

  items.forEach( item => {
    const matches = getPredicateIds( item, predicateMap )

    matches.forEach( id => {
      result[ id ].push( item )
    })
  })

  return result
}
