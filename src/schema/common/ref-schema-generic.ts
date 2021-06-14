export const refSharedSchema = {
  type: 'object',
  additionalProperties: false,
  required: [ '_id', '_collection' ]
} as const

export const refSharedProperties = {
  '_id': {
    title: 'ID',
    type: 'string'
  }
} as const
