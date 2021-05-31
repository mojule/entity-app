import { EntityDb } from '../../types';
import { EntityKeys } from '../../../entity/types';
import { FsOptions } from './types';
export declare const createFsDb: <TEntityMap>(name: string, keys: EntityKeys<TEntityMap>, { dataPath }?: FsOptions) => Promise<EntityDb<TEntityMap>>;
