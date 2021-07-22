import { EntityDb } from '../../db/types';
import { EntitySchemaMap, SchemaMap } from '../types';
export declare const schemaResolver: <TEntityMap>(db: EntityDb<TEntityMap, import("../../db/types").DbItem>, entityKey: keyof TEntityMap & string, entitySchemas: import("@mojule/util").KeyValueMap<TEntityMap, import("../types").IdSchema>, commonSchemas?: SchemaMap) => Promise<import("@mojule/util").KeyValueMap<TEntityMap, import("../types").IdSchema>[keyof TEntityMap]>;
