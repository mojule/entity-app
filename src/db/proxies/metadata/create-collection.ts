import {
  DbCollection, DbCreate, DbCreateMany, DbSave, DbSaveMany
} from '../../types'

import { clone } from '@mojule/util'

export const createMetadataCollection =
  async <K extends keyof TEntityMap, TEntityMap>(
    collection: DbCollection<TEntityMap[ K ]>,
    _key: K & string,
    extendCreate = defaultExtendCreate,
    extendSave = defaultExtendSave
  ) => {
    const {
      create: originalCreate,
      createMany: originalCreateMany,
      save: originalSave,
      saveMany: originalSaveMany
    } = collection

    const create: DbCreate<TEntityMap[ K ]> = async entity =>
      originalCreate( extendCreate( entity ) )

    const createMany: DbCreateMany<TEntityMap[ K ]> = async entities => {
      const now = new Date().toJSON()

      entities = entities.map( entity => extendCreate( entity, now ) )

      return originalCreateMany( entities )
    }

    const save: DbSave<TEntityMap[ K ]> = async document =>
      originalSave( extendSave( document ) )

    const saveMany: DbSaveMany<TEntityMap[ K ]> = async documents => {
      const now = new Date().toJSON()

      documents = documents.map( document => extendSave( document, now ) )

      return originalSaveMany( documents )
    }

    const metadataCollection: DbCollection<TEntityMap[ K ]> = Object.assign(
      {}, collection, { create, createMany, save, saveMany }
    )

    return metadataCollection
  }

export const defaultExtendCreate = <TEntity>(
  entity: TEntity, now = new Date().toJSON()
) => {
  entity = clone( entity )
  entity[ '_v' ] = 0
  entity[ '_created' ] = now
  entity[ '_updated' ] = now

  return entity
}

export const defaultExtendSave = <TEntity>(
  entity: TEntity, now = new Date().toJSON()
) => {
  entity = clone( entity )

  if ( typeof entity[ '_v' ] === 'number' ) {
    entity[ '_v' ]++
  } else {
    entity[ '_v' ] = 0
  }

  entity[ '_updated' ] = now

  return entity
}