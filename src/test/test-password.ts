import { randId } from '@mojule/util'
import * as assert from 'assert'
import { testPassword } from '../security/password-strength'

describe( 'testPassword', () => {
  describe( 'compulsory', () => {
    it( 'fails minLength', () => {
      const test = testPassword( 'abc' )
  
      assert( !test.isStrong )
      assert( !test.results.minLength )
    })
  
    it( 'fails maxLength', () => {
      const test = testPassword( 'a'.repeat( 129 ) )
  
      assert( !test.isStrong )
      assert( !test.results.maxLength )
    })
  
    it( 'fails repeat', () => {
      const test = testPassword( 'a'.repeat( 3 ) + randId( 7 ) )
  
      assert( !test.isStrong )
      assert( !test.results.repeat )
    })  
  })

  describe( 'optional (3 of 4)', () => {
    it( 'fails lowercase', () => {
      const test = testPassword( randId( 10 ).toUpperCase() )
  
      assert( !test.results.lowercase )
    })
  
    it( 'fails uppercase', () => {
      const test = testPassword( randId( 10 ).toLowerCase() )
  
      assert( !test.results.uppercase )
    })
  
    it( 'fails number', () => {
      const test = testPassword( 'aAbBcCdDeE' )
  
      assert( !test.results.number )
    })
  
    it( 'fails symbol', () => {
      const test = testPassword( 'aA0bB1cC2d' )
  
      assert( !test.results.symbol )
    })  

    it( 'it fails with 2/4', () => {
      const test = testPassword( 'aAbBcCdDeE' )

      assert( !test.isStrong )
    } )
  })
})
