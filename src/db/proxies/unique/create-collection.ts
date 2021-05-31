import {
  DbCollection, DbCreate, DbCreateMany, DbSave, DbSaveMany, DbFindOne, DbFind
} from '../../types'

import { clone } from '../../../util/clone'

export const createUniqueFieldsCollection =
  async <K extends keyof TEntityMap, TEntityMap>(
    collection: DbCollection<TEntityMap[ K ]>,
    key: K & string,
    uniqueNames: string[]
  ) => {
    const {
      create: originalCreate,
      createMany: originalCreateMany,
      save: originalSave,
      saveMany: originalSaveMany,
      find
    } = collection

    const create: DbCreate<TEntityMap[ K ]> = async entity => {
      await assertUniqueForNames( uniqueNames, key, entity, find )

      return originalCreate( entity )
    }

    const createMany: DbCreateMany<TEntityMap[ K ]> = async entities => {
      await Promise.all(
        entities.map( e => assertUniqueForNames( uniqueNames, key, e, find ) )
      )

      return originalCreateMany( entities )
    }

    const save: DbSave<TEntityMap[ K ]> = async document => {
      await assertUniqueForNames(
        uniqueNames, key, document, find, document._id
      )

      return originalSave( document )
    }

    const saveMany: DbSaveMany<TEntityMap[ K ]> = async documents => {
      await Promise.all(
        documents.map(
          e => assertUniqueForNames( uniqueNames, key, e, find, e._id )
        )
      )

      return originalSaveMany( documents )
    }

    const uniqueCollection: DbCollection<TEntityMap[ K ]> = Object.assign(
      {}, collection, { create, createMany, save, saveMany }
    )

    return uniqueCollection
  }

const assertUniqueForNames = async <TEntity>(
  uniqueNames: string[], entityKey: string, entity: TEntity, find: DbFind<TEntity>,
  currentId = ''
) => {
  for ( let i = 0; i < uniqueNames.length; i++ ) {
    const name = uniqueNames[ i ]
    const value = entity[ name ]

    await assertUnique( entityKey, name, value, find, currentId )
  }
}

const assertUnique = async <TEntity>(
  entityKey: string, propertyKey: string, value: any, find: DbFind<TEntity>,
  currentId = ''
) => {
  let duplicates = await find( { [ propertyKey ]: value } )

  if ( currentId !== '' ) {
    duplicates = duplicates.filter( e => e._id !== currentId )
  }

  if ( duplicates.length === 0 ) return

  throw Error(
    `Expected "${ entityKey }:${ propertyKey }" to be unique, but entity with id ${
    duplicates[ 0 ]._id } also has the value ${ value }`
  )
}