import * as assert from 'assert'
import { dbItemToEntity, dbItemToMetadata } from '../db/db-item-to-entity'
import { PublicThing } from './fixtures/common'
import { createMetadataDb } from './fixtures/metadata-db'

describe( 'db', () => {
  it( 'dbItemToEntity', async () => {
    const db = await createMetadataDb()

    const _id = await db.collections.publicThing.create(
      { name: 'thing', value: 42 }
    )

    const dbItem = await db.collections.publicThing.load( _id )

    const entity = dbItemToEntity<PublicThing>( dbItem )
    
    const entityKeys = Object.keys( entity )

    assert.deepStrictEqual( entityKeys, [ '_id', 'name', 'value' ] )
  } )

  it( 'dbItemToMetadata', async () => {
    const db = await createMetadataDb()

    const _id = await db.collections.publicThing.create(
      { name: 'thing', value: 42 }
    )

    const dbItem = await db.collections.publicThing.load( _id )

    const metadata = dbItemToMetadata( dbItem )

    const metadataKeys = Object.keys( metadata )

    assert.deepStrictEqual( 
      metadataKeys, 
      [ '_id', '_ver', '_atime', '_ctime', '_mtime' ] 
    )
  })
})