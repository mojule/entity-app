import { FromSchema } from 'json-schema-to-ts';
import { EntityKeys } from '../../../../entity/types';
import { LoginUser } from '../types';
import { userSecretSchema, pendingUserSchema } from './schema';
export declare type PendingUser = FromSchema<typeof pendingUserSchema>;
export declare type UserSecret = FromSchema<typeof userSecretSchema>;
export declare type AccountManageEntityMap = {
    pendingUser: PendingUser;
    userSecret: UserSecret;
};
export declare const accountManageEntityKeys: EntityKeys<AccountManageEntityMap>;
export declare type AccountFns = {
    createPendingUser: CreatePendingUser;
    verifyPendingUser: VerifyPendingUser;
    createApiKey: CreateApiKey;
    userForSecret: UserForSecret;
    forgotPassword: ForgotPassword;
    resetPassword: ResetPassword;
    cleanSecrets: CleanSecrets;
    cleanPendingUsers: CleanPendingUsers;
};
export declare type CreatePendingUser = (user: LoginUser) => Promise<string>;
export declare type VerifyPendingUser = (secret: string) => Promise<string>;
export declare type CreateApiKey = (userName: string) => Promise<string>;
export declare type UserForSecret = (secret: string, type?: 'api-key' | 'forgot-password') => Promise<string>;
export declare type ForgotPassword = (userName: string) => Promise<string>;
export declare type ResetPassword = (secret: string, newPassword: string) => Promise<void>;
export declare type CleanSecrets = (maxAgeMs: number) => Promise<void>;
export declare type CleanPendingUsers = (maxAgeMs: number) => Promise<void>;
