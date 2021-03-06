import { EntityKeys } from '../../entity/types';
import { DbItem, EntityDb } from '../types';
import { DbRemoteReadOptions } from './types';
export declare const creatRemoteStore: <TEntityMap, D extends DbItem = DbItem>(_name: string, keys: EntityKeys<TEntityMap>, options: DbRemoteReadOptions) => Promise<EntityDb<TEntityMap, D>>;
