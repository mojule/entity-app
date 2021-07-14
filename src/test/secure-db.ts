import { parseSymbolicNotation } from '@mojule/mode'
import * as assert from 'assert'
import { createSecureMemDbLogin, getRootUser } from './fixtures/secure-db'

describe( 'secure db', () => {
  it( 'creates a secure db login', async () => {
    const {login} = await createSecureMemDbLogin()

    assert.strictEqual( typeof login, 'function' )
  })

  it( 'logs in to secure db', async () => {
    const {login} = await createSecureMemDbLogin()

    const db = await login( getRootUser() )

    assert( db ) 
    assert( db.collections )
  })

  it( 'create user', async () => {
    const {login} = await createSecureMemDbLogin()

    const db = await login( getRootUser() )

        
  })

  it( 'chmod entity', async () => {
    const {login, memDb} = await createSecureMemDbLogin()

    const db = await login( getRootUser() )

    const thingId = await db.collections.publicThing.create(
      { name: 'foo', value: 42 }
    )

    const newMode = parseSymbolicNotation( 'rwxrwxrwx' )

    await db.chmod( newMode, 'publicThing', thingId )

    const thing = await db.collections.publicThing.load( thingId )

    assert.strictEqual( thing._mode, newMode )
  })

  it( 'chmod collection', async () => {
    const {login, memDb} = await createSecureMemDbLogin()

    const db = await login( getRootUser() )

    const newMode = parseSymbolicNotation( 'rwxrwxrwx' )

    await db.chmod( newMode, 'publicThing' )

    const thingData = await memDb.collections.collectionData.findOne(
      { name: 'publicThing'}
    )

    assert( thingData )
    assert.strictEqual( thingData!._mode, newMode )
  })

  it( 'fails chmod on nonexistant collection', async () => {
    const {login } = await createSecureMemDbLogin()

    const db = await login( getRootUser() )

    const newMode = parseSymbolicNotation( 'rwxrwxrwx' )

    assert.rejects(
      db.chmod( newMode, 'nothing' as any ),
      {
        message: 'Expected collectionData for nothing'
      }
    )    
  })
})
