import { RoleMap } from '../../security/types'

const userSharedSchemaProperties = {
  name: {
    title: 'Name',
    description: 'The user\'s name',
    type: 'string'
  },
  email: {
    title: 'Email',
    description: 'The user\'s email address',
    type: 'string',
    format: 'email'
  },
  password: {
    title: 'Password',
    description: 'The user\'s password',
    type: 'string',
    format: 'password'
  },
  roles: {
    title: 'Roles',
    description: 'The user\'s roles',
    type: 'array',
    items: {
      title: 'Role',
      description: 'Name of this role',
      type: 'string'
    }
  }
} as const

const userSharedRequired = [
  'name', 'email', 'password', 'roles'
] as const

export const userSchema = {
  $id: '#/user',
  title: 'User',
  description: 'Person with access to the system',
  type: 'object',
  properties: { ...userSharedSchemaProperties },
  required: userSharedRequired
} as const

export const pendingUserSchema = {
  $id: '#/pending-user',
  title: 'Pending User',
  description: 'Person awaiting access to the system',
  type: 'object',
  properties: {
    ...userSharedSchemaProperties,
    secret: {
      title: 'Secret',
      description: 'The Pending User Secret',
      type: 'string'
    }       
  },
  required: [ ...userSharedRequired, 'secret' ]
} as const

export const userRoles: RoleMap = {
  create: [
    'admin'
  ],
  read: [
    'admin'
  ],
  update: [
    'admin'
  ],
  delete: [
    'admin'
  ]
}

export const userPropertyRoles: Record<string, RoleMap> = {
  password: {
    create: [
      'admin',
      'public'
    ],
    read: [
      'admin'
    ],
    update: [
      'admin',
      'currentUser'
    ],
    delete: [
      'admin'
    ]
  },
  roles: {
    create: [
      'admin'
    ],
    read: [
      'admin'
    ],
    update: [
      'admin'
    ],
    delete: [
      'admin'
    ]
  }
}
