import { DbCollection, DbItem } from '../../types';
export declare const createUniqueFieldsCollection: <K extends keyof TEntityMap, TEntityMap, D extends DbItem>(collection: DbCollection<TEntityMap[K], D>, key: K & string, uniqueNames: string[]) => DbCollection<TEntityMap[K], D>;
