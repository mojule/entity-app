import { EntityDb } from './types';
export declare const defaultDrop: <TEntityMap>(db: EntityDb<TEntityMap, import("./types").DbItem>) => () => Promise<void>;
