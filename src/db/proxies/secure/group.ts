import { DbCollections, DbItem, DbRefFor } from '../../types'
import { createEperm } from './errors'

import {
  AddUserToGroups, CreateGroup, GetUsersForGroup, GroupFns, GroupNames, IsUserInGroup,
  RemoveGroup, RemoveUserFromGroups, SecureDbItem, SecureEntityMap, SecureUser,
  SetUserPrimaryGroup
} from './types'

export const createGroupFns = <
  EntityMap extends SecureEntityMap,
  D extends SecureDbItem = SecureDbItem
>(
  collections: DbCollections<EntityMap, D>,
  dbUser: SecureUser
) => {
  const groupNames: GroupNames = async () => {
    if (!dbUser.isRoot) throw createEperm('groupNames')

    const groups = await collections.group.find({})

    return groups.map( u => u.name )
  }

  const createGroup: CreateGroup = async name => {
    if (!dbUser.isRoot) throw createEperm('createGroup')

    await collections.group.create({ name, users: [] })
  }

  const removeGroup: RemoveGroup = async name => {
    if (!dbUser.isRoot) throw createEperm('removeGroup')

    const existing = await collections.group.findOne({ name })

    if (!existing) throw Error(`Expected a group named ${name}`)

    await collections.group.remove(existing._id)
  }

  const isUserInGroup: IsUserInGroup = async (userName, groupName) => {
    if (!dbUser.isRoot) throw createEperm('isUserInGroup')

    const user = await collections.user.findOne({ userName })

    if (!user) throw Error(`Expected a user named ${userName}`)

    const primaryGroup = await collections.group.load(user._group._id)

    if (primaryGroup.name === groupName) return true

    const usersInGroup = await getUsersForGroup(groupName)

    return usersInGroup.includes(userName)
  }

  const getUsersForGroup: GetUsersForGroup = async name => {
    if (!dbUser.isRoot) throw createEperm('getUsersForGroup')

    const existing = await collections.group.findOne({ name })

    if (!existing) throw Error(`Expected a group named ${name}`)

    const existingUsers = await collections.user.loadMany(
      existing.users.map(u => u._id)
    )

    existingUsers[0]._group

    const primaryUsers = await collections.user.find(
      { '_group._id': existing._id }
    )

    existingUsers.push(...primaryUsers)

    const users = new Set<string>(...existingUsers.map(u => u.name))

    return [...users]
  }

  const setUserPrimaryGroup: SetUserPrimaryGroup = async ( 
    userName, groupName 
  ) => {
    if (!dbUser.isRoot) throw createEperm('setUserPrimaryGroup')

    const user = await collections.user.findOne({ name: userName })

    if (!user) throw Error(`Expected a user named ${userName}`)

    const group = await collections.group.findOne({ name: groupName })

    if (!group) throw Error(`Expected a group named ${groupName}`)

    const { _group } = user

    _group._id = group._id

    const saveUser: Partial<SecureUser & SecureDbItem> & DbItem = { 
      _id: user._id, _group 
    }

    await collections.user.save( saveUser )
  }

  const addUserToGroups: AddUserToGroups = async ( userName, ...groupNames ) => {
    if (!dbUser.isRoot) throw createEperm('addUserToGroups')

    const user = await collections.user.findOne({ name: userName })

    if (!user) throw Error(`Expected a user named ${userName}`)    

    const userRef: DbRefFor<EntityMap,'user'> = { 
      _id: user._id, _collection: 'user' 
    }

    for( const groupName of groupNames ){
      const group = await collections.group.findOne({ name: groupName })

      if (!group) throw Error(`Expected a group named ${groupName}`)

      if( group.users.some( u => u._id === user._id ) ) continue

      group.users.push( userRef )

      await collections.group.save( group )
    }
  }

  const removeUserFromGroups: RemoveUserFromGroups = async (
    userName, ...groupNames
  ) => {
    if (!dbUser.isRoot) throw createEperm('removeUserFromGroups')

    const user = await collections.user.findOne({ name: userName })

    if (!user) throw Error(`Expected a user named ${userName}`)  

    const groups = await collections.group.find({ name: { $in: groupNames } } )

    for( const group of groups ){
      group.users = group.users.filter( u => u._id !== user._id )

      await collections.group.save( group )
    }
  }

  const fns: GroupFns = {
    groupNames, createGroup, removeGroup, isUserInGroup, getUsersForGroup,
    setUserPrimaryGroup, addUserToGroups, removeUserFromGroups
  }

  return fns
}
