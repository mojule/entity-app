export const userRefSchema = {
  type: 'object',
  properties: {
    '_id': {
      title: 'ID',
      type: 'string'
    },
    '_collection': {
      title: 'Collection',
      type: 'string',
      enum: [ 'user' ]
    }
  },
  additionalProperties: false,
  required: [ '_id', '_collection' ]
} as const
