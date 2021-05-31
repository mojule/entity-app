import { ValidateOptions, ValidateEntity } from './types';
import { DbCollection } from '../../types';
export declare const createValidatedCollection: <K extends keyof TEntityMap, TEntityMap>(collection: DbCollection<TEntityMap[K]>, key: K & string, validator: ValidateEntity<TEntityMap>, { onCreate, onLoad, onSave }: ValidateOptions) => Promise<DbCollection<TEntityMap[K]>>;
