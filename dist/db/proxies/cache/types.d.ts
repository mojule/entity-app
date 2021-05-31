import { DbCollection, EntityDb, CreateDb } from '../../types';
import { EntityKeys } from '../../../entity/types';
export interface DbCachedCollection {
    flushCache: () => Promise<void>;
}
export declare type DbCachedCollections<TEntityMap> = {
    [key in keyof TEntityMap]: DbCollection<TEntityMap[key]> & DbCachedCollection;
};
export interface EntityDbCached<TEntityMap> extends EntityDb<TEntityMap> {
    collections: DbCachedCollections<TEntityMap>;
}
export interface CreateDbCached<TEntityMap> extends CreateDb<TEntityMap> {
    (name: string, keys: EntityKeys<TEntityMap>): Promise<EntityDbCached<TEntityMap>>;
}
