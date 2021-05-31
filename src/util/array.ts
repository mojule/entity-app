export const sortBy = <T>( arr: T[], key: string ) =>
  arr.sort(
    ( a, b ) => a[ key ] < b[ key ] ? -1 : a[ key ] > b[ key ] ? 1 : 0
  )

export const chunk = <T>( arr: T[], length: number ) => {
  const chunks: T[][] = []

  for( let i = 0; i < arr.length; i += length ){
    chunks.push( arr.slice( i, i + length ) )
  }

  return chunks
}