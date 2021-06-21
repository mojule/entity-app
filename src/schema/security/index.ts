import { apiKeyRoles, apiKeySchema } from './api-key-schema'
import { pendingUserSchema, userPropertyRoles, userRoles, userSchema } from './user-schema'
import { resetPasswordSchema } from './reset-password-schema'
import { addRolesToSchema } from '../../security/roles'
import { EntitySchemaMap } from '../types'
import { SecurityEntityMap } from '../../entity/security/types'

// no straightforward way to extend schema at the moment - figure this out
// later

// TODO - readOnly is nonstandard find where used and figure out better way
// and default doesn't work either - why??? it should be able to be string[]?
Object.assign(
  userSchema.properties.roles,
  {
    readOnly: true,
    default: ["user"]
  }
)

Object.assign(
  pendingUserSchema.properties.roles,
  {
    readOnly: true,
    default: ["user"]
  }
)

Object.assign(
  pendingUserSchema.properties.secret,
  {
    readOnly: true,
    default: ''
  }
)

Object.assign(
  resetPasswordSchema.properties.secret,
  {
    readOnly: true,
    default: ''
  }
)

export const securitySchema: EntitySchemaMap<SecurityEntityMap> = {
  apiKey: addRolesToSchema(apiKeySchema, apiKeyRoles),
  user: addRolesToSchema(userSchema, userRoles, userPropertyRoles),
  pendingUser: addRolesToSchema(pendingUserSchema, userRoles, userPropertyRoles),
  resetPassword: resetPasswordSchema
}
