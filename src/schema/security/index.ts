import { apiKeySchema } from './api-key-schema'
import { resetPasswordSchema } from './reset-password-schema'
import { EntitySchemaMap } from '../types'
import { SecurityEntityMap } from '../../entity/security/types'

const createPendingUserSchema = () => {
  console.error( 'TODO: Not implemented')

  return { $id: '' }
}

export const securitySchema: EntitySchemaMap<SecurityEntityMap> = {
  apiKey: apiKeySchema,
  pendingUser: createPendingUserSchema(),
  resetPassword: resetPasswordSchema
}
