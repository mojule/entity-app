import { refFactory } from '../../../../schema/ref'
import { loginUserSchema } from '../schema'

const createRef = refFactory( '#' )

const secret = { 
  title: 'Secret', 
  type: 'string', 
  format: 'password' 
} as const

export const secretSchema = {
  id: '#/secret',
  title: 'Secret',
  type: 'object',
  properties: { secret },
  required: [ 'secret' ]
} as const

export const userSecretSchema = {
  id: '#/user-secret',
  title: 'User Secret',
  type: 'object',
  properties: { 
    type: { type: 'string' },
    user: createRef( 'user' ),
    secret
  },
  required: [ 'type', 'user', 'secret' ]
} as const

export const pendingUserSchema = {
  id: '#/pending-user',
  title: 'Pending User',
  type: 'object',
  properties: {
    ...loginUserSchema.properties,
    secret
  },
  required: [ 'name', 'password', 'secret' ]
} as const
