import { DbItem, DbCollection } from '../types';
export declare const createCollection: <TEntity, D extends DbItem>(createDbItem: () => D) => DbCollection<TEntity, D>;
