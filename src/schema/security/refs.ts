import { refSharedProperties, refSharedSchema } from '../common/ref-schema-generic'

export const userRefSchema = {
  $id: '#/user-ref',
  title: 'User',
  ...refSharedSchema,
  properties: {
    ...refSharedProperties,
    
    _collection: {
      title: 'User',
      type: 'string',
      enum: [ 'user' ]
    }   
  }
} as const
