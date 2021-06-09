import { FromSchema } from 'json-schema-to-ts';
import { resetPasswordSchema } from '../../schema/security/reset-password-schema';
export declare type ResetPasswordEntity = FromSchema<typeof resetPasswordSchema>;
