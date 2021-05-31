import { DbItem } from './types';
export declare const dbItemToEntity: <TEntity>(dbItem: TEntity & DbItem) => TEntity;
