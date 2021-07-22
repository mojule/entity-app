import { DbItem, DbRef, DbRefFor, EntityDb } from './types'

export const isRef = <TEntityMap>(ref: any): ref is DbRef<TEntityMap> => {
  if (!ref) return false
  if (typeof ref._id !== 'string') return false
  if (typeof ref._collection !== 'string') return false

  return true
}

export const isRefArray = <TEntityMap>(arg: any[]): arg is DbRef<TEntityMap>[] => {
  if (!Array.isArray(arg)) return false
  if (!arg.every(isRef)) return false

  return true
}

export const resolveRef = async <TEntityMap, K extends keyof TEntityMap, D extends DbItem = DbItem>(
  db: EntityDb<TEntityMap, D>, ref: DbRefFor<TEntityMap, K>
) => {
  const { _collection, _id } = ref
  const collection = db.collections[_collection]
  const dbEntity = await collection.load(_id)

  return dbEntity
}

export const resolveRefArray = async <TEntityMap, K extends keyof TEntityMap, D extends DbItem = DbItem>(
  db: EntityDb<TEntityMap, D>, refs: DbRefFor<TEntityMap, K>[]
) => {
  if (refs.length === 0) return []

  const [first] = refs
  const { _collection } = first
  const ids = refs.map(ref => ref._id)

  const dbEntitys = await db.collections[_collection].loadMany(ids)

  return dbEntitys
}

export const resolveRefsShallow = async <TModelMap, TEntityMap, K extends keyof TEntityMap & keyof TModelMap & string>(
  db: EntityDb<TEntityMap>, obj: TEntityMap[K]
) => {
  const result: Partial<TModelMap[K]> = {}
  const keys = Object.keys(obj)

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = obj[key]

    if (isRef<TEntityMap>(value)) {
      const resolved = await resolveRef(db, value)

      result[key] = resolved
    } else if (isRefArray<TEntityMap>(value)) {
      result[key] = await resolveRefArray(db, value)
    } else {
      result[key] = value
    }
  }

  return result as TModelMap[K]
}

export const resolveRefsDeep = async <TModelMap, TEntityMap, K extends keyof TEntityMap & keyof TModelMap & string>(
  db: EntityDb<TEntityMap>, obj: TEntityMap[K], depthLimit = 20
) => {
  const resolve = async<TEntity>(obj: TEntity, depth = 0) => {
    if (depth > depthLimit)
      throw Error('Exceeded depth limit')

    const result: Partial<TModelMap[K]> = {}
    const keys = Object.keys(obj)

    for (let i = 0; i < keys.length; i++) {
      const value = obj[keys[i]]

      if (isRef<TEntityMap>(value)) {
        let entity = await resolveRef(db, value)

        result[keys[i]] = await resolve(entity, depth + 1)
      } else if (isRefArray<TEntityMap>(value)) {
        let entities = await resolveRefArray(db, value)

        result[keys[i]] = await Promise.all(
          entities.map(e => resolve(e, depth + 1))
        )
      } else {
        result[keys[i]] = value
      }
    }

    return result as TModelMap[K]
  }

  return resolve(obj)
}
