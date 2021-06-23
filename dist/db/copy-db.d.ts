import { EntityDb } from './types';
export declare const copyDb: <EntityMap>(source: EntityDb<EntityMap>, dest: EntityDb<EntityMap>, log?: (...args: any[]) => void) => Promise<void>;
