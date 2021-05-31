import { DbRef, EntityDb } from './types';
export declare const isRef: <TEntityMap>(ref: any) => ref is DbRef<TEntityMap>;
export declare const isRefArray: <TEntityMap>(arg: any[]) => arg is DbRef<TEntityMap>[];
export declare const resolveRef: <TEntityMap>(db: EntityDb<TEntityMap>, ref: DbRef<TEntityMap>) => Promise<TEntityMap[keyof TEntityMap] & import("./types").DbItem>;
export declare const resolveRefArray: <TEntityMap>(db: EntityDb<TEntityMap>, refs: DbRef<TEntityMap>[]) => Promise<TEntityMap[keyof TEntityMap][]>;
export declare const resolveRefsShallow: <TEntityMap, TEntity>(db: EntityDb<TEntityMap>, obj: TEntity) => Promise<TEntity>;
export declare const resolveRefsDeep: <TEntityMap, TEntity>(db: EntityDb<TEntityMap>, obj: TEntity, depthLimit?: number) => Promise<TEntity>;
