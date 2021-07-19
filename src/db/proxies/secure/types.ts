import { FromSchema } from 'json-schema-to-ts'
import { EntityKeys } from '../../../entity/types'
import { DbCollections, EntityDb } from '../../types'

import {
  secureCollectionSchema,
  secureDbItemSchema, secureGroupSchema, secureUserSchema
} from './schema'

export type SecureDbItem = FromSchema<typeof secureDbItemSchema>
export type SecureUser = FromSchema<typeof secureUserSchema>
export type SecureGroup = FromSchema<typeof secureGroupSchema>
export type SecureCollection = FromSchema<typeof secureCollectionSchema>

export const privilegedDbItemKeys: (keyof SecureDbItem)[] = [
  '_mode', '_owner', '_group', '_atime', '_ctime', '_mtime', '_ver'
]

export type SecureEntityMap = {
  user: SecureUser
  group: SecureGroup
  collectionData: SecureCollection
}

export type SecureEntityKey = keyof SecureEntityMap

export const secureDbKeys: EntityKeys<SecureEntityMap> = {
  user: 'user',
  group: 'group',
  collectionData: 'collectionData'
}

export type LoginUser = {
  name: string
  password: string
}

export type SecureEntityMapExternal<EntityMap extends SecureEntityMap> =
  Omit<EntityMap, SecureEntityKey>

export type SecureDbExternal<
  EntityMap extends SecureEntityMap,
  D extends SecureDbItem = SecureDbItem
  > = EntityDb<SecureEntityMapExternal<EntityMap>, D>

export type SecureDbCollections<
  EntityMap extends SecureEntityMap,
  D extends SecureDbItem = SecureDbItem
  > = DbCollections<SecureEntityMapExternal<EntityMap>, D>

export type SecureDb<
  EntityMap extends SecureEntityMap,
  D extends SecureDbItem = SecureDbItem
  > = SecureDbExternal<EntityMap, D> & UserFns & GroupFns & AccessFns<EntityMap>

export type AccessFns<EntityMap> = {
  chmod: Chmod<EntityMap>
  chown: Chown<EntityMap>
  chgrp: Chgrp<EntityMap>
}

export type UserFns = {
  userNames: UserNames
  createUser: CreateUser
  removeUser: RemoveUser
  setPassword: SetPassword
}

export type GroupFns = {
  groupNames: GroupNames
  createGroup: CreateGroup
  removeGroup: RemoveGroup
  isUserInGroup: IsUserInGroup
  getUsersForGroup: GetUsersForGroup
  setUserPrimaryGroup: SetUserPrimaryGroup
  addUserToGroups: AddUserToGroups
  removeUserFromGroups: RemoveUserFromGroups
}

export type Chmod<EntityMap> =
  (mode: number, collection: keyof EntityMap & string, _id?: string) =>
    Promise<void>

export type Chown<EntityMap> =
  (userName: string, collection: keyof EntityMap & string, _id?: string) =>
    Promise<void>

export type Chgrp<EntityMap> =
  (groupName: string, collection: keyof EntityMap & string, _id?: string) =>
    Promise<void>

export type UserNames = () => Promise<string[]>

export type CreateUser = (user: LoginUser, isRoot?: boolean) => Promise<void>

export type RemoveUser = (name: string) => Promise<void>

export type SetPassword = (user: LoginUser) => Promise<void>


export type GroupNames = () => Promise<string[]>

export type CreateGroup = (name: string) => Promise<void>

export type RemoveGroup = (name: string) => Promise<void>

export type IsUserInGroup = (userName: string, groupName: string) =>
  Promise<boolean>

export type GetUsersForGroup = (groupName: string) => Promise<string[]>

export type SetUserPrimaryGroup = (userName: string, groupName: string) =>
  Promise<void>

export type AddUserToGroups = (userName: string, ...groupNames: string[]) =>
  Promise<void>

export type RemoveUserFromGroups = (
  userName: string, ...groupNames: string[]
) => Promise<void>

export type ValidateUser = (user: LoginUser) => Promise<boolean>


export type GetCollectionData<EntityMap> =
  (name: keyof EntityMap & string) => SecureCollection
