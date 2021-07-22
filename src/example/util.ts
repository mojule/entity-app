import { EntityDb } from '..'
import { FooBarEntityMap } from './types'

export const populateDb = async ( db: EntityDb<FooBarEntityMap> ) => {
  const { foo, bar } = db.collections
  
  const fooId = await foo.create({ name: 'a', value: 0 })
   
  const barId = await bar.create({ 
    name: 'b', value: 1, 
    foo: {
      _collection: 'foo',
      _id: fooId
    }
  })

  await bar.save({ _id: barId, value: 2 })
  await foo.save({ _id: fooId, value: 5 })  
}