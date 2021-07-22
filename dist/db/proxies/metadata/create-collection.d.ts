import { DbCollection, DbSave, DbSaveMany } from '../../types';
import { MetadataDbItem } from './types';
export declare const createMetadataCollection: <K extends keyof TEntityMap, TEntityMap, D extends MetadataDbItem>(collection: DbCollection<TEntityMap[K], D>, _key: K & string, extendAccess?: <T extends MetadataDbItem>(save: DbSave<T>, entity: T, now?: number) => Promise<T>, extendAccessMany?: <T_1 extends MetadataDbItem>(saveMany: DbSaveMany<T_1>, entities: T_1[], now?: number) => Promise<T_1[]>) => DbCollection<TEntityMap[K], D>;
export declare const defaultExtendAccess: <T extends MetadataDbItem>(save: DbSave<T>, entity: T, now?: number) => Promise<T>;
export declare const defaultExtendAccessMany: <T extends MetadataDbItem>(saveMany: DbSaveMany<T>, entities: T[], now?: number) => Promise<T[]>;
