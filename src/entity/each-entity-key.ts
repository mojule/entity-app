import { EntityKeys } from './types'

export interface EntityKeyCallback<TEntityMap> {
  ( key: keyof TEntityMap & string ): Promise<void>
}

export interface EntityKeyCallbackSync<TEntityMap> {
  ( key: keyof TEntityMap & string ): void
}

export const eachEntityKey = async <TEntityMap>(
  keys: EntityKeys<TEntityMap>, cb: EntityKeyCallback<TEntityMap>
) => {
  const entityKeys = <( keyof TEntityMap & string )[]>Object.keys( keys )

  await Promise.all( entityKeys.map( cb ) )
}

export const eachEntityKeySync = <TEntityMap>(
  keys: EntityKeys<TEntityMap>, cb: EntityKeyCallbackSync<TEntityMap>
) => {
  const entityKeys = <( keyof TEntityMap & string )[]>Object.keys( keys )

  entityKeys.forEach( key => cb( key ) )
}
