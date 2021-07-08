import {
  DbCollection, DbCreate, DbCreateMany, DbSave, DbSaveMany, DbFind, DbItem
} from '../../types'

export const createUniqueFieldsCollection =
  <K extends keyof TEntityMap, TEntityMap, D extends DbItem>(
    collection: DbCollection<TEntityMap[K], D>,
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

    const create: DbCreate<TEntityMap[K]> = async entity => {
      await assertUniqueForNames(uniqueNames, key, entity, find)

      return originalCreate(entity)
    }

    const createMany: DbCreateMany<TEntityMap[K]> = async entities => {
      await Promise.all(
        entities.map(e => assertUniqueForNames(uniqueNames, key, e, find))
      )

      return originalCreateMany(entities)
    }

    const save: DbSave<TEntityMap[K]> = async document => {
      await assertUniqueForNames(
        uniqueNames, key, document, find, document._id
      )

      return originalSave(document)
    }

    const saveMany: DbSaveMany<TEntityMap[K]> = async documents => {
      await Promise.all(
        documents.map(
          e => assertUniqueForNames(uniqueNames, key, e, find, e._id)
        )
      )

      return originalSaveMany(documents)
    }

    const uniqueCollection: DbCollection<TEntityMap[K], D> = Object.assign(
      {}, collection, { create, createMany, save, saveMany }
    )

    return uniqueCollection
  }

const assertUniqueForNames = async <TEntity, D extends DbItem>(
  uniqueNames: string[], entityKey: string, entity: Partial<TEntity>,
  find: DbFind<TEntity, D>,
  currentId = ''
) => {
  for (let i = 0; i < uniqueNames.length; i++) {
    const name = uniqueNames[i]
    const value = entity[name]

    if (value === 'undefined') continue

    await assertUnique(entityKey, name, value, find, currentId)
  }
}

const assertUnique = async <TEntity, D extends DbItem>(
  entityKey: string, propertyKey: string, value: any, find: DbFind<TEntity, D>,
  currentId = ''
) => {
  let duplicates = await find({ [propertyKey]: value })

  if (currentId !== '') {
    duplicates = duplicates.filter(e => e._id !== currentId)
  }

  if (duplicates.length === 0) return

  throw Error(
    `Expected "${entityKey}:${propertyKey}" to be unique, but entity with id ${
      duplicates[0]._id} also has the value ${value}`
  )
}
