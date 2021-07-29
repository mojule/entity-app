import { v4 } from 'uuid'
import { DbItem, EntityDb } from '../../../types'
import { LoginUser, SecureDbItem, SecureEntityMap, SecureUser } from '../types'
import { hashPassword } from '../user'
import { UserSecret, PendingUser, AccountFns } from './types'

export const accountManageFactory = <EntityMap extends SecureEntityMap,D extends SecureDbItem>(
  db: EntityDb<EntityMap,D>
) => {
  const createPendingUser = async (user: LoginUser) => {
    user = await hashPassword(user)

    const secret = v4()

    const pending: PendingUser = {
      ...user, secret
    }

    await db.collections.pendingUser.create(pending)

    return secret
  }

  const verifyPendingUser = async (
    secret: string
  ) => {
    const dbPending = await db.collections.pendingUser.findOne({ secret })

    if (dbPending === undefined)
      throw Error('Expected pending user for secret')

    const { name, password } = dbPending

    const user: SecureUser = { name, password }

    await db.collections.user.create(user)

    await db.collections.pendingUser.remove( dbPending._id )

    return name
  }

  const createApiKey = async (userName: string) => {
    const dbUser = await db.collections.user.findOne({ name: userName })

    if (dbUser === undefined)
      throw Error(`Expected user named ${userName}`)

    const secret = v4()

    const userSecret: UserSecret = {
      type: 'api-key',
      secret,
      user: { _id: dbUser._id, _collection: 'user' }
    }

    await db.collections.userSecret.create(userSecret)

    return secret
  }

  const userForApiKey = async (secret: string) => {
    const userSecret = await db.collections.userSecret.findOne(
      { secret, type: 'api-key' }
    )

    if (userSecret === undefined)
      throw Error('Expected user secret for secret')

    const dbUser = await db.collections.user.load(userSecret.user._id)

    return dbUser.name
  }

  const forgotPassword = async (userName: string) => {
    const dbUser = await db.collections.user.findOne({ name: userName })

    if (dbUser === undefined)
      throw Error(`Expected user named ${userName}`)

    const secret = v4()

    const userSecret: UserSecret = {
      type: 'forgot-password',
      secret,
      user: { _id: dbUser._id, _collection: 'user' }
    }

    await db.collections.userSecret.create(userSecret)

    return secret
  }

  const resetPassword = async ( secret: string, password: string ) => {
    const userSecret = await db.collections.userSecret.findOne(
      { secret, type: 'forgot-password' }
    )

    if (userSecret === undefined)
      throw Error('Expected user secret for secret')

    const saveUser: Partial<SecureUser> & DbItem = { 
      _id: userSecret.user._id, password 
    }

    const hashedUser = await hashPassword( saveUser )

    await db.collections.user.save( hashedUser )

    await db.collections.userSecret.remove( userSecret._id )
  }  

  const cleanSecrets = async ( maxAgeMs: number ) => {
    const now = Date.now()
    const oldest = now - maxAgeMs

    const old = await db.collections.userSecret.find(
      { _ctime: { $lt: oldest }}
    )

    const ids = old.map( s => s._id )

    await db.collections.userSecret.removeMany( ids )
  }

  const cleanPendingUsers = async ( maxAgeMs: number ) => {
    const now = Date.now()
    const oldest = now - maxAgeMs

    const oldSecrets = await db.collections.pendingUser.find(
      { _ctime: { $lt: oldest }}
    )

    const ids = oldSecrets.map( s => s._id )

    await db.collections.pendingUser.removeMany( ids )
  }

  const accountFns: AccountFns = { 
    createPendingUser, verifyPendingUser, createApiKey, userForApiKey, 
    forgotPassword, resetPassword, cleanSecrets, cleanPendingUsers
  }

  return accountFns
}
