export const toTrimmedNonEmptyLines = ( s: string ) =>
  s.split( '\n' ).map( s => s.trim() ).filter( s => s !== '' )