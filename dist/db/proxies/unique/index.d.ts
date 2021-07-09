import { DbItem, EntityDb } from '../../types';
export declare const uniqueFieldDbFactory: <TEntityMap, D extends DbItem>(db: EntityDb<TEntityMap, D>, getUniqueFieldNames: (key: keyof TEntityMap) => string[]) => EntityDb<TEntityMap, D>;
