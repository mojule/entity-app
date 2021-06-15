import { DbRefSchema, EntitySchemaMap } from './types';
export declare const refFactory: (uri: string) => (name: string) => DbRefSchema;
export declare const isDbRefSchema: (schema: any) => schema is DbRefSchema;
export declare const createRefSchemaMap: <TEntityMap>(entitySchemas: import("@mojule/util").KeyValueMap<TEntityMap, import("./types").IdSchema>, createRef: (name: string) => DbRefSchema) => Record<string, DbRefSchema>;
