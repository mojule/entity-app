import { DbCollection } from '../../types';
export declare const createUniqueFieldsCollection: <K extends keyof TEntityMap, TEntityMap>(collection: DbCollection<TEntityMap[K]>, key: K & string, uniqueNames: string[]) => Promise<DbCollection<TEntityMap[K]>>;
