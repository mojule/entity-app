import { EntityDb } from './types';
export declare const defaultDrop: <TEntityMap>(db: EntityDb<TEntityMap>) => () => Promise<void>;
