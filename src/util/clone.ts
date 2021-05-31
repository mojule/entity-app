export const clone = <T>( obj: T ) => JSON.parse( JSON.stringify( obj ) ) as T
