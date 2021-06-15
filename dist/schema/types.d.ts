import { KeyValueMap } from '@mojule/util';
import { JSONSchema } from 'json-schema-to-ts';
import { SchemaRoles } from '../entity/security/types';
export declare type EntitySchema = JSONSchema;
export declare type MaybeReadonly<T> = T | Readonly<T>;
export declare type IdSchemaBase = {
    $id: string;
    _esRoles?: SchemaRoles;
};
export declare type IdSchema = EntitySchema & MaybeReadonly<IdSchemaBase>;
export declare type EntitySchemaMap<TEntityMap> = KeyValueMap<TEntityMap, IdSchema>;
export declare type SchemaMap = Record<string, IdSchema>;
export declare type PatternSchemaBase = {
    type: 'string';
    pattern: string;
};
export declare type PatternSchema = IdSchema & MaybeReadonly<PatternSchemaBase>;
export declare type DbRefSchemaBase = {
    $id: string;
    title: string;
    type: 'object';
    properties: DbRefSchemaProperties;
    required: ['_id', '_collection'];
};
export declare type DbRefSchema = MaybeReadonly<DbRefSchemaBase>;
export declare type DbRefSchemaProperties = {
    _id: {
        title: 'ID';
        type: 'string';
    };
    _collection: {
        title: 'Collection';
        type: 'string';
        enum: [string];
    };
    [key: string]: EntitySchema;
};
