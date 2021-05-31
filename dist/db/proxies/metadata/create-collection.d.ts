import { DbCollection } from '../../types';
export declare const createMetadataCollection: <K extends keyof TEntityMap, TEntityMap>(collection: DbCollection<TEntityMap[K]>, _key: K & string, extendCreate?: <TEntity>(entity: TEntity, now?: string) => TEntity, extendSave?: <TEntity_1>(entity: TEntity_1, now?: string) => TEntity_1) => Promise<DbCollection<TEntityMap[K]>>;
export declare const defaultExtendCreate: <TEntity>(entity: TEntity, now?: string) => TEntity;
export declare const defaultExtendSave: <TEntity>(entity: TEntity, now?: string) => TEntity;
