import { EntityKeys } from '../entity/types';
import { SchemaMap } from '../schema/types';
export interface DbCreate<TEntity> {
    (entity: TEntity): Promise<string>;
}
export interface DbCreateMany<TEntity> {
    (entities: TEntity[]): Promise<string[]>;
}
export interface DbLoad<TEntity> {
    (id: string): Promise<TEntity & DbItem>;
}
export interface DbLoadMany<TEntity> {
    (ids: string[]): Promise<(TEntity & DbItem)[]>;
}
export interface DbSave<TEntity> {
    (document: TEntity & DbItem): Promise<void>;
}
export interface DbSaveMany<TEntity> {
    (documents: (TEntity & DbItem)[]): Promise<void>;
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
export interface DbFind<TEntity> {
    (criteria: any): Promise<(TEntity & DbItem)[]>;
}
export interface DbFindOne<TEntity> {
    (criteria: any): Promise<TEntity & DbItem | undefined>;
}
export interface DbLoadPaged<TEntity> {
    (pageSize: number, pageIndex?: number): Promise<(TEntity & DbItem)[]>;
}
export interface DbCollection<TEntity> {
    ids: DbIds;
    create: DbCreate<TEntity>;
    createMany: DbCreateMany<TEntity>;
    load: DbLoad<TEntity>;
    loadMany: DbLoadMany<TEntity>;
    save: DbSave<TEntity>;
    saveMany: DbSaveMany<TEntity>;
    remove: DbRemove;
    removeMany: DbRemoveMany;
    find: DbFind<TEntity>;
    findOne: DbFindOne<TEntity>;
    loadPaged: DbLoadPaged<TEntity>;
}
export interface EntityDb<TEntityMap> {
    drop: () => Promise<void>;
    close: () => Promise<void>;
    collections: DbCollections<TEntityMap>;
}
export interface EntitySchemaDb<TEntityMap> extends EntityDb<TEntityMap> {
    getAllSchema: () => Promise<SchemaMap>;
}
export declare type DbCollections<TEntityMap> = {
    [key in keyof TEntityMap]: DbCollection<TEntityMap[key]>;
};
export interface DbItem {
    _id: string;
}
export interface DbRef<TEntityMap> extends DbItem {
    _collection: keyof TEntityMap;
}
export interface CreateDb<TEntityMap, TOptions = any> {
    (name: string, keys: EntityKeys<TEntityMap>, options?: TOptions): Promise<EntityDb<TEntityMap>>;
}
export declare type ActionType = 'create' | 'update' | 'read' | 'delete';
