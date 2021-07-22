import { clone } from '@mojule/util'
import * as bcrypt from 'bcryptjs'
import { DbCollection, DbCollections, DbItem } from '../../types'
import { createEperm } from './errors'
import { 
  CreateUser, LoginUser, RemoveUser, SecureDbItem, SecureEntityMap, SecureUser, 
  SetPassword, UserFns, UserNames, ValidateUser
} from './types'

export const createUserFns = <
  EntityMap extends SecureEntityMap,
  D extends SecureDbItem = SecureDbItem
>(
  collection: DbCollections<EntityMap, D>[ 'user' ],
  dbUser: SecureUser
) => {
  const userNames: UserNames = async () => {
    if( !dbUser.isRoot ) throw createEperm( 'userNames' )

    const users = await collection.find({})

    return users.map( u => u.name )
  }

  const createUser: CreateUser = async ( user, isRoot ) => {
    if( !dbUser.isRoot ) throw createEperm( 'createUser' )

    user = clone( user )
    user[ 'isRoot' ] = isRoot
    
    await collection.create( user )
  }

  const removeUser: RemoveUser = async name => {
    if( !dbUser.isRoot ) throw createEperm( 'removeUser' )

    const existing = await collection.findOne({ name })

    if( existing === undefined ) 
      throw Error( `Expected user named ${ name }` )

    await collection.remove( existing._id )
  }

  const setPassword: SetPassword = async user => {
    if( !dbUser.isRoot ) throw createEperm( 'setPassword' )

    const existing = await collection.findOne({ name: user.name })

    if( existing === undefined ) 
      throw Error( `Expected user named ${ user.name }` )

    const saveUser: Partial<SecureUser> & DbItem = {
      _id: existing._id,
      ...user
    }

    await collection.save( saveUser )
  }

  const fns: UserFns = {
    userNames, createUser, removeUser, setPassword
  }

  return fns
}

export const validateDbUser = async ( 
  collection: DbCollection<SecureUser>,
  user: LoginUser 
) => {
  const dbUser = await collection.findOne({ name: user.name })

  const expect = dbUser ? dbUser.password : ''

  // test even if no user so takes same amount of time regardless
  const isValid = await bcrypt.compare(user.password, expect)  

  if (dbUser === undefined){
    return false
  }

  return isValid
}

export const hashPassword =
  async <Entity>(entity: Entity) => {
    if ('password' in entity) {
      entity = clone(entity)
      entity[ 'password' ] = await bcrypt.hash(entity['password'], 10)
    }

    return entity
  }