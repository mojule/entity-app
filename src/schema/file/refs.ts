import { refSharedSchema, refSharedProperties } from '../common/ref-schema-generic'

export const fileRefSchema = {
  $id: '#/file-ref',
  title: 'File Reference',
  ...refSharedSchema,
  properties: {
    ...refSharedProperties,
    
    _collection: {
      title: 'File',
      type: 'string',
      enum: [ 'file' ]
    }   
  }
} as const

export const imageFileRefSchema = {
  $id: '#/image-file-ref',
  title: 'Image File Reference',
  ...refSharedSchema,
  properties: {
    ...refSharedProperties,
    
    _collection: {
      title: 'Image File',
      type: 'string',
      enum: [ 'imageFile' ]
    }   
  }
} as const

export const zipFileRefSchema = {
  $id: '#/zip-file-ref',
  title: 'Zip File Reference',
  ...refSharedSchema,
  properties: {
    ...refSharedProperties,
    
    _collection: {
      title: 'Zip File',
      type: 'string',
      enum: [ 'zipFile' ]
    }   
  }
} as const
