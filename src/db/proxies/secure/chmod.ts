import { DbCollections } from '../../types'
import { createEperm } from './errors'
import { SecureEntityMap, SecureDbItem, SecureUser, Chmod } from './types'

export const createChmod = async <
  EntityMap extends SecureEntityMap,
  D extends SecureDbItem = SecureDbItem
>(
  collections: DbCollections<EntityMap, D>,
  user: SecureUser
) => {
  const chmod: Chmod<EntityMap> = async (mode, collection, _id) => {
    const collectionData = await collections.collectionData.findOne(
      { name: collection }
    )

    if (collectionData === undefined)
      throw Error(`Expected collectionData for ${collection}`)

    if (_id === undefined) {
      assertChmod(user, collectionData)

      collectionData._mode = mode

      await collections.collectionData.save(collectionData)

      return
    }

    const dbCollection = collections[collection]

    const entity = await dbCollection.load(_id)

    assertChmod(user, entity)

    entity._mode = mode

    await dbCollection.save(entity)
  }

  return chmod
}

const assertChmod = (dbUser: SecureUser, dbItem: SecureDbItem) => {
  if (dbUser.isRoot || dbUser._id === dbItem._owner._id) return

  throw createEperm('chmod')
}
