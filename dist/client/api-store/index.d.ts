import { EntityKeys } from '../../entity/types';
import { EntityDb } from '../../db/types';
export declare const createApiStore: <TEntityMap>(_name: string, keys: EntityKeys<TEntityMap>) => Promise<EntityDb<TEntityMap>>;
