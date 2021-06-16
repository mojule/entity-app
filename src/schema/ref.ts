import { kebabCase, startCase, eachKeyValueMap } from '@mojule/util'
import { DbRefSchema, DbRefSchemaProperties, EntitySchemaMap } from './types'

export const refFactory = ( uri: string ) => {
  uri = uri.endsWith( '/' ) ? uri : uri + '/'

  const ref = <T extends string = string>( name: T ) => {
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

    const schema: DbRefSchema<T> = {
      $id, title, type, properties, required
    }

    return schema
  }

  return ref
}

export const isDbRefSchema = ( schema: any  ): schema is DbRefSchema => {
  if( typeof schema !== 'object' ) return false
  if( typeof schema[ '$id' ] !== 'string' ) return false
  if ( typeof schema[ 'title' ] !== 'string' ) return false
  if ( schema[ 'type' ] !== 'object' ) return false
  if ( !schema[ 'properties' ] ) return false
  if ( !schema[ 'properties' ]._id ) return false
  if ( !schema[ 'properties' ]._collection ) return false

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