import { SchemaMap } from '../types';
export declare const refResolver: <TSchemaMap extends SchemaMap>(schemas: TSchemaMap, key: keyof TSchemaMap) => TSchemaMap[keyof TSchemaMap];
