import { FromSchema } from 'json-schema-to-ts';
import { apiKeySchema } from '../../schema/security/api-key-schema';
export declare type ApiKeyEntity = FromSchema<typeof apiKeySchema>;
