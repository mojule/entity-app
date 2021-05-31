import { EntitySchemaMap, IdSchema } from '../types';
import { EntityDb } from '../../db/types';
export declare const dbRefResolver: <TEntityMap, TKey extends keyof TEntityMap>(key: TKey, schema: import("../../util/types").KeyValueMap<TEntityMap, IdSchema>[TKey], db: EntityDb<TEntityMap>) => Promise<import("../../util/types").KeyValueMap<TEntityMap, IdSchema>[TKey]>;
