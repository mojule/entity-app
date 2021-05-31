import { DbCollection, EntitySchemaDb } from '../../db/types';
import { StoreRoute, GetPath, GetResult, ActionType } from './types';
export declare const postRoute: <TEntityMap>(collectionKey: keyof TEntityMap, store: EntitySchemaDb<TEntityMap>, action: keyof DbCollection<TEntityMap>, type: ActionType, getPath?: GetPath, getResult?: GetResult<TEntityMap, any>) => StoreRoute<TEntityMap>;
