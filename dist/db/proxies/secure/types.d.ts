import { FromSchema } from 'json-schema-to-ts';
import { EntityKeys } from '../../../entity/types';
import { DbCollections, EntityDb } from '../../types';
import { loginUserSchema, secureCollectionSchema, secureDbItemSchema, secureGroupSchema, secureUserSchema } from './schema';
export declare type SecureDbItem = FromSchema<typeof secureDbItemSchema>;
export declare type SecureUser = FromSchema<typeof secureUserSchema>;
export declare type SecureGroup = FromSchema<typeof secureGroupSchema>;
export declare type SecureCollection = FromSchema<typeof secureCollectionSchema>;
export declare const privilegedDbItemKeys: (keyof SecureDbItem)[];
export declare type SecureEntityMap = {
    user: SecureUser;
    group: SecureGroup;
    collectionData: SecureCollection;
};
export declare type SecureEntityKey = keyof SecureEntityMap;
export declare const secureEntityKeys: EntityKeys<SecureEntityMap>;
export declare type LoginUser = FromSchema<typeof loginUserSchema>;
export declare type SecureEntityMapExternal<EntityMap extends SecureEntityMap> = Omit<EntityMap, SecureEntityKey>;
export declare type SecureDbExternal<EntityMap extends SecureEntityMap, D extends SecureDbItem = SecureDbItem> = EntityDb<SecureEntityMapExternal<EntityMap>, D>;
export declare type SecureDbCollections<EntityMap extends SecureEntityMap, D extends SecureDbItem = SecureDbItem> = DbCollections<SecureEntityMapExternal<EntityMap>, D>;
export declare type SecureDb<EntityMap extends SecureEntityMap, D extends SecureDbItem = SecureDbItem> = SecureDbExternal<EntityMap, D> & UserFns & GroupFns & AccessFns<EntityMap>;
export declare type AccessFns<EntityMap> = {
    chmod: Chmod<EntityMap>;
    chown: Chown<EntityMap>;
    chgrp: Chgrp<EntityMap>;
};
export declare type UserFns = {
    userNames: UserNames;
    createUser: CreateUser;
    removeUser: RemoveUser;
    setPassword: SetPassword;
};
export declare type GroupFns = {
    groupNames: GroupNames;
    createGroup: CreateGroup;
    removeGroup: RemoveGroup;
    isUserInGroup: IsUserInGroup;
    getUsersForGroup: GetUsersForGroup;
    setUserPrimaryGroup: SetUserPrimaryGroup;
    addUserToGroups: AddUserToGroups;
    removeUserFromGroups: RemoveUserFromGroups;
};
export declare type Chmod<EntityMap> = (mode: number, collection: keyof EntityMap & string, _id?: string) => Promise<void>;
export declare type Chown<EntityMap> = (userName: string, collection: keyof EntityMap & string, _id?: string) => Promise<void>;
export declare type Chgrp<EntityMap> = (groupName: string, collection: keyof EntityMap & string, _id?: string) => Promise<void>;
export declare type UserNames = () => Promise<string[]>;
export declare type CreateUser = (user: LoginUser, isRoot?: boolean) => Promise<void>;
export declare type RemoveUser = (name: string) => Promise<void>;
export declare type SetPassword = (user: LoginUser) => Promise<void>;
export declare type GroupNames = () => Promise<string[]>;
export declare type CreateGroup = (name: string) => Promise<void>;
export declare type RemoveGroup = (name: string) => Promise<void>;
export declare type IsUserInGroup = (userName: string, groupName: string) => Promise<boolean>;
export declare type GetUsersForGroup = (groupName: string) => Promise<string[]>;
export declare type SetUserPrimaryGroup = (userName: string, groupName: string) => Promise<void>;
export declare type AddUserToGroups = (userName: string, ...groupNames: string[]) => Promise<void>;
export declare type RemoveUserFromGroups = (userName: string, ...groupNames: string[]) => Promise<void>;
export declare type ValidateUser = (user: LoginUser) => Promise<boolean>;
export declare type GetCollectionData<EntityMap> = (name: keyof EntityMap & string) => SecureCollection;
