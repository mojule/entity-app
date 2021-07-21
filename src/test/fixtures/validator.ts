import { ValidateEntity, ValidateOptions } from '../..'
import { createDefaultDbItem, createMemoryDb } from '../../db/db-memory'
import { validatedDbFactory } from '../../db/proxies/validator'
import { EntityKeys } from '../../entity/types'

export type ValEntityA = { name: string }
export type ValEntityB = { name: string, age: number }

export type ValidatorEntityMap = {
  a: ValEntityA
  b: ValEntityB
}

export const validatorEntityKeys: EntityKeys<ValidatorEntityMap> = {
  a: 'a', b: 'b'
}

export const isA = ( value: any ): value is ValEntityA =>
  typeof value === 'object' && typeof value[ 'name' ] === 'string'

export const isB = ( value: any ): value is ValEntityB =>
  isA( value ) && typeof value[ 'age' ] === 'number'

export const validator: ValidateEntity<ValidatorEntityMap> = async ( key, entity ) => {
  if( key === 'a' ){
    if( isA( entity ) ) return null

    return Error( 'Expected a' )
  }

  if( key === 'b' ){
    if( isB( entity ) ) return null

    return Error( 'Expected b' )
  }

  return Error( 'Expected a or b' )
}

export const createValidatedDb = async ( options?: ValidateOptions ) => {
  const memDb = await createMemoryDb( 
    '', validatorEntityKeys, createDefaultDbItem 
  )

  const validatedDb = validatedDbFactory( memDb, validator, options )

  return { memDb, validatedDb }
}