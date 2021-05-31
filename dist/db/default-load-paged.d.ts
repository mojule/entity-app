import { DbIds, DbLoadMany, DbLoadPaged } from './types';
export declare const defaultLoadPaged: <TEntity>(ids: DbIds, loadMany: DbLoadMany<TEntity>) => DbLoadPaged<TEntity>;
