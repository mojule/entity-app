import { DbItem, EntityDb, EntityDbReadable } from './types';
export declare const copyDb: <EntityMap, D extends DbItem = DbItem>(source: EntityDbReadable<EntityMap, D>, dest: EntityDb<EntityMap, D>, log?: (...args: any[]) => void) => Promise<void>;
