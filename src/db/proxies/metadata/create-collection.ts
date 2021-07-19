import {
  DbCollection, DbFind, DbFindOne, DbItem, DbLoad, DbLoadMany, DbLoadPaged,
  DbSave, DbSaveMany
} from '../../types'

import { clone } from '@mojule/util'
import { MetadataDbItem } from './types'

export const createMetadataCollection =
  <K extends keyof TEntityMap, TEntityMap, D extends MetadataDbItem>(
    collection: DbCollection<TEntityMap[K], D>,
    _key: K & string,
    extendAccess = defaultExtendAccess,
    extendAccessMany = defaultExtendAccessMany
  ) => {
    type TEntity = TEntityMap[K]

    const {
      load: originalLoad,
      loadMany: originalLoadMany,
      find: originalFind,
      findOne: originalFindOne,
      loadPaged: originalLoadPaged,
      save: originalSave,
      saveMany: originalSaveMany
    } = collection

    const load: DbLoad<TEntity, D> = async id =>
      extendAccess(originalSave, await originalLoad(id))

    const loadMany: DbLoadMany<TEntity, D> = async ids => {
      const entities = await originalLoadMany(ids)

      return extendAccessMany(originalSaveMany, entities)
    }

    const find: DbFind<TEntity, D> = async critera => {
      const entities = await originalFind(critera)

      return extendAccessMany(originalSaveMany, entities)
    }

    const findOne: DbFindOne<TEntity, D> = async criteria => {
      const entity = await originalFindOne(criteria)

      if (entity === undefined) return

      return extendAccess(originalSave, entity)
    }

    const loadPaged: DbLoadPaged<TEntity, D> = async (pageSize, pageIndex) => {
      const entities = await originalLoadPaged(pageSize, pageIndex)

      return extendAccessMany(originalSaveMany, entities)
    }

    const save: DbSave<TEntityMap[K]> = async document => {
      const original = await originalLoad(document._id)

      const { _ver } = original

      document['_ver'] = typeof _ver === 'number' ? _ver + 1 : 0
      document['_mtime'] = Date.now()

      return originalSave(document)
    }

    const saveMany: DbSaveMany<TEntityMap[K]> = async documents => {
      const now = Date.now()

      const ids = documents.map(d => d._id)

      const existing = await originalLoadMany(ids)

      for (let i = 0; i < documents.length; i++) {
        const entity = existing[i]
        const document = documents[i]

        if (entity._id !== document._id)
          throw Error(
            'Expected entity._id to be the same as document._id, ' +
            'check underlying db is returning items in correct order'
          )

        const { _ver } = entity

        document['_ver'] = typeof _ver === 'number' ? _ver + 1 : 0
        document['_mtime'] = now
      }

      return originalSaveMany(documents)
    }

    const metadataCollection: DbCollection<TEntityMap[K], D> = Object.assign(
      {},
      collection,
      {
        load, loadMany, find, findOne, loadPaged, save, saveMany
      }
    )

    return metadataCollection
  }

export const defaultExtendAccess = async <T extends MetadataDbItem>(
  save: DbSave<T>,
  entity: T,
  now = Date.now()
) => {
  const { _id } = entity
  const _atime = now
  const saveEntity = { _id, _atime } as Partial<T> & DbItem

  await save(saveEntity)

  entity['_atime'] = now

  return entity
}

export const defaultExtendAccessMany = async <T extends MetadataDbItem>(
  saveMany: DbSaveMany<T>,
  entities: T[],
  now = Date.now()
) => {
  const _atime = now
  const saveEntities: (Partial<T> & DbItem)[] = []

  for (const entity of entities) {
    saveEntities.push({ _id: entity._id, _atime } as Partial<T> & DbItem)
    entity._atime = _atime
  }

  await saveMany(saveEntities)

  return entities
}
