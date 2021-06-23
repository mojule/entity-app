import { EntityKeys } from '../entity/types'
import { SchemaMap } from '../schema/types'

export interface DbCreate<TEntity> {
  ( entity: TEntity ): Promise<string>
}

export interface DbCreateMany<TEntity> {
  ( entities: TEntity[] ): Promise<string[]>
}

export interface DbLoad<TEntity> {
  ( id: string ): Promise<TEntity & DbItem>
}

export interface DbLoadMany<TEntity> {
  ( ids: string[] ): Promise<(TEntity & DbItem)[]>
}

export interface DbSave<TEntity> {
  ( document: TEntity & DbItem ): Promise<void>
}

export interface DbSaveMany<TEntity> {
  ( documents: (TEntity & DbItem)[] ): Promise<void>
}

export interface DbRemove {
  ( id: string ): Promise<void>
}

export interface DbRemoveMany {
  ( ids: string[] ): Promise<void>
}

export interface DbIds {
  (): Promise<string[]>
}

export interface DbFind<TEntity> {
  ( criteria: any ): Promise<( TEntity & DbItem )[]>
}


export interface DbFindOne<TEntity> {
  ( criteria: any ): Promise<TEntity & DbItem | undefined>
}

export interface DbLoadPaged<TEntity> {
  ( pageSize: number, pageIndex?: number ): Promise<( TEntity & DbItem )[]>
}

export type DbCollectionRead<TEntity> = {
  ids: DbIds
  load: DbLoad<TEntity>
  loadMany: DbLoadMany<TEntity>
  find: DbFind<TEntity>
  findOne: DbFindOne<TEntity>
  loadPaged: DbLoadPaged<TEntity>
}

export type DbCollectionWrite<TEntity> = {
  create: DbCreate<TEntity>
  createMany: DbCreateMany<TEntity>
  save: DbSave<TEntity>
  saveMany: DbSaveMany<TEntity>
  remove: DbRemove
  removeMany: DbRemoveMany
}

export type DbCollection<TEntity> = DbCollectionRead<TEntity> & DbCollectionWrite<TEntity>

export type EntityDb<TEntityMap> = {
  drop: () => Promise<void>
  close: () => Promise<void>
  collections: DbCollections<TEntityMap>
}

export type EntityDbReadable<TEntityMap> = {
  close: () => Promise<void>
  collections: DbCollectionsReadable<TEntityMap>
}

export interface EntitySchemaDb<TEntityMap> extends EntityDb<TEntityMap> {
  getAllSchema: () => Promise<SchemaMap>
}

export type DbCollections<TEntityMap> = {
  [ key in keyof TEntityMap ]: DbCollection<TEntityMap[ key ]>
}

export type DbCollectionsReadable<TEntityMap> = {
  [ key in keyof TEntityMap ]: DbCollectionRead<TEntityMap[ key ]>
}

export type DbItem = {
  _id: string
}

export type DbRef<TEntityMap> = DbItem & {
  _collection: keyof TEntityMap
}

export type DbRefFor<TEntityMap, K extends keyof TEntityMap> = DbRef<TEntityMap> & {
  _collection: K
}

export interface CreateDb<TEntityMap, TOptions = any> {
  ( name: string, keys: EntityKeys<TEntityMap>, options?: TOptions ):
    Promise<EntityDb<TEntityMap>>
}

export type ActionType = 'create' | 'update' | 'read' | 'delete'
