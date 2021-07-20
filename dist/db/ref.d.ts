import { DbItem, DbRef, DbRefFor, EntityDb } from './types';
export declare const isRef: <TEntityMap>(ref: any) => ref is DbRef<TEntityMap>;
export declare const isRefArray: <TEntityMap>(arg: any[]) => arg is DbRef<TEntityMap>[];
export declare const resolveRef: <TEntityMap, K extends keyof TEntityMap, D extends DbItem = DbItem>(db: EntityDb<TEntityMap, D>, ref: DbRefFor<TEntityMap, K>) => Promise<TEntityMap[keyof TEntityMap & K] & D>;
export declare const resolveRefArray: <TEntityMap, K extends keyof TEntityMap, D extends DbItem = DbItem>(db: EntityDb<TEntityMap, D>, refs: DbRefFor<TEntityMap, K>[]) => Promise<(TEntityMap[keyof TEntityMap & K] & D)[]>;
export declare const resolveRefsShallow: <TModelMap, TEntityMap, K extends keyof TEntityMap & keyof TModelMap & string>(db: EntityDb<TEntityMap, DbItem>, obj: TEntityMap[K]) => Promise<TModelMap[K]>;
export declare const resolveRefsDeep: <TModelMap, TEntityMap, K extends keyof TEntityMap & keyof TModelMap & string>(db: EntityDb<TEntityMap, DbItem>, obj: TEntityMap[K], depthLimit?: number) => Promise<TModelMap[K]>;
