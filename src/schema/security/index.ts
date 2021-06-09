import { apiKeyRoles, apiKeySchema } from './api-key-schema'
import { userPropertyRoles, userRoles, userSchema } from './user-schema'
import * as resetPasswordSchema from './reset-password-schema'
import { clone } from '@mojule/util'
import { addRolesToSchema } from '../../security/roles'

// TODO - readOnly is nonstandard find where used and figure out better way
// and default doesn't work either - why??? it should be able to be string[]?
Object.assign( 
  userSchema.properties.roles, 
  { 
    readOnly: true,    
    default: [ "user" ] 
  } 
)

const pendingUserSchema = clone(userSchema)

Object.assign(
  pendingUserSchema,
  {
    $id: '#/pending-user',
    title: 'Pending User',
    required: [ ...pendingUserSchema.required, 'secret' ]
  }
)

Object.assign(
  pendingUserSchema.properties,
  {
    secret: {
      title: 'Secret',
      description: 'The Pending User Secret',
      type: 'string',
      default: '',
      readOnly: true    
    }    
  }
)

export const securitySchema = {
  apiKey: addRolesToSchema( apiKeySchema, apiKeyRoles ),
  user: addRolesToSchema( userSchema, userRoles, userPropertyRoles ),
  pendingUser: addRolesToSchema( pendingUserSchema, userRoles, userPropertyRoles ),
  resetPassword: resetPasswordSchema
}
