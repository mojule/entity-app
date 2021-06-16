import { DbRefSchema, EntitySchemaMap } from './types';
export declare const refFactory: (uri: string) => <T extends string = string>(name: T) => DbRefSchema<T>;
export declare const isDbRefSchema: (schema: any) => schema is DbRefSchema<string>;
export declare const createRefSchemaMap: <TEntityMap>(entitySchemas: import("@mojule/util").KeyValueMap<TEntityMap, import("./types").IdSchema>, createRef: (name: string) => DbRefSchema) => Record<string, DbRefSchema<string>>;
