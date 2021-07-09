import { EntityKeys } from '../entity/types';
import { SchemaMap } from '../schema/types';
import { CreateDbItem } from './db-memory/types';
export interface DbCreate<TEntity> {
    (entity: TEntity): Promise<string>;
}
export interface DbCreateMany<TEntity> {
    (entities: TEntity[]): Promise<string[]>;
}
export interface DbLoad<TEntity, D extends DbItem = DbItem> {
    (id: string): Promise<TEntity & D>;
}
export interface DbLoadMany<TEntity, D extends DbItem = DbItem> {
    (ids: string[]): Promise<(TEntity & D)[]>;
}
export interface DbSave<TEntity> {
    (document: Partial<TEntity> & DbItem): Promise<void>;
}
export interface DbSaveMany<TEntity> {
    (documents: (Partial<TEntity> & DbItem)[]): Promise<void>;
}
export interface DbRemove {
    (id: string): Promise<void>;
}
export interface DbRemoveMany {
    (ids: string[]): Promise<void>;
}
export interface DbIds {
    (): Promise<string[]>;
}
export interface DbFind<TEntity, D extends DbItem = DbItem> {
    (criteria: any): Promise<(TEntity & D)[]>;
}
export interface DbFindOne<TEntity, D extends DbItem = DbItem> {
    (criteria: any): Promise<TEntity & D | undefined>;
}
export interface DbLoadPaged<TEntity, D extends DbItem = DbItem> {
    (pageSize: number, pageIndex?: number): Promise<(TEntity & D)[]>;
}
export declare type DbCollectionRead<TEntity, D extends DbItem = DbItem> = {
    ids: DbIds;
    load: DbLoad<TEntity, D>;
    loadMany: DbLoadMany<TEntity, D>;
    find: DbFind<TEntity, D>;
    findOne: DbFindOne<TEntity, D>;
    loadPaged: DbLoadPaged<TEntity, D>;
};
export declare type DbCollectionWrite<TEntity> = {
    create: DbCreate<TEntity>;
    createMany: DbCreateMany<TEntity>;
    save: DbSave<TEntity>;
    saveMany: DbSaveMany<TEntity>;
    remove: DbRemove;
    removeMany: DbRemoveMany;
};
export declare type DbCollection<TEntity, D extends DbItem = DbItem> = DbCollectionRead<TEntity, D> & DbCollectionWrite<TEntity>;
export declare type EntityDb<TEntityMap, D extends DbItem = DbItem> = {
    drop: () => Promise<void>;
    close: () => Promise<void>;
    collections: DbCollections<TEntityMap, D>;
};
export declare type EntityDbReadable<TEntityMap, D extends DbItem = DbItem> = {
    close: () => Promise<void>;
    collections: DbCollectionsReadable<TEntityMap, D>;
};
export interface EntitySchemaDb<TEntityMap> extends EntityDb<TEntityMap> {
    getAllSchema: () => Promise<SchemaMap>;
}
export declare type DbCollections<TEntityMap, D extends DbItem = DbItem> = {
    [key in keyof TEntityMap]: DbCollection<TEntityMap[key], D>;
};
export declare type DbCollectionsReadable<TEntityMap, D extends DbItem = DbItem> = {
    [key in keyof TEntityMap]: DbCollectionRead<TEntityMap[key], D>;
};
export declare type DbItem = {
    _id: string;
};
export declare type DbRef<TEntityMap> = DbItem & {
    _collection: keyof TEntityMap;
};
export declare type DbRefFor<TEntityMap, K extends keyof TEntityMap> = DbRef<TEntityMap> & {
    _collection: K;
};
export interface CreateDb<TEntityMap, D extends DbItem = DbItem> {
    (name: string, keys: EntityKeys<TEntityMap>, createDbItem: CreateDbItem<D>): Promise<EntityDb<TEntityMap, D>>;
}
export declare type ActionType = 'create' | 'update' | 'read' | 'delete';
