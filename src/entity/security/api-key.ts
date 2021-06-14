import { FromSchema } from 'json-schema-to-ts'
import { apiKeySchema } from '../../schema/security/api-key-schema'

export type ApiKeyEntity = FromSchema<typeof apiKeySchema>
