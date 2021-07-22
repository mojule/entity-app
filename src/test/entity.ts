import * as assert from 'assert'
import { eachEntityKey, eachEntityKeySync } from '../entity/each-entity-key'
import { EntityKeys } from '../entity/types'

describe('entity', () => {
  type EntityMap = { a: 'a', b: 'b', c: 'c' }

  const keys: EntityKeys<EntityMap> = { a: 'a', b: 'b', c: 'c' } as const
  const expect = [ 'a', 'b', 'c' ] as const

  it('eachEntityKey', async () => {
    const result: string[] = []

    await eachEntityKey(keys, async key => {
      result.push( key )
    })

    assert.deepStrictEqual( result, expect )
  })

  it('eachEntityKeySync', () => {
    const result: string[] = []

    eachEntityKeySync( keys, key => {
      result.push( key )
    })

    assert.deepStrictEqual( result, expect )
  })

})