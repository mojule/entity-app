import { EntityKeys } from '../../entity/types';
import { DbItem, EntityDb } from '../types';
import { CreateDbItem } from './types';
export declare const createMemoryDb: <TEntityMap, D extends DbItem = DbItem>(_name: string, keys: EntityKeys<TEntityMap>, createDbItem: CreateDbItem<D>) => Promise<EntityDb<TEntityMap, D>>;
export declare const createDefaultDbItem: CreateDbItem;
