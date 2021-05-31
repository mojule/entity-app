import { CreateDb } from '../../types';
import { CreateDbCached } from './types';
export declare const cachedDbFactory: <TEntityMap>(createDb: CreateDb<TEntityMap, any>) => CreateDbCached<TEntityMap>;
