import { ValidateEntity } from '../db/proxies/validator/types';
import { EntitySchemaMap, SchemaMap } from '../schema/types';
export declare const ajvValidator: <TEntityMap>(entitySchemas: import("@mojule/util").KeyValueMap<TEntityMap, import("../schema/types").IdSchema>, commonSchemas?: SchemaMap) => ValidateEntity<TEntityMap>;
