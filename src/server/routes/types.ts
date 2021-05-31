import { RequestHandler, Application } from 'express'
import { DbCollection, EntitySchemaDb } from '../../db/types'
import { Request } from 'express-serve-static-core'
import { Role } from '../../security/types'

export interface Route<TMeta = any> {
  method: Method
  path: string
  handlers: RequestHandler[]
  meta?: TMeta
  roles: Role[]
}

export interface CollectionRouteMeta<TEntityMap> {
  collectionKey: keyof TEntityMap
}

export interface StoreRouteMeta<TEntityMap>
  extends CollectionRouteMeta<TEntityMap> {
  action: keyof DbCollection<TEntityMap>
}

export interface StoreRoute<TEntityMap>
  extends Route<StoreRouteMeta<TEntityMap>> {
  meta: StoreRouteMeta<TEntityMap>
}

export interface SchemaRoute<TEntityMap>
  extends Route<CollectionRouteMeta<TEntityMap>> {
  meta: CollectionRouteMeta<TEntityMap>
}

export type Method = keyof Application & ( 'get' | 'post' )

export interface GetPath {
  ( collectionSlug: string, actionSlug: string, omitId?: boolean ): string
}

export type ActionType = 'create' | 'update' | 'read' | 'delete'

export interface GetResult<TEntityMap,TResult = any> {
  (
    collectionKey: keyof TEntityMap,
    store: EntitySchemaDb<TEntityMap>,
    action: keyof DbCollection<TEntityMap>,
    type: ActionType,
    req: Request,
    omitId?: boolean
  ): Promise<TResult>
}
