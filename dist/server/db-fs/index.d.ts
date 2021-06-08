import { FsOptions } from './types';
import { EntityKeys } from '../../entity/types';
import { EntityDb } from '../../db/types';
export declare const createFsDb: <TEntityMap>(name: string, keys: EntityKeys<TEntityMap>, { dataPath }?: FsOptions) => Promise<EntityDb<TEntityMap>>;
