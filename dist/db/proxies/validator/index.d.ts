import { DbCollections, DbItem, EntityDb } from '../../types';
import { ValidateEntity, ValidateOptions } from './types';
export declare const validatedDbFactory: <TEntityMap, D extends DbItem = DbItem>(db: EntityDb<TEntityMap, D>, validator: ValidateEntity<TEntityMap>, validateOptions?: ValidateOptions) => EntityDb<TEntityMap, D> & {
    collections: DbCollections<TEntityMap, D>;
};
