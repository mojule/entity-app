import { FromSchema } from 'json-schema-to-ts'
import { resetPasswordSchema } from '../../schema/security/reset-password-schema'

export type ResetPasswordEntity = FromSchema<typeof resetPasswordSchema>
