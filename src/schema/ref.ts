import { kebabCase, startCase, eachKeyValueMap } from '@mojule/util'
import { DbRefSchema, DbRefSchemaProperties, EntitySchemaMap } from './types'

type RefCache = Record<string,DbRefSchema|undefined>
type RefUriCache = Record<string,RefCache|undefined>

const refCache: RefUriCache = {}

const getCacheForUri = ( uri: string ): RefCache => {
  let refCacheForUri = refCache[ uri ]

  if( refCacheForUri === undefined ){
    refCacheForUri = {}
    refCache[ uri ] = refCacheForUri
  }

  return refCacheForUri
}

const getCachedSchema = <T extends string>( cache: RefCache, name: T ) => {
  const schema = cache[ name ]

  if( schema !== undefined ){
    return schema as DbRefSchema<T>
  }
}

export const refFactory = ( uri: string ) => {
  uri = uri.endsWith( '/' ) ? uri : uri + '/'

  const cache = getCacheForUri( uri )

  const ref = <T extends string = string>( name: T ) => {
    let schema = getCachedSchema( cache, name )

    if( schema ){
      return schema
    }

    const slug = kebabCase( name )
    const $id = `${ uri }${ slug }-ref`
    const title = startCase( name )
    const type = 'object'

    const properties: DbRefSchemaProperties<T> = {
      '_id': {
        title: 'ID',
        type: 'string'
      },
      '_collection': {
        title: 'Collection',
        type: 'string',
        enum: [ name ]
      }
    }

    const required: DbRefSchema[ 'required' ] = [ '_id', '_collection' ]

    schema = {
      $id, title, type, properties, required
    }

    cache[ name ] = schema

    return schema
  }

  return ref
}

type _idSchema = DbRefSchema[ 'properties' ][ '_id' ]

const isIdSchema = ( schema: any ): schema is _idSchema => {
  if( typeof schema !== 'object' ) return false
  if ( typeof schema[ 'title' ] !== 'string' ) return false
  if ( schema[ 'type' ] !== 'string' ) return false

  return true
}

type _collectionSchema = DbRefSchema[ 'properties' ][ '_collection' ]

const isCollectionSchema = ( schema: any ): schema is _collectionSchema => {
  if( typeof schema !== 'object' ) return false
  if ( typeof schema[ 'title' ] !== 'string' ) return false
  if ( schema[ 'type' ] !== 'string' ) return false
  if( !Array.isArray( schema[ 'enum'])) return false
  if( typeof schema[ 'enum' ][ 0 ] !== 'string' ) return false

  return true
}

export const isDbRefSchema = ( schema: any  ): schema is DbRefSchema => {
  if( typeof schema !== 'object' ) return false
  if( typeof schema[ '$id' ] !== 'string' ) return false
  if ( typeof schema[ 'title' ] !== 'string' ) return false
  if ( schema[ 'type' ] !== 'object' ) return false
  if ( !schema[ 'properties' ] ) return false
  if ( !isIdSchema( schema[ 'properties' ]._id ) ) return false
  if ( !isCollectionSchema( schema[ 'properties' ]._collection ) ) return false

  return true
}

export const createRefSchemaMap = <TEntityMap>(
  entitySchemas: EntitySchemaMap<TEntityMap>,
  createRef: ( name: string ) => DbRefSchema
) => {
  const refSchemas: Record<string,DbRefSchema> = {}

  eachKeyValueMap( entitySchemas, ( _schema, key ) => {
    const refSchema = createRef( key )
    const refKey = `${ key }Ref`
    refSchemas[ refKey ] = refSchema
  } )

  return refSchemas
}