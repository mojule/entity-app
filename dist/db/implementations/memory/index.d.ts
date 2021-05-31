import { EntityKeys } from '../../../entity/types';
import { EntityDb } from '../../types';
export declare const createMemoryDb: <TEntityMap>(_name: string, keys: EntityKeys<TEntityMap>) => Promise<EntityDb<TEntityMap>>;
