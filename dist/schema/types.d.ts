import { KeyValueMap } from '@mojule/util';
import { JSONSchema7 } from 'json-schema';
import { SchemaRoles } from '../entity/security/types';
export declare type EntitySchemaMap<TEntityMap> = KeyValueMap<TEntityMap, IdSchema>;
export declare type SchemaMap = Record<string, IdSchema | ReadonlyIdSchema>;
export declare type ReadonlySchema = Readonly<JSONSchema7>;
export interface IdSchema extends JSONSchema7 {
    $id: string;
    _esRoles?: SchemaRoles;
}
export declare type ReadonlyIdSchema = ReadonlySchema & Readonly<{
    $id: string;
    _esRoles?: SchemaRoles;
}>;
export interface PatternSchema extends IdSchema {
    type: 'string';
    pattern: string;
}
export interface DbRefSchema extends IdSchema {
    title: string;
    type: 'object';
    properties: DbRefSchemaProperties;
    required: ['_id', '_collection'];
}
export interface DbRefSchemaProperties {
    _id: {
        title: 'ID';
        type: 'string';
    };
    _collection: {
        title: 'Collection';
        type: 'string';
        enum: [string];
    };
    [key: string]: JSONSchema7;
}
