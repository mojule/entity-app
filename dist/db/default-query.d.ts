import { DbIds, DbLoadMany, DbFind, DbFindOne, DbItem } from './types';
export declare const defaultFind: <TEntity, D extends DbItem = DbItem>(ids: DbIds, loadMany: DbLoadMany<TEntity, D>) => DbFind<TEntity, D>;
export declare const defaultFindOne: <TEntity, D extends DbItem = DbItem>(ids: DbIds, loadMany: DbLoadMany<TEntity, D>) => DbFindOne<TEntity, D>;
