import { createSequence } from '@mojule/util'
import { EntityKeys, createMemoryDb, createDefaultDbItem } from '../..'

export type MemUser = {
  name: string
  group: string
}

export type MemGroup = {
  name: string
  users: string[]
}

export type MemEntityMap = {
  user: MemUser
  group: MemGroup
}

export const memEntityKeys: EntityKeys<MemEntityMap> = {
  user: 'user',
  group: 'group'
}

export const testMemUser: MemUser = { name: 'Nik', group: 'Goobers' }

export const createMemDb = async () => createMemoryDb(
  '', memEntityKeys, createDefaultDbItem
)

export const createMemDbWithUser = async () => {
  const db = await createMemDb()

  const _id = await db.collections.user.create(testMemUser)

  return { db, _id }
}

export const multipleUsers = createSequence(
  10,
  i => (
    {
      name: `User ${i}`,
      group: i < 3 ? 'Goobers' : i === 3 ? 'Bobs' : 'Boogers'
    }
  )
)
