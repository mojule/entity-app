import * as assert from 'assert'
import { copyDb } from '../db/copy-db'
import { createDefaultDbItem, createMemoryDb } from '../db/db-memory'
import { copyEntityKeys, createSourceDb } from './fixtures/copy-db'
import { multipleUsers } from './fixtures/memory-db'

describe( 'copy db', () => {
  it( 'it copies an existing db', async () => {
    const sourceDb = await createSourceDb()

    const destDb = await createMemoryDb( 
      '', copyEntityKeys, createDefaultDbItem 
    )

    await copyDb( sourceDb, destDb )

    for( const userData of multipleUsers ){
      const { name, group: groupName } = userData
      const dbUser = await destDb.collections.user.findOne({ name })

      assert( dbUser !== undefined )

      const dbGroup = await destDb.collections.group.findOne(
        { name: groupName }
      )

      assert( dbGroup !== undefined )

      assert.strictEqual( dbUser.group._id, dbGroup._id )

      const userRef = dbGroup!.users.find( r => r._id === dbUser._id )

      assert( userRef !== undefined )
    }
  })
})
