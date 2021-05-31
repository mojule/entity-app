import * as apiKeySchema from './api-key.json'
import * as userSchema from './user.json'
import * as resetPasswordSchema from './reset-password.json'
import { IdSchema, SchemaMap } from '../../../schema/types'
import { clone } from '../../../util/clone'

const pendingUserSchema = clone(userSchema)

pendingUserSchema.$id = '#/pending-user'
pendingUserSchema.title = 'Pending User'
pendingUserSchema.required.push( 'secret' )

pendingUserSchema.properties['secret'] = {
  title: 'Secret',
  description: 'The Pending User Secret',
  type: 'string',
  default: '',
  readOnly: true
}

export const securitySchema: SchemaMap = {
  apiKey: apiKeySchema as IdSchema,
  user: userSchema as IdSchema,
  pendingUser: pendingUserSchema as IdSchema,
  resetPassword: resetPasswordSchema as IdSchema
}
