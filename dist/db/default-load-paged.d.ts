import { DbIds, DbItem, DbLoadMany, DbLoadPaged } from './types';
export declare const defaultLoadPaged: <TEntity, D extends DbItem = DbItem>(ids: DbIds, loadMany: DbLoadMany<TEntity, D>) => DbLoadPaged<TEntity, D>;
