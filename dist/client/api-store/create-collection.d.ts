import { DbCollection } from '../../db/types';
export declare const createCollection: <TEntityMap, K extends keyof TEntityMap>(key: K) => DbCollection<TEntityMap[K]>;
