import { DbCollections } from '../../types'
import { createEperm } from './errors'

import { 
  SecureEntityMap, SecureDbItem, SecureUser, Chmod, AccessFns, Chown, Chgrp, 
  IsUserInGroup 
} from './types'

export const createAccessFns = <
  EntityMap extends SecureEntityMap,
  D extends SecureDbItem = SecureDbItem
>(
  insecureCollections: DbCollections<EntityMap, D>,
  isUserInGroup: IsUserInGroup,
  user: SecureUser
) => {
  type EntityAction = (
    enity: EntityMap[keyof EntityMap & string] & D
  ) => Promise<void>

  const accessChange = async (
    action: EntityAction,
    collection: keyof EntityMap & string, _id?: string
  ) => {
    const collectionData = await insecureCollections.collectionData.findOne(
      { name: collection }
    )

    if (collectionData === undefined)
      throw Error(`Expected collectionData for ${collection}`)

    if (_id === undefined) {
      await action( collectionData )

      return insecureCollections.collectionData.save(collectionData)
    }

    const dbCollection = insecureCollections[collection]

    const entity = await dbCollection.load(_id)

    await action( entity )

    return dbCollection.save(entity)
  }

  const assertRootOrOwner = (
    dbItem: SecureDbItem, operation: string 
  ) => {
    if (user.isRoot || user._id === dbItem._owner._id) return
  
    throw createEperm( operation )
  }
  
  const assertGrp = (
    dbItem: SecureDbItem, groupName: string
  ) => {
    if( user.isRoot ) return 

    if( 
      user._id === dbItem._owner._id && isUserInGroup( user.name, groupName ) 
    ) return
  
    throw createEperm( 'chgrp' )
  }
  
  const chmod: Chmod<EntityMap> = async (mode, collection, _id) => 
    accessChange( 
      async entity => {
        assertRootOrOwner( entity, 'chmod' )

        entity._mode = mode
      }, 
      collection, _id 
    )

  const chown: Chown<EntityMap> = async ( userName, collection, _id ) => 
    accessChange(
      async entity => {
        assertRootOrOwner( entity, 'chmod' )

        const newOwner = await insecureCollections.user.findOne({ name: userName })

        if( newOwner === undefined )
          throw Error( `Expected user named ${ userName }`)

        entity._owner = { _id: newOwner._id, _collection: 'user' }
      },
      collection, _id
    )

  const chgrp: Chgrp<EntityMap> = async ( groupName, collection, _id ) => 
    accessChange(
      async entity => {
        assertGrp( entity, groupName )

        const newGroup = await insecureCollections.group.findOne({ name: groupName })

        if( newGroup === undefined )
          throw Error( `Expected group named ${ groupName }`)

        entity._group = { _id: newGroup._id, _collection: 'group' }
      },
      collection, _id
    )

  const fns: AccessFns<EntityMap> = { chmod, chown, chgrp }

  return fns
}
