import { DbRefFor } from '../../db/types';
import { SecurityEntityMap } from './types';
import { FromSchema } from 'json-schema-to-ts';
import { pendingUserSchema, userSchema } from '../../schema/security/user-schema';
export declare type UserEntity = FromSchema<typeof userSchema>;
export declare type PendingUserEntity = FromSchema<typeof pendingUserSchema>;
export interface UserData {
    _id?: string;
    name: string;
    email: string;
    roles: string[];
}
export declare type UserRef = DbRefFor<SecurityEntityMap, 'user'>;
