import { eachAsync } from '@mojule/util'

import { ValidateOptions, ValidateEntity } from './types'
import { DbCollection, DbItem } from '../../types'
import { dbItemToEntity } from '../../db-item-to-entity'
import { defaultLoadPaged } from '../../default-load-paged'
import { createApplyPartial } from '../../save-partial'

export const createValidatedCollection = <
  K extends keyof TEntityMap, TEntityMap, D extends DbItem
>(
  collection: DbCollection<TEntityMap[K],D>,
  key: K & string,
  validator: ValidateEntity<TEntityMap>,
  { onCreate, onLoad, onSave }: ValidateOptions
) => {
  const { ids, remove, removeMany } = collection

  let {
    create, createMany, load, loadMany, save, saveMany, find, findOne
  } = collection

  const validate = async (entity: TEntityMap[K]) => {
    const err = await validator(key, entity)

    if (err) throw err
  }

  if (onCreate) {
    create = async entity => {
      await validate(entity)

      return await collection.create(entity)
    }

    createMany = async entities => {
      await eachAsync(entities, validate)

      return await collection.createMany(entities)
    }
  }

  if (onLoad) {
    load = async id => {
      const dbEntity = await collection.load(id)
      const entity = dbItemToEntity(dbEntity)

      await validate(entity)

      return dbEntity
    }

    loadMany = async ids => {
      const dbEntities = await collection.loadMany(ids)
      const entities = dbEntities.map(dbItemToEntity)

      await eachAsync(entities, validate)

      return dbEntities
    }

    find = async criteria => {
      const dbEntities = await collection.find(criteria)

      const entities = dbEntities.map(dbItemToEntity)

      await eachAsync(entities, validate)

      return dbEntities
    }

    findOne = async criteria => {
      const dbEntity = await collection.findOne(criteria)

      if (dbEntity === undefined) return dbEntity

      await validate(dbEntity)

      return dbEntity
    }
  }

  if (onSave) {
    save = async document => {     
      const entity = await applyPartial( document )

      await validate( dbItemToEntity( entity ) )

      return collection.save(document)
    }

    saveMany = async documents => {
      for( const doc of documents ){
        const entity = await applyPartial( doc )

        await validate( dbItemToEntity( entity ) )
      }

      return collection.saveMany(documents)
    }
  }

  const loadPaged = defaultLoadPaged(ids, loadMany)

  const validatedCollection: DbCollection<TEntityMap[K], D> = {
    ids, create, createMany, load, loadMany, save, saveMany, remove,
    removeMany, find, findOne, loadPaged
  }
  
  const applyPartial = createApplyPartial( validatedCollection )  

  return validatedCollection
}
