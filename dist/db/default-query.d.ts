import { DbIds, DbLoadMany, DbFind, DbFindOne } from './types';
export declare const defaultFind: <TEntity>(ids: DbIds, loadMany: DbLoadMany<TEntity>) => DbFind<TEntity>;
export declare const defaultFindOne: <TEntity>(ids: DbIds, loadMany: DbLoadMany<TEntity>) => DbFindOne<TEntity>;
