import { ApiKeyEntity } from './api-key';
import { PendingUserEntity, UserEntity } from './user';
import { ResetPasswordEntity } from './reset-password';
import { Role } from '../../security/types';
import { ActionType } from '../../db/types';
export interface SecurityEntityMap {
    apiKey: ApiKeyEntity;
    user: UserEntity;
    pendingUser: PendingUserEntity;
    resetPassword: ResetPasswordEntity;
}
export declare type SchemaRoles = Record<ActionType, Role[]>;