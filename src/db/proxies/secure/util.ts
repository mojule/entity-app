import { AccessOptions } from '@mojule/mode'
import { EntityDb } from '../../types'
import { SecureEntityMap, SecureDbItem, SecureUser } from './types'

export const createAccessOptions = async (
  db: EntityDb<SecureEntityMap, SecureDbItem>,
  user: SecureUser & SecureDbItem,
  entity: SecureDbItem,
  isDirectory: boolean,
) => {
  const accessOptions: AccessOptions = {
    isDirectory,
    isRoot: user.isRoot || false,
    isOwner: user._id === entity._owner._id,
    isGroup: await isUserInGroup(db, user._id, entity._group._id),
    permissions: entity._mode
  }

  return accessOptions
}

export const isUserInGroup = async (
  db: EntityDb<SecureEntityMap, SecureDbItem>, userId: string, groupId: string
) => {
  const user = await db.collections.user.load( userId )

  if( user._group._id === groupId ) return true

  const group = await db.collections.group.load(groupId)

  return group.users.some(r => r._id === userId)
}
