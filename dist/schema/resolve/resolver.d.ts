import { EntityDb } from '../../db/types';
import { EntitySchemaMap, SchemaMap } from '../types';
export declare const schemaResolver: <TEntityMap>(db: EntityDb<TEntityMap>, entityKey: keyof TEntityMap & string, entitySchemas: import("../../util/types").KeyValueMap<TEntityMap, import("../types").IdSchema>, commonSchemas?: SchemaMap) => Promise<import("../../util/types").KeyValueMap<TEntityMap, import("../types").IdSchema>[keyof TEntityMap]>;
