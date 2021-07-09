import { DbCollection } from '../../types';
import { MetadataDbItem } from './types';
export declare const createMetadataCollection: <K extends keyof TEntityMap, TEntityMap, D extends MetadataDbItem>(collection: DbCollection<TEntityMap[K], D>, _key: K & string, extendCreate?: <TEntity>(entity: TEntity, now?: string) => TEntity, extendSave?: <TEntity_1>(entity: TEntity_1, now?: string) => TEntity_1) => DbCollection<TEntityMap[K], D>;
export declare const defaultExtendCreate: <TEntity>(entity: TEntity, now?: string) => TEntity;
export declare const defaultExtendSave: <TEntity>(entity: TEntity, now?: string) => TEntity;
