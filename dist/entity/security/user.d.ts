import { DbRef } from '../../db/types';
import { SecurityEntityMap } from './types';
import { FromSchema } from 'json-schema-to-ts';
import { userSchema } from '../../schema/security/user-schema';
export declare type UserEntity = FromSchema<typeof userSchema>;
export declare type PendingUserEntity = UserEntity & {
    secret: string;
};
export interface UserData {
    _id?: string;
    name: string;
    email: string;
    roles: string[];
}
export interface UserRef extends DbRef<SecurityEntityMap> {
    _collection: 'user';
}
