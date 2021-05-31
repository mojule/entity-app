import { CreateDb } from '../../types';
import { ValidateEntity, ValidateOptions } from './types';
export declare const validatedDbFactory: <TEntityMap>(createDb: CreateDb<TEntityMap, any>, validator: ValidateEntity<TEntityMap>, validateOptions?: ValidateOptions) => CreateDb<TEntityMap, any>;
