import { EntitySchemaMap, IdSchema } from '../types';
import { EntityDb } from '../../db/types';
export declare const dbRefResolver: <TEntityMap, TKey extends keyof TEntityMap>(_key: TKey, schema: import("@mojule/util").KeyValueMap<TEntityMap, IdSchema>[TKey], db: EntityDb<TEntityMap>) => Promise<import("@mojule/util").KeyValueMap<TEntityMap, IdSchema>[TKey]>;
