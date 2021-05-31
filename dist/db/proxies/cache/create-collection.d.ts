import { DbCachedCollection } from './types';
import { DbCollection } from '../../types';
export declare const createCacheCollection: <TEntity>(collection: DbCollection<TEntity>) => Promise<DbCollection<TEntity> & DbCachedCollection>;
