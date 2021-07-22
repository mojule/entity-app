import { createDefaultDbItem, createMemoryDb, EntityKeys } from '../..'
import { DbRefFor } from '../../db/types'
import { multipleUsers } from './memory-db'

export type CopyUser = {
  name: string
  group: DbRefFor<CopyEntityMap,'group'>
}

export type CopyGroup = {
  name: string
  users: DbRefFor<CopyEntityMap,'user'>[]
}

export type CopyEntityMap = {
  user: CopyUser
  group: CopyGroup
}

export const copyEntityKeys: EntityKeys<CopyEntityMap> = {
  user: 'user',
  group: 'group'
}

export const createSourceDb = async () => {
  const db = await createMemoryDb(
    '', copyEntityKeys, createDefaultDbItem
  )

  const groupNames = new Set<string>()

  multipleUsers.forEach( user => {
    groupNames.add( user.group )
  })

  const uniqueGroups = [ ...groupNames ]

  const groups: CopyGroup[] = uniqueGroups.map( name => ({
    name, users: []
  }))

  await db.collections.group.createMany( groups )

  for( const user of multipleUsers ){
    const { group: groupName } = user

    const dbGroup = await db.collections.group.findOne({ name: groupName })

    if( dbGroup === undefined ) throw Error( `Expected group ${ groupName }`)

    const groupRef: DbRefFor<CopyEntityMap,'group'> = {
      _id: dbGroup._id,
      _collection: 'group'
    }

    const userId = await db.collections.user.create(
      { name: user.name, group: groupRef }
    )

    const userRef: DbRefFor<CopyEntityMap,'user'> = {
      _id: userId,
      _collection: 'user'
    }

    dbGroup.users.push( userRef )

    await db.collections.group.save( dbGroup )
  }

  return db
}
