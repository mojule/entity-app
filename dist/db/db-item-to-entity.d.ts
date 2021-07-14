import { DbItem } from './types';
export declare const dbItemToEntity: <TEntity>(dbItem: TEntity) => TEntity;
export declare const dbItemToMetadata: <TEntity, D extends DbItem = DbItem>(dbItem: TEntity & D) => D;
