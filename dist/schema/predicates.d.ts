import { EntitySchema, PatternSchema, PropertiesSchema } from './types';
export declare const isPatternSchema: (schema: EntitySchema) => schema is PatternSchema;
export declare const isPropertiesSchema: (schema: EntitySchema) => schema is PropertiesSchema;
