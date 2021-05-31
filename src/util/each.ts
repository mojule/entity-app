import {
  KeyValueMap, ObjectMap, AsyncEachCallback, KeyValueEachCallback,
  ObjectMapEachCallback, ObjectMapMapCallback, KeyValueMapCallback
} from './types'

export const eachAsync = async <T>( arr: T[], cb: AsyncEachCallback<T> ) =>
  Promise.all( arr.map( cb ) ).then( () => {} )

export const eachKeyValueMap = <T, V>(
  kvs: KeyValueMap<T, V>, cb: KeyValueEachCallback<T,V>
) =>
  Object.keys( kvs ).forEach(
    key => cb( kvs[ key ], <keyof T & string>key )
  )

export const eachObjectMap = <T>(
  obj: ObjectMap<T>, cb: ObjectMapEachCallback<T>
) =>
  Object.keys( obj ).forEach(
    key => cb( obj[ key ], key )
  )

export const mapObjectMap = <T,U>(
  obj: ObjectMap<T>, cb: ObjectMapMapCallback<T, U>
) =>
  Object.keys( obj ).map(
    key => cb( obj[ key ], key )
  )

export const mapKeyValueMap = <T, V, U>(
  kvs: KeyValueMap<T, V>, cb: KeyValueMapCallback<T, V, U>
) =>
  Object.keys( kvs ).map(
    key => cb( kvs[ key ], <keyof T & string>key )
  )

export const createSequence = <T>(
  length: number, cb: ( index: number ) => T
) => Array.from( { length }, ( _v, k ) => cb( k ) )
