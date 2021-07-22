import { ValidateOptions, ValidateEntity } from './types';
import { DbCollection, DbItem } from '../../types';
export declare const createValidatedCollection: <K extends keyof TEntityMap, TEntityMap, D extends DbItem>(collection: DbCollection<TEntityMap[K], D>, key: K & string, validator: ValidateEntity<TEntityMap>, { onCreate, onLoad, onSave }: ValidateOptions) => DbCollection<TEntityMap[K], D>;
