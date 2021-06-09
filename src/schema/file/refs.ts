export const fileRefSchema = {
  type: 'object',
  properties: {
    '_id': {
      title: 'ID',
      type: 'string'
    },
    '_collection': {
      title: 'Collection',
      type: 'string',
      enum: [ 'file' ]
    }
  },
  additionalProperties: false,
  required: [ '_id', '_collection' ]
} as const

export const imageFileRefSchema = {
  type: 'object',
  properties: {
    '_id': {
      title: 'ID',
      type: 'string'
    },
    '_collection': {
      title: 'Collection',
      type: 'string',
      enum: [ 'imageFile' ]
    }
  },
  additionalProperties: false,
  required: [ '_id', '_collection' ]
} as const

export const zipFileRefSchema = {
  type: 'object',
  properties: {
    '_id': {
      title: 'ID',
      type: 'string'
    },
    '_collection': {
      title: 'Collection',
      type: 'string',
      enum: [ 'zipFile' ]
    }
  },
  additionalProperties: false,
  required: [ '_id', '_collection' ]
} as const
