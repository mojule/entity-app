import { secureGroupRefSchema, secureUserRefSchema } from './refs'

export const secureDbItemSchema = {
  id: '#/secure-db-item',
  title: 'Secure DB Item',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    _mode: { type: 'integer', minimum: 0, maximum: 0o7777, default: 0o0700 },
    _owner: secureUserRefSchema,
    _group: secureGroupRefSchema,
    _atime: { type: 'integer' },
    _ctime: { type: 'integer' },
    _mtime: { type: 'integer' }    
  },
  required: [
    '_id', '_mode', '_owner', '_group', '_atime', '_ctime', '_mtime'
  ]
} as const

export const secureUserSchema = {
  id: '#/secure-user',
  title: 'Secure User',
  type: 'object',
  properties: {
    name: { type: 'string' },
    password: { type: 'string', format: 'password' },
    isRoot: { type: 'boolean', default: false }
  },
  required: [ 'name', 'password' ]
} as const

export const secureGroupSchema = {
  id: '#/secure-group',
  title: 'Secure Group',
  type: 'object',
  properties: {
    name: { type: 'string' },
    users: {
      type: 'array',
      items: secureUserRefSchema
    }
  },
  required: [ 'name', 'users' ]
} as const

export const secureCollectionSchema = {
  id: '#/secure-collection',
  title: 'Secure Collection',
  type: 'object',
  properties: {
    name: { type: 'string' } // should be a collection name - enum?
  },
  required: [ 'name' ]
} as const
