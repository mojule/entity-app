import { DbItem } from './types';
export declare const dbItemToEntity: <Entity>(dbItem: Entity) => Entity;
export declare const dbItemToMetadata: <TEntity, D extends DbItem = DbItem>(dbItem: TEntity & D) => D;
