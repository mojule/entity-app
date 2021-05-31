import { ValidateEntity } from '../../db/proxies/validator/types';
import { EntitySchemaMap, SchemaMap } from '../types';
export declare const ajvValidator: <TEntityMap>(entitySchemas: import("../../util/types").KeyValueMap<TEntityMap, import("../types").IdSchema>, commonSchemas?: SchemaMap) => ValidateEntity<TEntityMap>;
