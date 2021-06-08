import { IdSchema, DbRefSchema, EntitySchemaMap, SchemaMap } from './types';
export declare const refFactory: (uri: string) => (name: string) => DbRefSchema;
export declare const isDbRefSchema: (schema: IdSchema) => schema is DbRefSchema;
export declare const createRefSchemaMap: <TEntityMap>(entitySchemas: import("@mojule/util").KeyValueMap<TEntityMap, IdSchema>, createRef: (name: string) => DbRefSchema) => SchemaMap;
