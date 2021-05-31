import { CreateDb } from '../../types';
export declare const uniqueFieldDbFactory: <TEntityMap>(createDb: CreateDb<TEntityMap, any>, getUniqueFieldNames: (key: keyof TEntityMap) => string[]) => CreateDb<TEntityMap, any>;
