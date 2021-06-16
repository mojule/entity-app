import { KeyValueMap } from '@mojule/util';
import { JSONSchema } from 'json-schema-to-ts';
import { DeepReadonly } from 'json-schema-to-ts/lib/utils';
import { SchemaRoles } from '../entity/security/types';
export declare type EntitySchema = JSONSchema;
export declare type MaybeReadonly<T> = T | DeepReadonly<T>;
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
export declare type PropertiesSchema = EntitySchema & {
    type: 'object';
    properties: Record<string, EntitySchema>;
};
export declare type PatternSchema = IdSchema & MaybeReadonly<PatternSchemaBase>;
export declare type DbRefSchemaBase<T extends string> = {
    $id: string;
    title: string;
    type: 'object';
    properties: DbRefSchemaProperties<T>;
    required: ['_id', '_collection'];
};
export declare type DbRefSchema<T extends string = string> = DbRefSchemaBase<T>;
export declare type DbRefSchemaProperties<T extends string = string> = {
    _id: {
        title: 'ID';
        type: 'string';
    };
    _collection: {
        title: 'Collection';
        type: 'string';
        enum: [T];
    };
};
